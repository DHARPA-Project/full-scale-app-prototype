import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export default async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            req.user = null
            next()
        }

        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)

        next()
    } catch (error) {
        // 401: unauthenticated
        return res.status(401).json({
            success: false,
            message: 'Authentication failed'
        })
    }
}
