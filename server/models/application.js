const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  company: String,
  position: String,
  listing_url: String,
  applied_at: Date,
  notes: String,
  response: Boolean,
  interview: Boolean,
  interview_count: Number,
  offer: Boolean,
  accepted: Boolean
}, { 
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;