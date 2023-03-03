const catchError = require('../utils/catchError');
const Actor = require('../models/Actor');
const Movie = require('../models/Movie');

const getAll = catchError(async(req, res) => {
    const actors = await Actor.findAll({ include: [ Movie ] });
    return res.json(actors);
});

const create = catchError(async(req, res) => {
    const actor = await Actor.create(req.body);
    return res.status(201).json(actor);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const actor = await Actor.findByPk( id, { include: [ Movie ] } );
    if(!actor) return res.sendStatus(404);
    return res.json(actor);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const actors = await Actor.destroy({ where: {id} });
    if(actors === 0) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const actor = await Actor.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(actor[0] === 0) return res.sendStatus(404);
    return res.json(actor[1][0]);
});

const setActorMovies = catchError(async(req, res) => {
    const { id } = req.params;
    const actor = await Actor.findByPk( id );
    await actor.setMovies( req.body );
    const movies = await actor.getMovies();
    return res.json(movies);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setActorMovies
}