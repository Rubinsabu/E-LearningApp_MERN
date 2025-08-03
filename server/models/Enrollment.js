import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  watchedLessons: [{ type: mongoose.Schema.Types.ObjectId }], // stores lesson _id
}, { timestamps: true });

export default mongoose.model('Enrollment', enrollmentSchema);