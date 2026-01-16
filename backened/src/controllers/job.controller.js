const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  await Job.create({
    title: req.body.title,
    companyId: req.user.companyId,
    recruiterId: req.user.id,
  });
  res.json({ message: "Job created" });
};

exports.listJobs = async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
};

exports.applyJob = async (req, res) => {
  await Job.findByIdAndUpdate(req.params.id, {
    $addToSet: { applicants: req.user.id },
  });
  res.json({ message: "Applied" });
};
