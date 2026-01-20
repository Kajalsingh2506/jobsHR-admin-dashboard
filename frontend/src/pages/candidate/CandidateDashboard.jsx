// export default function CandidateDashboard() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {jobs.map((job) => (
//           <div
//             key={job.id}
//             className="bg-white p-5 rounded shadow hover:shadow-md transition"
//           >
//             <h2 className="text-lg font-semibold">{job.title}</h2>
//             <p className="text-gray-600">{job.company}</p>
//             <p className="text-sm text-gray-500">{job.location}</p>
//             <p className="text-sm text-gray-500">
//               Experience: {job.experience}
//             </p>

//             <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
//               Apply
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

//CandidateDashboard.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CandidateDashboard() {
  const [jobs, setJobs] = useState([]);
  // const [appliedJobs, setAppliedJobs] = useState([]);

  // Fetch jobs
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      alert("Failed to load jobs");
    }
  };

const applyJob = async (jobId) => {
  try {
    await api.post(`/jobs/apply/${jobId}`);
    alert("Applied successfully");
    fetchJobs(); // 🔥 important
  } catch (err) {
    alert(err.response?.data?.message || "Error");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-5 rounded shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{job.title}</h2>

            <p className="text-sm text-gray-500">
              Created on {new Date(job.createdAt).toLocaleDateString()}
            </p>

            {/* <button
              onClick={() => applyJob(job._id)}
              disabled={appliedJobs.includes(job._id)}
              className={`mt-4 px-4 py-2 rounded text-white ${
                appliedJobs.includes(job._id)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600"
              }`}
            >
              {appliedJobs.includes(job._id) ? "Applied" : "Apply"}
            </button> */}
            <button
              onClick={() => applyJob(job._id)}
              disabled={job.isApplied}
              className={`mt-4 px-4 py-2 rounded text-white ${
                job.isApplied ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
              }`}
            >
              {job.isApplied ? "Applied" : "Apply"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
