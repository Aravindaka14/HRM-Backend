import { Router } from 'express';
import Payroll from './models/Payroll.js';

const router = Router();

router.post('/generate-payslip', async (req, res) => {
    const { employeeId, month, basicSalary, allowances, deductions } = req.body;
  
    try {
      const totalPay = basicSalary + allowances - deductions;
  
      const payroll = new Payroll({
        employeeId,
        month,
        basicSalary,
        allowances,
        deductions,
        totalPay,
      });
  
      await payroll.save();
      res.status(201).json({ message: 'Payslip generated successfully', payroll });
    } catch (error) {
      res.status(500).json({ message: 'Error generating payslip', error });
    }
  });
  
  export default router;