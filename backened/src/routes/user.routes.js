const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const c = require("../controllers/user.controller");

router.post("/", auth, role("HR_ADMIN"), c.createUser);

module.exports = router;
