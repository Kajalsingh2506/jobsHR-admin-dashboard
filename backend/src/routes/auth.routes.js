

const router = require("express").Router();
const c = require("../controllers/auth.controller");
const auth = require("../middleware/authMiddleware");

router.post("/signup", c.signup);
router.post("/login", c.login);
router.post("/logout", c.logout);

router.get("/me", require("../middleware/authMiddleware"), (req, res) => {
  res.json(req.user);
});
module.exports = router;
