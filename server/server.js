import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'

import textRoutes from './routes/textRoutes.js'
import userRoutes from './routes/userRoutes.js'

const port = process.env.PORT || 5000

dotenv.config()

const app = express()

mongoose.connect('mongodb://127.0.0.1/dharpa', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.Promise = global.Promise

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// enable accepting JSON data in the body
app.use(express.json())

app.get('/api', (req, res) => {
    res.send('API running')
})

app.use('/api/text', textRoutes)
app.use('/api/users', userRoutes)

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`))
