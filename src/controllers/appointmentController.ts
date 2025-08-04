import { Request, Response } from "express";
import { Appointment } from "../models/appointmentModel";

// @desc    Get all appointments
export const getAppointments = async (_req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments", error });
  }
};

// @desc    Create new appointment
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { name, doctorId, doctorName, date, slot, purpose } = req.body;

    const newAppointment = new Appointment({
      name,
      doctorId,
      doctorName,
      date,
      slot,
      purpose,
    });

    const saved = await newAppointment.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to create appointment", error });
  }
};

// @desc    Update appointment
export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update appointment" });
  }
};

// @desc    Delete appointment
export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
