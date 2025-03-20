const express = require("express");
const BugReportModel = require("../models/BugReportModel"); // Adjust path if needed

const bugReportRouter = express.Router();

// POST: Create a new bug report
bugReportRouter.post("/", async (req, res) => {
  try {
    const newBugReport = new BugReportModel(req.body);
    await newBugReport.save();
    res.status(201).json({ message: "Bug Reported Successfully!", newBugReport });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET: Retrieve all bug reports
bugReportRouter.get("/", async (req, res) => {
  try {
    const bugReports = await BugReportModel.find();
    res.status(200).json(bugReports);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = bugReportRouter;
