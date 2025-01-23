import { Schema, model } from 'mongoose';



const PayrollSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  month: { type: String, required: true }, // e.g., "January 2025"
  basicSalary: { type: Number, required: true },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  totalPay: { type: Number, required: true },
  generatedAt: { type: Date, default: Date.now },
});

export default model("Payroll", PayrollSchema);