const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const c = require("../controllers/interview.controller");

router.post("/schedule", auth, c.schedule);
router.get("/", auth, c.list);
router.post("/feedback/:id", auth, c.feedback);

module.exports = router;
