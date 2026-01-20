const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const c = require("../controllers/user.controller");

// HR Admin actions
router.post("/", auth, role("HR_ADMIN"), c.createUser);
router.put("/:id", auth, role("HR_ADMIN"), c.updateUser);
router.delete("/:id", auth, role("HR_ADMIN"), c.deleteUser);

// Fetch company users (HR admin)
router.get("/", auth, role("HR_ADMIN"), c.getCompanyUsers);

// ✅ Fetch interviewers (Recruiter)
router.get(
  "/interviewers",
  auth,
  role("RECRUITER"),
  c.getInterviewers
);

module.exports = router;
