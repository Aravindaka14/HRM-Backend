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

// import { text } from 'body-parser';

// export async function SendMail(to, subject, text) {

//   //Create transportor
//   const transportor = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "aravindaka14@gmail.com",
//       pass: "Aravindkumar@140301"
//     }
//   })

//   const mailOptions = {
//     from: "aravindaka14@gmail.com",
//     to: to,
//     // "dilipk5406@gmail.com",
//     subject: subject,
//     // "Test email from nodemailer",
//     text: text,
//     // "Hi Dilip kumar this is for testing purposes.",
//     html: '<h1>Hi Dilip kumar</h1><p>this is for testing purposes.</p>'
//   }

//   transportor.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log('Error:', error);
//     }
//     console.log("email sent:", info.response)
//   })
// }

import Employee from '../models/Employee.js';
import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

// Add new employee and send email for validation
export async function addEmployee(req, res) {

  const { firstName, lastName, email, department,activationLink } = req.body;
  // console.log(firstName, lastName, email, department, salary );

  try {
    const newEmployee = new Employee({ firstName, lastName, email, department});

    // Generate validation token
    // const validationToken = randomBytes(20).toString('hex');
    // newEmployee.validationToken = validationToken;

    await newEmployee.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Replace with your email service (e.g., Gmail, Outlook, etc.)
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });
    // console.log(transporter)
    // Send email for validation
    // const validationLink = `${process.env.BASE_URL}/validate/${validationToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Employee Email Validation from Ultrafly',
      html: `
      <p>Dear ${firstName},</p>
      <p>We are excited to have you join the <strong>[Your Company]</strong> family! To help you get started, we need you to activate your employee account.</p>
      <p>Please click the link below to complete the activation process:</p>
      <p><a href="${activationLink}" style="color: #007bff; text-decoration: none;">Activate My Account</a></p>
      <p>This link is valid until [date/time, if applicable]. Once your account is activated, you will gain access to the <strong>[platform details]</strong>.</p>
      <p>If you encounter any issues during activation, please don't hesitate to reach out to us at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>.</p>
      <p>We look forward to working together and achieving great success!</p>
      <br />
      <p>Best regards,</p>
      <p><strong>[Your Full Name]</strong></p>
      <p>[Your Job Title]</p>
      <p>[Your Company Name]</p>
    `
    };
    // console.log(mailOptions)
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Employee created! Please check your email to validate.' });
  } catch (error) {
    console.error('Error adding employee:', error);
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