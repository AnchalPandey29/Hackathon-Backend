const express = require("express");
const router = express.Router();
const employeeRoutes = require("./employeeRoutes");
const authController = require("../controllers/authController");
const courseRoutes = require("./courseRoutes");
const leaveRoutes = require("./leaveRoutes");
const payrollRoutes = require("./payrollRoutes");

router.use("/employees", employeeRoutes);
router.post("/login", authController.login);
router.use("/courses", courseRoutes);
router.use("/leave-requests", leaveRoutes);
router.use("/payroll", payrollRoutes);
module.exports = router;
