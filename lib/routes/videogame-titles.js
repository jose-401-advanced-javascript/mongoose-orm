/* eslint-disable new-cap */
const router = require('express').Router();
const VideoGame = require('../models/videogame-titles');

router
  .post('/', (req, res, next) => {
    VideoGame.create(req.body)
      .then(game => res.json(game))
      .catch(next);
  });

module.exports = router;