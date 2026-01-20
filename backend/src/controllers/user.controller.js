const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  await User.create({
    ...req.body,
    password: hashed,
    companyId: req.user.companyId,
  });

  res.json({ message: "User created" });
};


exports.getCompanyUsers = async (req, res) => {
  try {
    const { role } = req.query;

    const users = await User.find({
      companyId: req.user.companyId,
      role,
    }).select("name email role");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const updateData = { name, email };

    if (password) {
      const bcrypt = require("bcryptjs");
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

exports.getInterviewers = async (req, res) => {
  try {
    const interviewers = await User.find(
      { role: "INTERVIEWER" },
      "name email"
    );

    res.json(interviewers);
  } catch (err) {
    res.status(500).json({ message: "Failed to load interviewers" });
  }
};