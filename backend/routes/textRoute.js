import express, {text} from 'express'

const router = express.Router()

import {removeHtml} from '../utils/textCleanup.js'

import sampleText from '../data/sample.js'

router.route('/processing').get((req, res) => {
    console.log(req.query)
    const {id, operations} = req.query
    const textPool = sampleText.find(item => item.id === id)

    if (!textPool) {
        res.status(404)
        return res.send({success: false, error: 'text pool with specified ID not found'})
    }

    const original = textPool.text
    const processed = removeHtml(original)

    return res.status(200).json({success: true, original, processed})
})

export default router
