//models/job.js

// const mongoose = require("mongoose");

// const jobSchema = new mongoose.Schema({
//   title: String,
//   companyId: mongoose.Schema.Types.ObjectId,
//   recruiterId: mongoose.Schema.Types.ObjectId,
//   applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
// });

// module.exports = mongoose.model("Job", jobSchema);

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // 👈 REQUIRED
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", // 👈 ADD REF
      required: true,
    },

    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 👈 ADD REF
      required: true, // 👈 REQUIRED
    },

    //     applicants: [
    //       {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User",
    //       },
    //     ],
    //   },
    //   { timestamps: true }             // 👈 ADD THIS
    // );

    applicants: [
      {
        candidate: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        interviewer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // interviewer role
        },

        status: {
          type: String,
          enum: [
            "APPLIED",
            "SHORTLISTED",
            "INTERVIEW_SCHEDULED",
            "SELECTED",
            "REJECTED",
          ],
          default: "APPLIED",
        },
        interviewDate: String,
        interviewTime: String,
        feedback: String,
        rating: Number,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Job", jobSchema);
