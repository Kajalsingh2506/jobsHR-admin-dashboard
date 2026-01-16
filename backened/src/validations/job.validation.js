exports.validateCreateJob = (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Job title is required" });
  }

  next();
};
