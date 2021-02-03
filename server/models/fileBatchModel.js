import mongoose from 'mongoose'

const fileBatchSchema = mongoose.Schema(
    {
        user: {type: String, required: true},
        type: {type: String, required: true},
        title: {type: String, required: false},
        tags: {type: String, required: false},
        files: {type: Array, required: true},
        sample: {type: String, required: false},
        options: {type: Array, required: false},
        output: {type: String, required: false}
    },
    {
        timestamps: true
    }
)

export default mongoose.model('FileBatch', fileBatchSchema)
