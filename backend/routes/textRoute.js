import express from 'express'

const router = express.Router()

import {removeHtml} from '../utils/textCleanup.js'

import {sample1} from '../data/sample.js'

router.route('/processing').post((req, res) => {
    const original = sample1
    const processed = removeHtml(sample1)

    return res.json({success: true, original, processed})
})

export default router
