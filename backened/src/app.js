const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const companyRoutes = require("./routes/company.routes");
const userRoutes = require("./routes/user.routes");
const jobRoutes = require("./routes/job.routes");
const interviewRoutes = require("./routes/interview.routes");
const errorMiddleware = require("./middleware/errorMiddleware");
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/interviews", interviewRoutes);
app.use(errorMiddleware);

module.exports = app;
