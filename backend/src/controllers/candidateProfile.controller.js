// candidateProfile.controller.js
const CandidateProfile = require("../models/CandidateProfile");

exports.getProfile = async (req, res) => {
  try {
    const profile = await CandidateProfile.findOne({
      candidate: req.user._id,
    });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.saveProfile = async (req, res) => {
  try {
    const existingProfile = await CandidateProfile.findOne({
      candidate: req.user._id,
    });

    const data = {
      candidate: req.user._id,
      fullName: req.body.fullName,
      dob: req.body.dob,
      gender: req.body.gender,
      email: req.body.email,
      location: req.body.location,
      languages: req.body.languages,
      education: req.body.education,
      skills: req.body.skills,
    };

    if (req.files?.photo) {
      data.profilePhoto = req.files.photo[0].path;
    }

    if (req.files?.resume) {
      data.resume = req.files.resume[0].path;
    }

    let profile;

    if (existingProfile) {
      profile = await CandidateProfile.findOneAndUpdate(
        { candidate: req.user._id },
        data,
        { new: true }
      );
    } else {
      profile = await CandidateProfile.create(data);
    }

    res.json({ message: "Profile saved", profile });
  } catch (err) {
    res.status(500).json({ message: "Profile save failed" });
  }
};
