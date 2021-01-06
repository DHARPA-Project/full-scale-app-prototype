import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const router = express.Router()

router.route('/').post(async (req, res) => {
    try {
        const {name, email, password} = req.body

        const existingUser = await User.findOne({email})

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: `user with email ${email} already exists`
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        if (!hashedPassword) {
            console.error('password hashing failed')
            return res.status(500).json({
                success: false,
                message: 'internal server error'
            })
        }

        const newUser = await User.create({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password: hashedPassword
        })

        if (newUser) {
            return res.status(201).json({
                success: true,
                message: `user ${email} created`,
                createdUser: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    token: generateToken(newUser._id)
                }
            })
        } else {
            console.error(`DB failed to create new user ${email}`)
            return res.status(500).json({
                success: false,
                message: 'saving the user failed'
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, message: 'Internal server error'})
    }
})

export default router
