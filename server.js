import express, { json } from 'express';
import { config } from 'dotenv';
import cors from "cors";
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import User from "./models/User.js"

config();
connectDB();

const app = express();
app.use(json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const createAdminUser = async () => {
    try {
        // Establish database connection
        await connectDB();

        // Password hashing (you should always hash passwords)
        const hashedPassword = await bcrypt.hash('12345', 10);  // Replace with a more secure password

        // Create the admin user
        const adminUser = new User({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,  // Hashed password
            role: 'Admin',
            archieved: false
        });

        // Save to database
        const savedUser = await adminUser.save();

        console.log('Admin user created:', savedUser);
    } catch (err) {
        console.error('Error creating admin user:', err);
    }
};

// createAdminUser();  // Call the function to create admin