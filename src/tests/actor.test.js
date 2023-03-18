const request = require('supertest');
const app = require('../app');
require("../models");

let actorId;

test("POST /actors should create one actor", async() => {
    const newActor = {
        firstName: "Robert",
        lastName: "Downey",
        nationality: "American",
        image: "https://media.gq.com.mx/photos/5ffa22129274cd36fe35681a/1:1/w_2027,h_2027,c_limit/robert-downey-jr-star-wars.jpg",
        birthday: "1965-04-04"
    }
    const res = await request(app).post("/actors").send(newActor);
    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newActor.firstName);
});

test("GET /actors should return all the actors", async() => {
    const res = await request(app).get("/actors");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("PUT /actors/:id should update one actor", async() => {
    const body = {
        firstName: "Robert updated"
    }
    const res = await request(app).put(`/actors/${actorId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test("DELETE /actors/:id should delete one actor", async() => {
    const res = await request(app).delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);
});