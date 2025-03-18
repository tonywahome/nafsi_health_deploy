// backend/tests/appointment.test.js
const request = require("supertest");
const app = require("../server");
const { User, Appointment } = require("../models");

describe("Appointment API", () => {
  let patientToken;
  beforeAll(async () => {
    await User.create({
      username: "testpatient",
      password: "testpass",
      role: "patient",
    });
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testpatient", password: "testpass" });
    patientToken = res.body.token;
  });

  test("Create appointment", async () => {
    const response = await request(app)
      .post("/api/appointments")
      .set("x-access-token", patientToken)
      .send({ doctorId: 1, date: "2025-02-01T10:00:00Z" });
    expect(response.statusCode).toBe(201);
  });
});
