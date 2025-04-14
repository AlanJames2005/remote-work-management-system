import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['text', 'file', 'image'],
    default: 'text'
  },
  fileUrl: {
    type: String,
    trim: true
  },
  fileName: {
    type: String,
    trim: true
  },
  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
messageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add the sender to readBy when the message is created
messageSchema.pre('save', function(next) {
  if (this.isNew && !this.readBy.includes(this.sender)) {
    this.readBy.push(this.sender);
  }
  next();
});

export default mongoose.model('Message', messageSchema); 