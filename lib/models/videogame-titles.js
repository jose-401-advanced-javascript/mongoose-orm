const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema ({
  name: {
    type: String,
    required: true
  },
  yearPublished: {
    type: Number,
    required: true   
  },
  multiplayer: {
    type: Boolean,
    default: false
  },
  genre: [{
    type: String,
    enum: ['action', 'rpg', 'shooter', 'strategy']
  }]
});

module.exports = mongoose.model('VideoGame', schema);