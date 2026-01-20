const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  await User.create({
    ...req.body,
    password: hashed,
    role: "CANDIDATE",
  });

  res.json({ message: "Signup successful" });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).populate("companyId");
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    //   // 🔴 3. BLOCK LOGIN IF COMPANY IS DISABLED
    // if (user.companyId && user.companyId.status !== "ACTIVE") {
    //   return res.status(403).json({
    //     message: "Your company is disabled. Contact Super Admin.",
    //   });
    // }

    // 🔴 STRICT COMPANY CHECK FOR HR / RECRUITER
if (
  (user.role === "HR_ADMIN" || user.role === "RECRUITER") &&
  (!user.companyId || user.companyId.status !== "ACTIVE")
) {
  return res.status(403).json({
    message: "Your company is disabled. Contact Super Admin.",
  });
}



  // const token = jwt.sign(
  //   { id: user._id, role: user.role, companyId: user.companyId },
  //   process.env.JWT_SECRET,
  //   { expiresIn: "15m" }
  // );

  const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
    name: user.name,          // 👈 ADD THIS
    companyId: user.companyId?._id || null,
  },
  process.env.JWT_SECRET,
  { expiresIn: "15m" }
);




  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
  });

  // res.json({ role: user.role });
  res.json({
  role: user.role,
   name: user.name,
  companyId: user.companyId?._id || user.companyId,
});

};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

// exports.me = async (req, res) => {
//   res.json({
//     id: req.user.id,
//     role: req.user.role,
//     name: req.user.name,
//     companyId: req.user.companyId,
//   });
// };
