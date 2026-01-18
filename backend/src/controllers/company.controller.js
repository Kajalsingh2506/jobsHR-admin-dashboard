//controllers/company.controller.js
const Company = require("../models/Company");
const User = require("../models/User");
const Interview = require("../models/Interview");
// const Job = require("../models/Job"); 
const bcrypt = require("bcryptjs");

// ✅ CREATE COMPANY
exports.createCompany = async (req, res) => {
  try {
    if (
  !req.body.hrName ||
  !req.body.hrEmail ||
  !req.body.password ||
  !req.body.companyName
) {
  return res.status(400).json({
    message: "All fields are required",
  });
}


    // 1️⃣ Check duplicate HR email
    const existingUser = await User.findOne({ email: req.body.hrEmail });
    if (existingUser) {
      return res.status(400).json({
        message: "HR email already exists",
      });
    }
    const hashed = await bcrypt.hash(req.body.password, 10);

    const hr = await User.create({
      name: req.body.hrName,
      email: req.body.hrEmail,
      password: hashed,
      role: "HR_ADMIN",
    });

    const company = await Company.create({
      name: req.body.companyName,
      hrAdminId: hr._id,
    });

    hr.companyId = company._id;
    await hr.save();

    res.status(201).json({ message: "Company created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ LIST COMPANIES
exports.listCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate(
      "hrAdminId",
      "name email"
    );

    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DASHBOARD STATS (SuperAdmin)
exports.getDashboardStats = async (req, res) => {
  const companiesCount = await Company.countDocuments();
  const hrAdminsCount = await User.countDocuments({
    role: "HR_ADMIN",
  });
  const recruitersCount = await User.countDocuments({
    role: "RECRUITER",
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const interviewsToday = await Interview.countDocuments({
    createdAt: { $gte: today },
  });

  res.json({
    companies: companiesCount,
    hrAdmins: hrAdminsCount,
    recruiters: recruitersCount,
    interviewsToday,
  });
};
// ✅ ENABLE / DISABLE COMPANY
exports.toggleCompanyStatus = async (req, res) => {
  const { id } = req.params;

  const company = await Company.findById(id);
  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  company.status =
    company.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

  await company.save();

  res.json({
    message: "Company status updated",
    status: company.status,
  });
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate("hrAdminId", "email");

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch company" });
  }
};


exports.getMyCompany = async (req, res) => {
  try {
    const companyId = req.user.companyId;

    if (!companyId) {
      return res.status(400).json({ message: "Company not linked" });
    }

    const company = await Company.findById(companyId).select("name");

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch company" });
  }
};


// // ✅ DASHBOARD STATS (HR - Company Specific)
// exports.getHRDashboardStats = async (req, res) => {
//   try {
//     const companyId = req.user.companyId;

//     if (!companyId) {
//       return res.status(400).json({ message: "Company not found for HR" });
//     }

//     const jobs = await Job.countDocuments({ companyId });

//     const recruiters = await User.countDocuments({
//       role: "RECRUITER",
//       companyId,
//     });

//     const interviewers = await User.countDocuments({
//       role: "INTERVIEWER",
//       companyId,
//     });

//     const interviewsCompleted = await Interview.countDocuments({
//       companyId,
//       status: "COMPLETED",
//     });

//     res.json({
//       jobs,
//       recruiters,
//       interviewers,
//       interviewsCompleted,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "HR dashboard stats failed" });
//   }
// };
