const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    trim: true, 
    index: true, 
  },
  userMessage: {
    type: String,
    required: true,
    trim: true, 
  },
  leviResponse: {
    type: String,
    required: true,
    trim: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true, 
  },
});

chatSchema.index({ user_id: 1, createdAt: -1 });

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
