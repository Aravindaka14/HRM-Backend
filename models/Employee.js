import { Schema, model } from 'mongoose';

const employeeSchema = new Schema({
  // firstName: { type: String, required: true },
  // lastName: { type: String, required: true },
  // email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  hireDate: { type: Date, default: Date.now },
  salary: { type: Number },
  isActive: { type: Boolean, default: true },
  isValidated: { type: Boolean, default: false },  // New field for validation
  validationToken: { type: String }                 // Token for email validation
});

export default model('Employee', employeeSchema);
