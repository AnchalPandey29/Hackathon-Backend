const express = require("express");
const LeaveRequest = require("../models/LeaveRequest");
const router = express.Router();

// Get all pending leave requests
router.get("/", async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find({ status: "Pending" });
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leave requests" });
  }
});

// Approve a leave request
router.post("/approve/:employeeId", async (req, res) => {
  try {
    await LeaveRequest.updateOne(
      { employeeId: req.params.employeeId },
      { status: "Approved" }
    );
    res.status(200).json({ message: "Leave approved" });
  } catch (error) {
    res.status(500).json({ error: "Failed to approve leave" });
  }
});

// Reject a leave request
router.post("/reject/:employeeId", async (req, res) => {
  try {
    await LeaveRequest.updateOne(
      { employeeId: req.params.employeeId },
      { status: "Rejected" }
    );
    res.status(200).json({ message: "Leave rejected" });
  } catch (error) {
    res.status(500).json({ error: "Failed to reject leave" });
  }
});

module.exports = router;
