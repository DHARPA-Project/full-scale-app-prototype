import jwt from 'jsonwebtoken'

const generateToken = userData => {
    return jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export default generateToken
