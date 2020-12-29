import express, {text} from 'express'

const router = express.Router()

import {processText} from '../utils/textCleanup.js'

import sampleText from '../data/sample.js'

router.route('/processing').get((req, res) => {
    try {
        const {id, operations} = req.query
        const textPool = sampleText.find(item => item.id === id)

        if (!textPool) {
            res.status(404)
            return res.json({success: false, error: 'text pool with specified ID not found'})
        }

        const original = textPool.text
        const textOperations = typeof operations === 'text' ? [operations] : operations
        const processed = processText(original, textOperations)

        return res.status(200).json({success: true, original, processed})
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, error: 'Internal server error'})
    }
})

export default router
