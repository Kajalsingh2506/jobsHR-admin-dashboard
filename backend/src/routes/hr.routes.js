const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const c = require("../controllers/company.controller");

// HR → dashboard stats
router.get(
  "/dashboard-stats",
  auth,
  role("HR_ADMIN"),
  c.getHRDashboardStats
);

// HR → company info
router.get(
  "/company",
  auth,
  role("HR_ADMIN"),
  c.getMyCompany
);

module.exports = router;
