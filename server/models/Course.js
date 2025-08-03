import mongoose from 'mongoose';
import lessonSchema from './Lesson.js';

const courseSchema = new mongoose.Schema({
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String },
  lessons: [lessonSchema],
  isPublished: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);