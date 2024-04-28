const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  emp_id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phno: { type: Number, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, required: true },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
