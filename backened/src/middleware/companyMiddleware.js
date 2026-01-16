module.exports = (req, res, next) => {
  if (!req.user.companyId) {
    return res.status(403).json({ message: "Company access required" });
  }

  req.companyId = req.user.companyId;
  next();
};
