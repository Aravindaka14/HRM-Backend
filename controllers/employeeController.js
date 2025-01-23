// const Employee = require('../models/Employee');



// // Add a new employee
// exports.addEmployee = async (req, res) => {
//   const { firstName, lastName, email, department, salary } = req.body;

//   try {
//     const newEmployee = new Employee({ firstName, lastName, email, department, salary });
//     await newEmployee.save();

//     res.status(201).json(newEmployee);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to add employee' });
//   }
// };


//2
import Employee from '../models/Employee.js';
import { createTransport } from 'nodemailer';
import { randomBytes } from 'crypto';

// Email transport configuration
const transporter = createTransport({
  service: 'gmail',  // You can choose another email service provider like SendGrid, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Add new employee and send email for validation
export async function addEmployee(req, res) {
  const { firstName, lastName, email, department, salary } = req.body;

  try {
    const newEmployee = new Employee({ firstName, lastName, email, department, salary });
    
    // Generate validation token
    const validationToken = randomBytes(20).toString('hex');
    newEmployee.validationToken = validationToken;
    
    await newEmployee.save();

    // Send email for validation
    const validationLink = `${process.env.BASE_URL}/validate/${validationToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Employee Email Validation',
      html: `<p>Click the link below to validate your email:</p><a href="${validationLink}">${validationLink}</a>`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Employee created! Please check your email to validate.' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to add employee' });
  }
}

// const express = require('express');
// const Employee = require('../models/Employee');

export async function validateEmail(req, res) {
  const { token } = req.params;

  try {
    const employee = await Employee.findOne({ validationToken: token });
    
    if (!employee) return res.status(400).json({ message: 'Invalid or expired token' });

    employee.isValidated = true;  // Update the validation status
    employee.validationToken = null;  // Clear the token
    
    await employee.save();

    res.status(200).json({ message: 'Email validated successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}


// // Get all employees
export async function getEmployees(req, res) {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}