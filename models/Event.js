const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { type: String, required: true },
  organizer: { type: String, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  purpose: { type: String, required: true },
  tags: { type: String, required: true }, 
  interestedCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now } 
}, { timestamps: true });


module.exports = mongoose.model('Event', eventSchema);
