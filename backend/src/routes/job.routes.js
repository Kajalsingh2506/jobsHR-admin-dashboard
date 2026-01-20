// const router = require("express").Router();
// const auth = require("../middleware/authMiddleware");
// const role = require("../middleware/roleMiddleware");
// const c = require("../controllers/job.controller");
// // const jobController = require("../controllers/job.controller");

// router.post("/", auth, c.createJob);
// router.get("/", auth, c.listJobs);
// router.post("/apply/:id", auth, c.applyJob);
// router.post(
//   "/",
//   auth,
//   role("RECRUITER"),
//   controller.createJob
// );

// router.get(
//   "/my",
//   auth,
//   role("RECRUITER"),
//   controller.getMyJobs
// );
// module.exports = router;

const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const c = require("../controllers/job.controller");

// CREATE JOB (RECRUITER ONLY)
router.post("/", auth, role("RECRUITER"), c.createJob);

// LIST ALL JOBS
router.get("/", auth, c.listJobs);

// APPLY TO JOB
router.post("/apply/:id", auth, c.applyJob);

// GET MY JOBS (RECRUITER)
router.get("/my", auth, role("RECRUITER"), c.getMyJobs);

router.get(
  "/:id/applicants",
  auth,
  role("RECRUITER"),
  c.getJobApplicants
);

router.put(
  "/:jobId/applicants/:candidateId/status",
  auth,
  role("RECRUITER"),
  c.updateApplicantStatus 
);

router.put(
  "/:jobId/applicants/:candidateId/schedule",
  auth,
  role("RECRUITER"),
  c.scheduleInterview
);

router.get(
  "/interviewer/my-interviews",
  auth,
  role("INTERVIEWER"),
  jobController.getMyInterviews
);

router.put(
  "/:jobId/applicants/:candidateId/feedback",
  auth,
  role("INTERVIEWER"),
  jobController.submitInterviewFeedback
);



module.exports = router;
