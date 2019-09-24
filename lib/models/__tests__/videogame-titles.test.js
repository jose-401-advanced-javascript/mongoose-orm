const VideoGame = require('../videogame-titles');

describe('Video Game model', () => {
  
  it('valid model all properties', () => {
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

    const videoGame = new VideoGame(data);
    const errors = videoGame.validateSync();
    
    expect(errors).toBeUndefined();

    const json = videoGame.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });

  it('validates required', () => {
    const data = {};
    const videoGame = new VideoGame(data);
    const { errors } = videoGame.validateSync();

    expect(errors.name.kind).toBe('required');
    expect(errors.yearPublished.kind).toBe('required');
    expect(errors.numberOfPlayers.kind).toBe('required');
    expect(errors['console.firstConsoleRelease'].kind).toBe('required');
  });

  it('populates default properties', () => {
    const data = {
      name: 'Fable',
      yearPublished: 2004,
      console: {
        exclusive: false,
        firstConsoleRelease: 'X-box'
      },
      numberOfPlayers: 1,
      genre: ['action', 'rpg'],
    };
    const videoGame = new VideoGame(data);
    const errors = videoGame.validateSync();
    expect(errors).toBeUndefined();

    expect(videoGame.multiplayer).toBe(false);
  });

  it('enforces max of 4 players', () => {
    const data = {
      numberOfPlayers: 7
    };
    const videoGame = new VideoGame(data);
    const { errors } = videoGame.validateSync();
    expect(errors.numberOfPlayers.kind).toBe('max');
  });

  it('enforces min of 1 player', () => {
    const data = {
      numberOfPlayers: 0
    };
    const videoGame = new VideoGame(data);
    const { errors } = videoGame.validateSync();
    expect(errors.numberOfPlayers.kind).toBe('min');
  });

  it('enforces enum on genre', () => {
    const data = {
      genre: ['third-person']
    };
    const videoGame = new VideoGame(data);
    const { errors } = videoGame.validateSync();
    expect(errors['genre.0'].kind).toBe('enum');
  });
});