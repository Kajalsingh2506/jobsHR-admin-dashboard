const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const c = require("../controllers/company.controller");

router.post("/", auth, role("SUPER_ADMIN"), c.createCompany);

router.get("/", auth, role("SUPER_ADMIN"), c.listCompanies);

router.get("/stats", auth, role("SUPER_ADMIN"), c.getDashboardStats);

router.get("/company", auth, c.getMyCompany);

router.get("/:id", auth, role("SUPER_ADMIN"), c.getCompanyById);

router.patch("/:id", auth, role("SUPER_ADMIN"), c.updateCompany);

router.delete("/:id", auth, role("SUPER_ADMIN"), c.deleteCompany);

router.patch("/:id/status", auth, role("SUPER_ADMIN"), c.toggleCompanyStatus);

// // ✅ HR DASHBOARD STATS (Company HR)
// router.get(
//   "/hr/dashboard-stats",
//   auth,
//   role("HR_ADMIN"),
//   c.getHRDashboardStats
// );

module.exports = router;
