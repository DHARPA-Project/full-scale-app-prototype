import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const router = express.Router()

/**
 * @desc    REGISTRATION
 * @route   post: /api/users
 * @access  public
 */
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
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    token: generateToken({
                        id: newUser._id,
                        name: newUser.name,
                        email: newUser.email
                    })
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
        return res.status(500).json({success: false, message: error})
    }
})

/**
 * @desc    LOGIN
 * @route   post: /api/users/login
 * @access  public
 */
router.route('/login').post(async (req, res) => {
    try {
        const {email, password} = req.body

        const existingUser = await User.findOne({email})

        if (!existingUser) {
            console.log(`user ${email} could not be found`)
            return res.status(401).json({
                success: false,
                message: `wrong user name or password`
            })
        }

        const passwordMatched = await bcrypt.compare(password, existingUser.password)

        if (!passwordMatched) {
            console.log(`wrong password provided for ${email}`)
            return res.status(401).json({
                success: false,
                message: `wrong user name or password`
            })
        }

        return res.status(200).json({
            success: true,
            message: 'authentication successful',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                token: generateToken({
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email
                })
            }
        })
    } catch (error) {
        console.error('sign-in failed: ', error)
        return res.status(500).json({success: false, message: error})
    }
})

export default router
