const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  country: { type: String, required: true }, 
  author: { type: String, required: true },
  tags: { type: String, required: true}, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now } 
}, { timestamps: true }); 

module.exports = mongoose.model('Blog', blogSchema);
