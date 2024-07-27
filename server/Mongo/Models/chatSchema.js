const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  username: {
    type:String,
    required: true,
  },
  userMessage: {
    type: String,
    required: true, 
  },
  leviResponse: {
    type: String,
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
