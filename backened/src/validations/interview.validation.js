exports.validateScheduleInterview = (req, res, next) => {
  const { jobId, candidateId, interviewerId } = req.body;

  if (!jobId || !candidateId || !interviewerId) {
    return res.status(400).json({ message: "Missing interview details" });
  }

  next();
};
