const catchError = require('../utils/catchError');
const Director = require('../models/Director');
const Movie = require('../models/Movie');

const getAll = catchError(async(req, res) => {
    const directors = await Director.findAll({ include: [ Movie ] });
    return res.json(directors);
});

const create = catchError(async(req, res) => {
    const director = await Director.create(req.body);
    return res.status(201).json(director);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const director = await Director.findByPk( id, { include: [ Movie ] } );
    if(!director) return res.sendStatus(404);
    return res.json(director);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const directors = await Director.destroy({ where: {id} });
    if(directors === 0) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const director = await Director.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(director[0] === 0) return res.sendStatus(404);
    return res.json(director[1][0]);
});

const setDirectorMovies = catchError(async(req, res) => {
    const { id } = req.params;
    const director = await Director.findByPk( id );
    await director.setMovies( req.body );
    const movies = await director.getMovies();
    return res.json(movies);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setDirectorMovies
}