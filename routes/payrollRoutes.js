const express = require("express");
const router = express.Router();
const Payroll = require("../models/PayRoll");
const nodemailer = require("nodemailer");
const Employee = require("../models/Employee");

router.get("/unpaid", async (req, res) => {
  try {
    const unpaidEmployees = await Payroll.find({ paid: false });

    // Map through the unpaid employees and fetch their details from the Employee table
    const unpaidEmployeesDetails = await Promise.all(
      unpaidEmployees.map(async (employee) => {
        const employeeDetails = await Employee.findOne({
          emp_id: employee.emp_id,
        });
        const startDate = new Date(employeeDetails.startDate);
        const endDate = new Date();
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const salary = employeeDetails.baseSalary;
        const workingDays = diffDays;
        return {
          id: employeeDetails._id,
          emp_name: employeeDetails.name,
          salary: salary,
          workingDays: workingDays,
          paid: false,
        };
      })
    );

    res.json(unpaidEmployeesDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/paid", async (req, res) => {
  try {
    const paidEmployees = await Payroll.find({ paid: true });

    // Map through the unpaid employees and fetch their details from the Employee table
    const paidEmployeesDetails = await Promise.all(
      paidEmployees.map(async (employee) => {
        const employeeDetails = await Employee.findOne({
          emp_id: employee.emp_id,
        });
        const startDate = new Date(employeeDetails.startDate);
        const endDate = new Date();
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const salary = employeeDetails.baseSalary;
        const workingDays = diffDays;

        return {
          emp_id: employeeDetails._id,
          emp_name: employeeDetails.name,
          salary: salary,
          workingDays: workingDays,
          paid: true,
        };
      })
    );

    res.json(paidEmployeesDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// paying employee
router.put("/pay/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ emp_id: req.params.id });
    if (employee.paid) {
      return res.status(400).json({ message: "Employee is already paid" });
    }
    employee.paid = true;
    await employee.save();
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "agarwalpriyanshu168@gmail.com",
        pass: "fhkrzrztygqmibsn ",
      },
    });
    const mailOptions = {
      from: "agarwalpriyanshu168@gmail.com",
      to: employee.email,
      subject: "Payment Received",
      text: `Dear ${employee.name},\n\nYour payment has been processed successfully.\n\nThank you.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error occurred while sending email:", error.message);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.json({ message: "Employee paid successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
