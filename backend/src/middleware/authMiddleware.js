// const { verifyToken } = require("../config/jwt");

// module.exports = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "Authentication required" });
//   }

//   try {
//     req.user = verifyToken(token);
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    // 🔹 1. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔹 2. Get user + company from DB
    const user = await User.findById(decoded.id).populate("companyId");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 🔴 3. BLOCK ACCESS IF COMPANY IS INACTIVE
    // if (user.companyId && user.companyId.status !== "ACTIVE") {
    //   return res.status(403).json({
    //     message: "Company account is inactive",
    //   });
    // }

if (
  (user.role === "HR_ADMIN" || user.role === "RECRUITER") &&
  (!user.companyId || user.companyId.status !== "ACTIVE")
) {
  return res.status(403).json({
    message: "Company account is inactive",
  });
}



    // 🔹 4. Attach user to request
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
