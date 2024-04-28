const Employee = require("../models/Employee");
const User = require("../models/User");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// Get all employees
exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ emp_id: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

// Create new employee
exports.createEmployee = async (req, res, next) => {
  try {
    const {
      name,
      phno,
      position,
      department,
      salary,
      startDate,
      endDate,
      email,
    } = req.body;

    // Check if employee with the same email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ error: "Employee with this email already exists" });
    }

    // Generate a unique emp_id
    const emp_id = uuid.v4();

    // Generate a unique password for the user
    const password = uuid.v4();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new employee object
    const employee = new Employee({
      emp_id,
      name,
      phno,
      position,
      department,
      salary,
      startDate,
      endDate,
      email,
      status: "pending",
    });

    await employee.save();

    // Create new user object
    const user = new User({
      user_id: emp_id,
      email,
      password: hashedPassword, // Store hashed password in the database
    });

    await user.save();

    // Send email to the user with emp_id, email, and password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "agarwalpriyanshu168@gmail.com", // Your email address
        pass: "fhkrzrztygqmibsn ", // Your email password
      },
    });

    const mailOptions = {
      from: "agarwalpriyanshu168@gmail.com", // Sender address
      to: email, // Recipient address
      subject: "Welcome to the Company!",
      html: `
        <p>Hello ${name},</p>
        <p>Your employee ID: ${emp_id}</p>
        <p>Your email: ${email}</p>
        <p>Your password: ${password}</p>
        <p>Please keep this information secure.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({ message: "Employee added successfully" });
  } catch (err) {
    next(err);
  }
};

// Update employee by ID
exports.updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { emp_id: req.params.id },
      { $set: req.body }, // Use $set to update only the specified fields
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

// Delete employee by ID
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOneAndDelete({ emp_id: req.params.id });
    const user = await User.findOneAndDelete({ user_id: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted" });
  } catch (err) {
    next(err);
  }
};
