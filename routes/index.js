const express = require("express");
const router = express.Router();
const employeeRoutes = require("./employeeRoutes");
const authController = require("../controllers/authController");
const courseRoutes = require("./courseRoutes");
const leaveRoutes = require("./leaveRoutes");

router.use("/employees", employeeRoutes);
router.post("/login", authController.login);
router.use("/courses", courseRoutes);
router.use("/leave-requests", leaveRoutes);

module.exports = router;
