import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    doctorId: { type: String, required: true },
    doctorName: { type: String, required: true },
    date: { type: String, required: true },
    slot: { type: String, required: true },
    purpose: { type: String, required: true },
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
