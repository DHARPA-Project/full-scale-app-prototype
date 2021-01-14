import express from 'express'
import fs from 'fs'
import multer from 'multer'

import FileBatchModel from '../models/fileBatchModel.js'
import {generateId} from '../utils/helpers.js'

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

        return res.status(200).json({
            success: true,
            message: `${fileList.length} files uploaded successfully`,
            batch: savedFileBatch
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, error: 'server error'})
    }
})

export default router
