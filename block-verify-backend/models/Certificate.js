const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  institution: { type: String, required: true },
  certificateHash: { type: String, required: true, unique: true },
  issueDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
