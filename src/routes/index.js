const express = require('express');
const actorRouter = require('./actor.route');
const directorRouter = require('./director.route');
const genreRouter = require('./genre.route');
const movieRouter = require('./movie.route');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres', genreRouter);
router.use('/actors', actorRouter);
router.use('/directors', directorRouter);
router.use('/movies', movieRouter);

module.exports = router;