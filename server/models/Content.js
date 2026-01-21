import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['about', 'film', 'author'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  video: {
    type: String
  },
  year: {
    type: Number
  },
  duration: {
    type: String
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content'
  },
  country: {
    type: String
  },
  bio: {
    type: String
  },
  website: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Content', contentSchema);
