const request = require("supertest");
const app = require("../app");
require("../models");

let directorId;

test("POST /directors should create one director", async() => {
    const newDirector = {
        firstName: "Anthony",
        lastName: "Russo",
        nationality: "American",
        image: "https://flxt.tmsimg.com/assets/303030_v9_bb.jpg",
        birthday: "1970-02-03"
    }
    const res = await request(app).post("/directors").send(newDirector);
    directorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newDirector.firstName);
});

test("GET /directors should return all the directors", async() => {
    const res = await request(app).get("/directors");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("PUT /directors/:id should update one director", async() => {
    const body = {
        firstName: "Anthony updated"
    }
    const res = await request(app).put(`/directors/${directorId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test("DELETE /directors/:id should delete one director", async() => {
    const res = await request(app).delete(`/directors/${directorId}`);
    expect(res.status).toBe(204);
});