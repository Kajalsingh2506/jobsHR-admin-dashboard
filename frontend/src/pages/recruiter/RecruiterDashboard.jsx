import { useState } from "react";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      applicants: ["Kajal", "Amit"],
    },
  ]);

  const [jobTitle, setJobTitle] = useState("");

  const createJob = () => {
    if (!jobTitle) return;

    setJobs([
      ...jobs,
      { id: Date.now(), title: jobTitle, applicants: [] },
    ]);
    setJobTitle("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Recruiter Dashboard
      </h1>

      {/* Create Job */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Create Job</h2>
        <div className="flex gap-2">
          <input
            className="border p-2 w-full"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <button
            onClick={createJob}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Create
          </button>
        </div>
      </div>

      {/* Jobs & Applications */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-4">My Jobs</h2>

        {jobs.map((job) => (
          <div key={job.id} className="border-b py-3">
            <h3 className="font-semibold">{job.title}</h3>

            <p className="text-sm text-gray-500">
              Applicants: {job.applicants.length}
            </p>

            {job.applicants.map((name, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center mt-2"
              >
                <span>{name}</span>
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                  Schedule Interview
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
