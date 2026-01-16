const Interview = require("../models/Interview");

exports.schedule = async (req, res) => {
  await Interview.create({
    ...req.body,
    status: "Scheduled",
  });
  res.json({ message: "Interview scheduled" });
};

exports.list = async (req, res) => {
  const interviews = await Interview.find({
    interviewerId: req.user.id,
  });
  res.json(interviews);
};

exports.feedback = async (req, res) => {
  await Interview.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Feedback submitted" });
};
