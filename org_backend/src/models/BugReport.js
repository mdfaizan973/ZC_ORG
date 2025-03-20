const mongoose = require("mongoose");

const BugReportSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: false },
    user_id: { type: String, required: false },
    user_email: { type: String, required: true },
    bug: { type: String, required: true },
    priority: { type: String, required: false },
  },
  { timestamps: { createdAt: "bug_report_date", updatedAt: false }, versionKey: false }
);

const BugReportModel = mongoose.model("bugReport", BugReportSchema);
module.exports = BugReportModel;
