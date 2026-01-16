const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  companyId: mongoose.Schema.Types.ObjectId,
  recruiterId: mongoose.Schema.Types.ObjectId,
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Job", jobSchema);
