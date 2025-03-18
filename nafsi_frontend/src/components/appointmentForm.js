// frontend/src/components/AppointmentForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAppointment } from "../features/appointmentsSlice";

const AppointmentForm = () => {
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAppointment({ doctorId, date }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Book Appointment</button>
    </form>
  );
};
