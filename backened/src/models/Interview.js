const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  jobId: mongoose.Schema.Types.ObjectId,
  candidateId: mongoose.Schema.Types.ObjectId,
  interviewerId: mongoose.Schema.Types.ObjectId,
  status: String,
  feedback: String,
  rating: Number,
});

module.exports = mongoose.model("Interview", interviewSchema);
