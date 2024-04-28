const bcrypt = require("bcrypt");
const Employee = require("../models/Employee");
const User = require("../models/User");

const compareStrings = (password, hashedPassword) => {
  return password === hashedPassword;
};

// User login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized access Wrong Email" });
    }
    // Check if password matches
    const isPasswordValid = await compareStrings(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Unauthorized access Invalid password" });
    }
    // Check user's position
    const employee = await Employee.findOne({ emp_id: user.user_id });
    if (!employee) {
      return res
        .status(401)
        .json({ message: "Unauthorized access no such employee found" });
    }
    // Redirect based on user's position
    if (employee.position === "HR") {
      res.json({ redirectUrl: "/dashboard" });
    } else {
      res.json({ redirectUrl: "/user-profile" });
    }
  } catch (err) {
    next(err);
  }
};
