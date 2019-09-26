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
  console: {
    exclusive: Boolean,
    firstConsoleRelease: {
      type: String,
      required: true,
    }
  },
  multiplayer: {
    type: Boolean,
    default: false
  },
  numberOfPlayers: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  genre: [{
    type: String,
    enum: ['action', 'rpg', 'shooter', 'strategy']
  }]
});

module.exports = mongoose.model('VideoGame', schema);