import mongoose from 'mongoose'

const fileBatchSchema = mongoose.Schema({
    title: {type: String, required: false},
    tags: {type: String, required: false},
    files: {type: Array, required: true}
})

export default mongoose.model('FileBatch', fileBatchSchema)
