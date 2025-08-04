import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import appointmentRoutes from "./routes/appointmentRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(express.json());

// Root Route
app.get("/", (_req, res) => {
  res.send("🚀 Appointment Booking Backend API");
});

app.use("/api/appointments", appointmentRoutes);

// Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
