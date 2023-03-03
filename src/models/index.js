const Actor = require("./Actor");
const Director = require("./Director");
const Movie = require("./Movie");
const Genre = require("./Genre")

Actor.belongsToMany(Movie, { through: "ActorsMovies" });
Movie.belongsToMany(Actor, { through: "ActorsMovies" });

Director.belongsToMany(Movie, { through: "DirectorsMovies" });
Movie.belongsToMany(Director, { through: "DirectorsMovies" });

Genre.belongsToMany(Movie, { through: "GenresMovies" });
Movie.belongsToMany(Genre, { through: "GenresMovies" });