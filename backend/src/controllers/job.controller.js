//controllers/job.controllers.js
const Job = require("../models/Job");

// exports.createJob = async (req, res) => {
//   await Job.create({
//     title: req.body.title,
//     companyId: req.user.companyId,
//     recruiterId: req.user.id,
//   });
//   res.json({ message: "Job created" });
// };

exports.createJob = async (req, res) => {
  const job = await Job.create({
    title: req.body.title,
    companyId: req.user.companyId,
    recruiterId: req.user.id, // 👈 THIS IS CORRECT
  });

  res.json(job); // 👈 RETURN JOB OBJECT
};

exports.getMyJobs = async (req, res) => {
  const jobs = await Job.find({
    recruiterId: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(jobs);
};

// exports.listJobs = async (req, res) => {
//   const jobs = await Job.find();
//   res.json(jobs);
// };

// exports.applyJob = async (req, res) => {
//   await Job.findByIdAndUpdate(req.params.id, {
//     $addToSet: { applicants: req.user.id },
//   });
//   res.json({ message: "Applied" });
// };

// exports.applyJob = async (req, res) => {
//   await Job.findByIdAndUpdate(req.params.id, {
//     $addToSet: {
//       applicants: {
//         candidate: req.user.id,
//         status: "APPLIED",
//       },
//     },
//   });

//   res.json({ message: "Applied" });
// };
exports.listJobs = async (req, res) => {
  const candidateId = req.user?.id;

  const jobs = await Job.find().lean();

  const jobsWithAppliedFlag = jobs.map((job) => ({
    ...job,
    isApplied: candidateId
      ? job.applicants.some((a) => a.candidate.toString() === candidateId)
      : false,
  }));

  res.json(jobsWithAppliedFlag);
};

exports.applyJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  const alreadyApplied = job.applicants.some(
    (a) => a.candidate.toString() === req.user.id,
  );

  if (alreadyApplied) {
    return res.status(400).json({ message: "Already applied" });
  }

  job.applicants.push({
    candidate: req.user.id,
    status: "APPLIED",
  });

  await job.save();

  res.json({ message: "Applied" });
};

exports.getJobApplicants = async (req, res) => {
  const job = await Job.findById(req.params.id)
    .populate("applicants.candidate", "name email")
    .populate("applicants.interviewer", "name email");
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.json(job.applicants);
};

exports.updateApplicantStatus = async (req, res) => {
  const { status } = req.body;

  await Job.updateOne(
    { _id: req.params.jobId, "applicants.candidate": req.params.candidateId },
    { $set: { "applicants.$.status": status } },
  );

  res.json({ message: "Status updated" });
};

// exports.scheduleInterview = async (req, res) => {
//   const { interviewDate, interviewTime } = req.body;

//   await Job.updateOne(
//     {
//       _id: req.params.jobId,
//       "applicants.candidate": req.params.candidateId,
//     },
//     {
//       $set: {
//         "applicants.$.interviewDate": interviewDate,
//         "applicants.$.interviewTime": interviewTime,
//         "applicants.$.status": "INTERVIEW_SCHEDULED",
//       },
//     },
//   );

//   res.json({ message: "Interview scheduled" });
// };

exports.scheduleInterview = async (req, res) => {
  const { interviewDate, interviewTime, interviewerId } = req.body;

  await Job.updateOne(
    {
      _id: req.params.jobId,
      "applicants.candidate": req.params.candidateId,
    },
    {
      $set: {
        "applicants.$.interviewer": interviewerId,
        "applicants.$.interviewDate": interviewDate,
        "applicants.$.interviewTime": interviewTime,
        "applicants.$.status": "INTERVIEW_SCHEDULED",
      },
    },
  );

  res.json({ message: "Interview scheduled" });
};

exports.getMyInterviews = async (req, res) => {
  const interviewerId = req.user.id;

  const jobs = await Job.find({
    "applicants.interviewer": interviewerId,
  })
    .populate("applicants.candidate", "name email")
    .populate("recruiterId", "name")
    .lean();

  const interviews = [];

  jobs.forEach((job) => {
    job.applicants.forEach((a) => {
      if (a.interviewer && a.interviewer.toString() === interviewerId) {
        interviews.push({
          jobId: job._id,
          jobTitle: job.title,
          candidateId: a.candidate._id,
          candidateName: a.candidate.name,
          candidateEmail: a.candidate.email,
          interviewDate: a.interviewDate,
          interviewTime: a.interviewTime,
          status: a.status,
        });
      }
    });
  });

  res.json(interviews);
};

exports.submitInterviewFeedback = async (req, res) => {
  const { feedback, rating, decision } = req.body;

  await Job.updateOne(
    {
      _id: req.params.jobId,
      "applicants.candidate": req.params.candidateId,
      "applicants.interviewer": req.user.id,
    },
    {
      $set: {
        "applicants.$.feedback": feedback,
        "applicants.$.rating": rating,
        "applicants.$.status": decision,
      },
    },
  );

  res.json({ message: "Feedback submitted" });
};
