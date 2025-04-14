import mongoose from 'mongoose';

const timeEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  clockIn: {
    type: Date,
    required: true
  },
  clockOut: {
    type: Date
  },
  duration: {
    type: Number, // in minutes
    default: 0
  },
  notes: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate duration when clockOut is set
timeEntrySchema.pre('save', function(next) {
  if (this.clockOut && this.clockIn) {
    this.duration = Math.round((this.clockOut - this.clockIn) / 60000); // Convert to minutes
  }
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('TimeEntry', timeEntrySchema); 