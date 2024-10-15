const mongoose = require('mongoose');

const archivedItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
  price: Number,
  archived_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ArchivedItem', archivedItemSchema);
