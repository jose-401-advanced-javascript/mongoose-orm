const request = require('../request');
const db = require('../db');

describe('video game api', () => {

  beforeEach(() => {
    return db.dropCollection('video game');
  });

  const data = {
    name: 'Fable',
    yearPublished: 2004,
    console: {
      exclusive: false,
      firstConsoleRelease: 'X-box'
    },
    multiplayer: false,
    numberOfPlayers: 1,
    genre: ['action', 'rpg'],
  };

  function postGame(game) {
    return request
      .post('/api/videogames')
      .send(game)
      .expect(200)
      .then(({ body }) => body);
  }
	
  it('post game', () => {
    return postGame(data)
      .then(game => {
        expect(game).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...data
        });
      });
  });

});