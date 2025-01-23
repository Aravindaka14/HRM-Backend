import { Router } from 'express';
import { getEmployees, addEmployee } from '../controllers/employeeController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/', protect, getEmployees);
router.post('/', protect, addEmployee);

export default router;
