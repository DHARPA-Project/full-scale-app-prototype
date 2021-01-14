import mongoose from 'mongoose'

const fileBatchSchema = mongoose.Schema({
    user: {type: String, required: false},
    title: {type: String, required: false},
    tags: {type: String, required: false},
    files: {type: Array, required: true}
})

export default mongoose.model('FileBatch', fileBatchSchema)
