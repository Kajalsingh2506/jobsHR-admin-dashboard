import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layout/MainLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import InterviewerDashboard from "./pages/interviewer/InterviewerDashboard";
import HRDashboard from "./pages/hr/HRDashboard";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import CompanyDetails from "./pages/superadmin/CompanyDetails";
import CandidateProfile from "./pages/candidate/CandidateProfile";

import JobApplicants from "./pages/recruiter/JobApplicants";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/candidate"
              element={
                <ProtectedRoute roles={["CANDIDATE"]}>
                  <CandidateDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/candidate/profile"
              element={
                <ProtectedRoute roles={["CANDIDATE"]}>
                  <CandidateProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/recruiter"
              element={
                <ProtectedRoute roles={["RECRUITER"]}>
                  <RecruiterDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/interviewer"
              element={
                <ProtectedRoute roles={["INTERVIEWER"]}>
                  <InterviewerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/hr"
              element={
                <ProtectedRoute roles={["HR_ADMIN"]}>
                  <HRDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/superadmin"
              element={
                <ProtectedRoute roles={["SUPER_ADMIN"]}>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/companies/:id"
              element={
                <ProtectedRoute roles={["SUPER_ADMIN"]}>
                  <CompanyDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/recruiter/jobs/:jobId/applicants"
              element={
                <ProtectedRoute roles={["RECRUITER"]}>
                  <JobApplicants />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}
