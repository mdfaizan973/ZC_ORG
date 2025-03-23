const express = require("express");
const BugReportModel = require("../models/BugReport");
const updateMissingFields = require("../utils/updateMissingFields");

const bugReportRouter = express.Router();

updateMissingFields(BugReportModel);
// POST: Create a new bug report
bugReportRouter.post("/", async (req, res) => {
  try {
    const newBugReport = new BugReportModel(req.body);
    await newBugReport.save();
    res
      .status(201)
      .json({ message: "Bug Reported Successfully!", newBugReport });
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

bugReportRouter.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const newBugReport = await BugReportModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, // Return the updated user
        runValidators: true, // Apply validation rules
      }
    );
    res.status(201).json({ message: "Bug Fixed!", newBugReport });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = bugReportRouter;
