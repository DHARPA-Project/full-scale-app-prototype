import mongoose from 'mongoose'

import {emailRegex} from '../utils/regex.js'

const userSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: emailRegex
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

export default User
