import { Router } from 'express';
import { getEmployees, addEmployee } from '../controllers/employeeController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/get', protect, getEmployees);
router.post('/create', protect, addEmployee);

export default router;
