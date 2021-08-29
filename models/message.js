import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var message = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

var Message = mongoose.model('Message', message);

export default Message;