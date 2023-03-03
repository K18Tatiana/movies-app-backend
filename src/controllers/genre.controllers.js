const catchError = require('../utils/catchError');
const Genre = require('../models/Genre');
const Movie = require('../models/Movie');

const getAll = catchError(async(req, res) => {
    const genres = await Genre.findAll({ include: [ Movie ] });
    return res.json(genres);
});

const create = catchError(async(req, res) => {
    const genre = await Genre.create(req.body);
    return res.status(201).json(genre);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const genre = await Genre.findByPk( id, { include: [ Movie ] } );
    if(!genre) return res.sendStatus(404);
    return res.json(genre);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const genres = await Genre.destroy({ where: {id} });
    if(genres === 0) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const genre = await Genre.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(genre[0] === 0) return res.sendStatus(404);
    return res.json(genre[1][0]);
});

const setGenreMovies = catchError(async(req, res) => {
    const { id } = req.params;
    const genre = await Genre.findByPk( id );
    await genre.setMovies( req.body );
    const movies = await genre.getMovies();
    return res.json(movies);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenreMovies
}