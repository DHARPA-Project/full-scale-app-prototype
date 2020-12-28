import express from 'express'
import dotenv from 'dotenv'

const port = process.env.PORT || 5000

dotenv.config()

const app = express()

// enable accepting JSON data in the body
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API running')
})

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`))
