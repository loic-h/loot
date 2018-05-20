const mongoose = require('mongoose');

const lootSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('loot', lootSchema);
