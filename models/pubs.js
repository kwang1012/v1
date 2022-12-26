import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const publication = new Schema({
  venueShort: {
    type: String,
    required: true,
  },
  venueName: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.Publication || mongoose.model('Publication', publication);
