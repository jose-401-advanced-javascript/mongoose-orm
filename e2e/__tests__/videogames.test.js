const request = require('../request');
const db = require('../db');

describe('video game api', () => {

  beforeEach(() => {
    return db.dropCollection('videogames');
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
	
  it('get a game by id', () => {
    return postGame(data)
      .then(game => {
        return request.get(`/api/videogames/${game._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(game);
          });
      });
  });
	
  it('get a list of games', () => {
    return Promise.all([
      postGame({ name: 'Fable', yearPublished: 2004, console: { exclusive: false, firstConsoleRelease: 'X-box' }, numberOfPlayers: 1 }),
      postGame({ name: 'Fable', yearPublished: 2004, console: { exclusive: false, firstConsoleRelease: 'X-box' }, numberOfPlayers: 1 }),
      postGame({ name: 'Fable', yearPublished: 2004, console: { exclusive: false, firstConsoleRelease: 'X-box' }, numberOfPlayers: 1 })
    ])
      .then(() => {
        return request
          .get('/api/videogames')
          .expect(200);
      })
      .then(({ body }) => {				
        expect(body.length).toBe(3);
      });
  });
	
  it('updates a game', () => {
    return postGame(data)
      .then(game => {
        game.yearPublished = 2002;
        return request
          .put(`/api/videogames/${game._id}`)
          .send(game)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.yearPublished).toBe(2002);
      });
  });
	
  it('deletes a game', () => {
    return postGame(data)
      .then(game => {
        return request
          .delete(`/api/videogames/${game._id}`)
          .expect(200);
      });
  });

});