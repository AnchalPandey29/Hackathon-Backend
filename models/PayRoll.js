// employeeModel.js
const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  emp_id: String,
  name: String,
  baseSalary: Number,
  paid: Boolean,
});

const Payroll = mongoose.model("payroll", payrollSchema);

module.exports = Payroll;
