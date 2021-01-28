import express from 'express'
import fs from 'fs'
import multer from 'multer'

import FileBatchModel from '../models/fileBatchModel.js'
import {generateId} from '../utils/helpers.js'
import {processText} from '../utils/textCleanup.js'
import {previewLength} from '../constants/settings.js'

const router = express.Router()

const uploadDirectory = 'uploads'

// if a public "uploads" directory doesn't exist yet, create one
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory)
    },
    filename: (req, file, cb) => {
        const id = generateId()
        const fileName = `${id}---${file.originalname}`
        req.body.files ? req.body.files.push(fileName) : (req.body.files = [fileName])
        cb(null, fileName)
    }
})
const upload = multer({storage})

router.post('/', upload.array('file'), async (req, res) => {
    try {
        const {title, tags, files} = req.body
        const userId = req.user._id
        const fileList = req.files

        const fileBatch = new FileBatchModel({user: userId, title, tags, files})

        const savedFileBatch = await fileBatch.save()

        return res.status(201).json({
            success: true,
            message: `${fileList.length} files uploaded successfully`,
            batch: savedFileBatch
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, error: 'server error'})
    }
})

router.get('/', async (req, res) => {
    try {
        const userId = req.user._id

        const fileBatches = await FileBatchModel.find({user: userId})

        return res.status(200).json({
            success: true,
            message: `${fileBatches.length} file batches found`,
            batches: fileBatches.map(({_id, files, options, title, tags, createdAt}) => ({
                id: _id,
                title,
                tags,
                options,
                date: createdAt,
                files: files.map(file => file.split('---')[1]).join(', ')
            }))
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, error: 'server error'})
    }
})

router.get('/text/preview/:textBatchID', async (req, res) => {
    try {
        const userId = req.user._id
        const textBatchID = req.params.textBatchID
        const {operations} = req.query

        const fileBatch = await FileBatchModel.findOne({user: userId, _id: textBatchID})

        const aggregatedFileContent = fileBatch.files
            .map(fileName => {
                const fileLocation = `${uploadDirectory}/${fileName}`
                if (!fs.existsSync(fileLocation)) return ''
                return fs.readFileSync(fileLocation, 'utf-8')
            })
            .join('\n')

        if (!aggregatedFileContent) {
            return res.status(404).json({
                success: false,
                message: `file batch with ID ${textBatchID} could not be found`
            })
        }

        const original = aggregatedFileContent.slice(0, previewLength)
        // operations will be a string if only one query param was passed...
        // ... and an array of strings if multiple query params were passed
        const textOperations = typeof operations === 'string' ? [operations] : operations
        const processed = processText(original, textOperations)

        return res.status(200).json({success: true, original, processed})
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, error: 'server error'})
    }
})

export default router
