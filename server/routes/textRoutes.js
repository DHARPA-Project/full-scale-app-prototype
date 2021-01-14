import express from 'express'

const router = express.Router()

import sampleText from '../data/sampleTextPools.js'
import {topicModellingOperations} from '../data/textProcessingOperations.js'
import {processText} from '../utils/textCleanup.js'
import {previewLength} from '../constants/settings.js'
import FileBatchModel from '../models/fileBatchModel.js'

router.route('/options').get(async (req, res) => {
    try {
        const userId = req.user._id
        const batches = await FileBatchModel.find({user: userId})
        console.log('batches found: ', batches)

        const textPools = batches.map(({_id, title}) => ({id: _id, title}))
        const availableOperations = topicModellingOperations
        setTimeout(
            () =>
                res
                    .status(200)
                    .json({success: true, pools: textPools, operations: availableOperations}),
            1000
        )
        return
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, error: 'Internal server error'})
    }
})

router.route('/processing').get((req, res) => {
    try {
        const {id, operations} = req.query
        // temporarily use mock text pool instead of real one
        const textPool = sampleText[0]
        // const textPool = sampleText.find(item => item.id === id)

        if (!textPool) {
            return res
                .status(404)
                .json({success: false, error: 'text pool with specified ID not found'})
        }

        const original = textPool.text.slice(0, previewLength)
        // operations will be a string if only one query param was passed...
        // ... and an array of strings if multiple query params were passed
        const textOperations = typeof operations === 'string' ? [operations] : operations
        const processed = processText(original, textOperations)

        return res.status(200).json({success: true, original, processed})
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, error: 'Internal server error'})
    }
})

export default router
