require('dotenv').config();
require('./lib/connect')();
const express = require('express');
const app = express();
const VideoGame = require('./lib/models/videogame-titles');

app.use(express.json());

app.get('/api/videogames', (req, res, next) => {
  VideoGame.find()
    .then(videogames => {
      res.json(videogames);
    })
    .catch(next);
});

app.get('/api/videogames/:id', (req, res, next) => {
  VideoGame.findById(req.params.id)
    .then(videogame => {
      res.json(videogame);
    })
    .catch(next);
});

app.post('/api/videogames', (req, res, next) => {
  VideoGame.create(req.body)
    .then(videogame => {
      res.json(videogame);
    })
    .catch(next);
});

app.put('/api/videogames/:id', (req, res, next) => {
  VideoGame.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
    .then(videogame => {
      res.json(videogame);
    })
    .catch(next);
});

app.delete('/api/videogames/:id', (req, res, next) => {
  VideoGame.findByIdAndRemove(req.params.id)
    .then(removed => {
      res.json(removed);
    })
    .catch(next);
});

app.listen(3000, () => console.log('server'));