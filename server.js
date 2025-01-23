import express, { json } from 'express';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

config();
connectDB();

const app = express();
app.use(json());

// Routes
app.use('/api/auth',authRoutes);
app.use('/api/employees', employeeRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
