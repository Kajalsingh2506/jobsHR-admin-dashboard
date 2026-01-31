//models/CandidateProfile.js
const mongoose = require("mongoose");

const candidateProfileSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // or Candidate model
      required: true,
      unique: true,
    },

    fullName: String,
    dob: Date,
    gender: String,
    email: String,
    location: String,
    languages: String,
    education: String,
    skills: String,

    profilePhoto: String, // file path
    resume: String, // file path
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "CandidateProfile",
  candidateProfileSchema
);
