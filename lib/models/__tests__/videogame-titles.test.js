const VideoGame = require('../videogame-titles');
const mongoose = require('mongoose');

describe('Video Game model', () => {
  
  it('valid model all properties', () => {
    const data = {
      name: 'Fable',
      yearPublished: 2004,
      multiplayer: false,
      numberOfPlayers: 1,
      genre: ['action', 'rpg'],
    };

    const videoGame = new VideoGame(data);
    const errors = videoGame.validateSync();
    expect(errors).toBeUndefined();

    const json = videoGame.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });
});