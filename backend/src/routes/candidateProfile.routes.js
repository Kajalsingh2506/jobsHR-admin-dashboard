// candidateProfile.routes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware"); // your JWT auth
const {
  getProfile,
  saveProfile,
} = require("../controllers/candidateProfile.controller");

router.get("/profile", auth, getProfile);

router.post(
  "/profile",
  auth,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  saveProfile
);

module.exports = router;
