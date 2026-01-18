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


