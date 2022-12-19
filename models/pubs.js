import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const publication = new Schema({
    venueName: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.models.Publication ||  mongoose.model('Publication', publication);