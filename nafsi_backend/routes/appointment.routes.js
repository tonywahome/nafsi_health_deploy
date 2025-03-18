// routes/appointment.routes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.jwt");
const checkRole = require("../middleware/role.check");

router.post("/", verifyToken, checkRole(["patient"]), async (req, res) => {
  try {
    const appointment = await Appointment.create({
      patient_id: req.userId,
      doctor_id: req.body.doctorId,
      date: req.body.date,
      notes: req.body.notes,
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).send("Error creating appointment");
  }
});
