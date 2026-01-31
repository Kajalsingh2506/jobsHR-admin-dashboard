//RecruiterDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [recruiterName, setRecruiterName] = useState("");

  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewers, setInterviewers] = useState([]);
  const [selectedInterviewer, setSelectedInterviewer] = useState({});
  //create job form
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  //search filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [jobForm, setJobForm] = useState({
    title: "",
    skills: "",
    description: "",
    experience: "",
    employmentType: "",
    location: "",
    education: "",
    deadline: "",
    status: "DRAFT",
    salary: "",
  });

  useEffect(() => {
    setRecruiterName(localStorage.getItem("name"));
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    const res = await api.get("/jobs/my");
    setJobs(res.data);
  };

  useEffect(() => {
    api.get("/users/interviewers").then((res) => {
      setInterviewers(res.data);
    });
  }, []);

  const createJob = async () => {
    if (!jobTitle.trim()) return;
    const res = await api.post("/jobs", { title: jobTitle });
    setJobs([res.data, ...jobs]);
    setJobTitle("");
  };

  const viewApplicants = async (jobId) => {
    const res = await api.get(`/jobs/${jobId}/applicants`);
    setApplicants(res.data);
    setSelectedJobId(jobId);
  };

  const interviewsScheduled = jobs.reduce(
    (total, job) =>
      total +
      job.applicants.filter((a) => a.status === "INTERVIEW_SCHEDULED").length,
    0,
  );

  const selectedCandidates = jobs.reduce(
    (total, job) =>
      total + job.applicants.filter((a) => a.status === "SELECTED").length,
    0,
  );

  const rejectedCandidates = jobs.reduce(
    (total, job) =>
      total + job.applicants.filter((a) => a.status === "REJECTED").length,
    0,
  );

  const filteredJobs = jobs.filter((job) => {
    const matchesTitle = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || job.status === statusFilter;

    return matchesTitle && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* Header */}
      <div className="mb-10 bg-white rounded-2xl border border-blue-100 shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Recruiter Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back,{" "}
          <span className="font-semibold text-blue-600">{recruiterName}</span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <StatCard title="Total Jobs" value={jobs.length} />
        <StatCard
          title="Applicants"
          value={jobs.reduce((total, job) => total + job.applicants.length, 0)}
        />
        <StatCard title="Interviews Scheduled" value={interviewsScheduled} />
        <StatCard title="Selected" value={selectedCandidates} />
        <StatCard title="Rejected" value={rejectedCandidates} />
      </div>

      {/* Create Job */}
      {/* <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Create New Job
        </h2>
        <p className="text-gray-500 mb-4">
          Post a new opening for candidates
        </p>

        <div className="flex gap-3">
          <input
            className="flex-1 border border-blue-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <button
            onClick={createJob}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl font-medium"
          >
            Create
          </button>
        </div>
      </div> */}

      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-10">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Create New Job
            </h2>
            <p className="text-gray-500">
              Post a detailed job opening for candidates
            </p>
          </div>

          <button
            onClick={() => setShowCreateJobModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium"
          >
            + Create Job
          </button>
        </div>
      </div>

      {showCreateJobModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Create Job Opening
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Job Title"
                value={jobForm.title}
                onChange={(e) =>
                  setJobForm({ ...jobForm, title: e.target.value })
                }
              />

              <Input
                label="Skills Required"
                placeholder="React, Node, MongoDB"
                value={jobForm.skills}
                onChange={(e) =>
                  setJobForm({ ...jobForm, skills: e.target.value })
                }
              />

              <Input
                label="Experience Required"
                placeholder="2-4 Years"
                value={jobForm.experience}
                onChange={(e) =>
                  setJobForm({ ...jobForm, experience: e.target.value })
                }
              />

              <Select
                label="Employment Type"
                value={jobForm.employmentType}
                onChange={(e) =>
                  setJobForm({ ...jobForm, employmentType: e.target.value })
                }
                options={["Full Time", "Part Time", "Contract", "Internship"]}
              />

              <Select
                label="Work Mode / Location"
                value={jobForm.location}
                onChange={(e) =>
                  setJobForm({ ...jobForm, location: e.target.value })
                }
                options={["Remote", "Hybrid", "Onsite"]}
              />
              {/* 
              <Select
                label="Job Level"
                value={jobForm.jobLevel}
                onChange={(e) =>
                  setJobForm({ ...jobForm, jobLevel: e.target.value })
                }
                options={["Junior", "Mid", "Senior", "Lead"]}
              /> */}

              <Input
                label="Education Qualification"
                value={jobForm.education}
                onChange={(e) =>
                  setJobForm({ ...jobForm, education: e.target.value })
                }
              />

              <Input
                type="date"
                label="Application Deadline"
                value={jobForm.deadline}
                onChange={(e) =>
                  setJobForm({ ...jobForm, deadline: e.target.value })
                }
              />

              {/* <Select
                label="Job Status"
                value={jobForm.status}
                onChange={(e) =>
                  setJobForm({ ...jobForm, status: e.target.value })
                }
                options={["DRAFT", "ACTIVE", "CLOSED"]}
              /> */}

              <Select
                label="Job Status"
                value={jobForm.status}
                onChange={(e) =>
                  setJobForm({ ...jobForm, status: e.target.value })
                }
                options={["DRAFT", "ACTIVE", "CLOSED"]}
              />

              <Input
                label="Salary Range"
                placeholder="₹6 – ₹10 LPA"
                value={jobForm.salary}
                onChange={(e) =>
                  setJobForm({ ...jobForm, salary: e.target.value })
                }
              />
              <Input
                label="Number of Openings"
                type="number"
                placeholder="e.g. 3"
                value={jobForm.openings}
                onChange={(e) =>
                  setJobForm({ ...jobForm, openings: e.target.value })
                }
              />
              <Input
                label="Department / Team"
                placeholder="Engineering, HR, Sales"
                value={jobForm.department}
                onChange={(e) =>
                  setJobForm({ ...jobForm, department: e.target.value })
                }
              />
              <Input
                label="Notice Period / Joining Time"
                placeholder="Immediate / 30 Days / 60 Days"
                value={jobForm.noticePeriod}
                onChange={(e) =>
                  setJobForm({ ...jobForm, noticePeriod: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600">
                Job Description
              </label>
              <textarea
                rows={4}
                className="w-full border border-blue-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                value={jobForm.description}
                onChange={(e) =>
                  setJobForm({ ...jobForm, description: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600">
                Job Responsibilities
              </label>
              <textarea
                rows={3}
                placeholder="• Build scalable APIs
                  • Collaborate with frontend team"
                className="w-full border border-blue-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                value={jobForm.responsibilities}
                onChange={(e) =>
                  setJobForm({ ...jobForm, responsibilities: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateJobModal(false)}
                className="px-5 py-2 rounded-xl border text-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await api.post("/jobs", jobForm);
                  setShowCreateJobModal(false);
                  fetchMyJobs();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium"
              >
                Save Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Jobs */}
      {/* <h2 className="text-xl font-semibold mb-4 text-gray-800">My Jobs</h2>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Created on {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => viewApplicants(job._id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                View Applicants
              </button>
            </div> */}

      {/* Applicants */}
      {/* {selectedJobId === job._id && (
              <div className="mt-6 overflow-x-auto rounded-xl border border-blue-100">
                <table className="w-full">
                  <thead className="bg-blue-50 text-gray-700 text-sm">
                    <tr>
                      <th className="p-3 text-left">Candidate</th>
                      <th>Status</th>
                      <th>Interview</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {applicants.map((a) => (
                      <tr
                        key={a.candidate._id}
                        className="border-t hover:bg-blue-50 transition"
                      >
                        <td className="p-3">
                          <div className="font-medium">{a.candidate.name}</div>
                          <div className="text-sm text-gray-500">
                            {a.candidate.email}
                          </div>
                        </td>

                        <td>
                          <select
                            value={a.status}
                            onChange={async (e) => {
                              const status = e.target.value;
                              await api.put(
                                `/jobs/${job._id}/applicants/${a.candidate._id}/status`,
                                { status },
                              );
                              setApplicants((prev) =>
                                prev.map((x) =>
                                  x.candidate._id === a.candidate._id
                                    ? { ...x, status }
                                    : x,
                                ),
                              );
                            }}
                            className="border border-blue-200 rounded-lg px-2 py-1 text-sm"
                          >
                            <option value="APPLIED">Applied</option>
                            <option value="SHORTLISTED">Shortlisted</option>
                            <option value="INTERVIEW_SCHEDULED">
                              Interview Scheduled
                            </option>
                            <option value="SELECTED">Selected</option>
                            <option value="REJECTED">Rejected</option>
                          </select>
                        </td>

                        <td className="text-sm">
                          {a.interviewer ? (
                            <>
                              <div>{a.interviewer.name}</div>
                              <div className="text-gray-500">
                                {a.interviewDate} @ {a.interviewTime}
                              </div>
                            </>
                          ) : (
                            <span className="text-gray-400">Not scheduled</span>
                          )}
                        </td>

                        <td>
                          <div className="flex gap-2 items-center">
                            <select
                              className="border border-blue-200 rounded-lg px-2 py-1 text-sm"
                              value={selectedInterviewer[a.candidate._id] || ""}
                              onChange={(e) =>
                                setSelectedInterviewer((prev) => ({
                                  ...prev,
                                  [a.candidate._id]: e.target.value,
                                }))
                              }
                            >
                              <option value="">Select Interviewer</option>
                              {interviewers.map((i) => (
                                <option key={i._id} value={i._id}>
                                  {i.name}
                                </option>
                              ))}
                            </select>

                            <input
                              type="date"
                              className="border border-blue-200 rounded-lg px-2 py-1 text-sm"
                              onChange={(e) => setInterviewDate(e.target.value)}
                            />

                            <input
                              type="time"
                              className="border border-blue-200 rounded-lg px-2 py-1 text-sm"
                              onChange={(e) => setInterviewTime(e.target.value)}
                            />

                            <button
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
                              disabled={!selectedInterviewer[a.candidate._id]}
                              onClick={async () => {
                                await api.put(
                                  `/jobs/${job._id}/applicants/${a.candidate._id}/schedule`,
                                  {
                                    interviewDate,
                                    interviewTime,
                                    interviewerId:
                                      selectedInterviewer[a.candidate._id],
                                  },
                                );
                                viewApplicants(job._id);
                              }}
                            >
                              Schedule
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} */}

      {/* ------------------- JOBS TABLE (MAIN REQUIREMENT) ------------------- */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">My Jobs</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-blue-500"
          />

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full md:w-1/4 focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="DRAFT">DRAFT</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3 text-left">Job ID</th>
                <th className="p-3 text-left">Job Title</th>
                <th className="p-3 text-center">Applicants</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Created On</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            {/* <tbody>
              {filteredJobs.map((job, index) => (

                <tr key={job._id} className="border-t hover:bg-blue-50">
                  <td className="p-3">JOB-{index + 1}</td>
                  <td className="p-3 font-medium">{job.title}</td>
                  <td className="p-3 text-center">{job.applicants.length}</td>
                  <td className="p-3 text-center">{job.status}</td>
                  <td className="p-3 text-center">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() =>
                        navigate(`/recruiter/jobs/${job._id}/applicants`)
                      }
                      className="bg-blue-600 text-white px-4 py-1 rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody> */}

            <tbody>
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    No jobs found
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job, index) => (
                  <tr key={job._id} className="border-t hover:bg-blue-50">
                    <td className="p-3">JOB-{index + 1}</td>
                    <td className="p-3 font-medium">{job.title}</td>
                    <td className="p-3 text-center">{job.applicants.length}</td>
                    <td className="p-3 text-center">{job.status}</td>
                    <td className="p-3 text-center">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() =>
                          navigate(`/recruiter/jobs/${job._id}/applicants`)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- Stat Card ---------- */
function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 hover:shadow-md transition">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold text-blue-600 mt-1">{value}</h2>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full border border-blue-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <select
        {...props}
        className="w-full border border-blue-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
