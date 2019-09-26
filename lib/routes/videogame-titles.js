/* eslint-disable new-cap */
const router = require('express').Router();
const VideoGame = require('../models/videogame-titles');

router
  .post('/', (req, res, next) => {
    VideoGame.create(req.body)
      .then(game => res.json(game))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    VideoGame.findById(req.params.id)
      .then(videogame => res.json(videogame))
      .catch(next);
  })
	
  .get('/', (req, res, next) => {
    VideoGame.find()
      .then(game => res.json(game))
      .catch(next);
  })
	
  .put('/:id', (req, res, next) => {
    VideoGame.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .then(game => res.json(game))
      .catch(next);
  })
	
  .delete('/:id', (req, res, next) => {
    VideoGame.findByIdAndDelete(req.params.id)
      .then(game => res.json(game))
      .catch(next);
  });
	

module.exports = router;