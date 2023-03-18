const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models");

let movieId;

test("POST /movies should create one movie", async() => {
    const newMovie = {
        name: "Avengers: Endgame",
        image: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/9/9b/Avenger_Endgame_Poster_Oficial.png/revision/latest?cb=20190326185910&path-prefix=es",
        synopsis: "The remaining Avengers must find a way to win back their allies for an epic showdown with Thanos, the villain who decimated the planet and the universe.",
        releaseYear: "2019"
    }
    const res = await request(app).post("/movies").send(newMovie);
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newMovie.name);
});

test("GET /movies should return all the movies", async() => {
    const res = await request(app).get("/movies");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("PUT /movies/:id should update one movie", async() => {
    const body = {
        name: "Avengers: Endgame updated"
    }
    const res = await request(app).put(`/movies/${movieId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test("POST /movies/:id/actors should set the movie actors", async() => {
    const actor = await Actor.create({
        firstName: "Robert",
        lastName: "Downey",
        nationality: "American",
        image: "https://media.gq.com.mx/photos/5ffa22129274cd36fe35681a/1:1/w_2027,h_2027,c_limit/robert-downey-jr-star-wars.jpg",
        birthday: "1965-04-04"
    });
    const res = await request(app).post(`/movies/${movieId}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/directors should set the movie directors", async() => {
    const director = await Director.create({
        firstName: "Anthony",
        lastName: "Russo",
        nationality: "American",
        image: "https://flxt.tmsimg.com/assets/303030_v9_bb.jpg",
        birthday: "1970-02-03"
    });
    const res = await request(app).post(`/movies/${movieId}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/genres should set the movie genres", async() => {
    const genre = await Genre.create({
        name: "Action"
    });
    const res = await request(app).post(`/movies/${movieId}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("DELETE /movies/:id should delete one movie", async() => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
});