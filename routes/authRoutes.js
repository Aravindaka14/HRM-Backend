// const express = require('express');
// const { register, login } = require('../controllers/authController');
// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);

// module.exports = router;


//2
import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { validateEmail } from '../controllers/employeeController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/validate/:token', validateEmail);  // Email validation route

export default router;



