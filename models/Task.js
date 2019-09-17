const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  users: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  done: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Task = mongoose.model('tasks', TaskSchema);
