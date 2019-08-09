const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Application = require('./application');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Methods
UserSchema.methods.getUserAppliations = function(callback) {
  return Application.find({ _user_id: this._id }, callback);
};


const User = mongoose.model("USer", UserSchema);
module.exports = User;