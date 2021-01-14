import mongoose from 'mongoose'

const fileBatchSchema = mongoose.Schema(
    {
        user: {type: String, required: false},
        title: {type: String, required: false},
        tags: {type: String, required: false},
        files: {type: Array, required: true},
        options: {type: Array, required: false},
        output: {type: String, required: false}
    },
    {
        timestamps: true
    }
)

export default mongoose.model('FileBatch', fileBatchSchema)
