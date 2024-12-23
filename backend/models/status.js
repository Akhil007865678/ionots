const mongoose = require('mongoose');

const ProjectStatusSchema = new mongoose.Schema({
  projectId: { type: String, required: true  },
  UserId: { type: String, required: true  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'complete'],
    default: 'pending' 
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProjectStatus', ProjectStatusSchema);
