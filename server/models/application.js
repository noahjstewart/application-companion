const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  company: {
    type: String,
    default: "",
    required: [true, 'Company name is required']
  },
  position: {
    type: String,
    default: "",
    required: [true, 'Position title is required']
  },
  listing_url: {
    type: String,
    default: ""
  },
  applied_at: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ""
  },
  response: {
    type: Boolean,
    default: false
  },
  interview: {
    type: Boolean,
    default: false
  },
  interview_count: Number,
  offer: {
    type: Boolean,
    default: false
  },
  accepted: {
    type: Boolean,
    default: false
  },
  _user_id: {
    type: Number
  }
}, { 
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;