const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const c = require("../controllers/job.controller");

router.post("/", auth, c.createJob);
router.get("/", auth, c.listJobs);
router.post("/apply/:id", auth, c.applyJob);

module.exports = router;
