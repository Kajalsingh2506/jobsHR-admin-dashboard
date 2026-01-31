

// CandidateDashboard.jsx
// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function CandidateDashboard() {
//   const [jobs, setJobs] = useState([]);
//   // const [appliedJobs, setAppliedJobs] = useState([]);

//   // Fetch jobs
//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const res = await api.get("/jobs");
//       setJobs(res.data);
//     } catch (err) {
//       alert("Failed to load jobs");
//     }
//   };

// const applyJob = async (jobId) => {
//   try {
//     await api.post(`/jobs/apply/${jobId}`);
//     alert("Applied successfully");
//     fetchJobs(); // 🔥 important
//   } catch (err) {
//     alert(err.response?.data?.message || "Error");
//   }
// };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {jobs.map((job) => (
//           <div
//             key={job._id}
//             className="bg-white p-5 rounded shadow hover:shadow-md transition"
//           >
//             <h2 className="text-lg font-semibold">{job.title}</h2>

//             <p className="text-sm text-gray-500">
//               Created on {new Date(job.createdAt).toLocaleDateString()}
//             </p>

//             {/* <button
//               onClick={() => applyJob(job._id)}
//               disabled={appliedJobs.includes(job._id)}
//               className={`mt-4 px-4 py-2 rounded text-white ${
//                 appliedJobs.includes(job._id)
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-600"
//               }`}
//             >
//               {appliedJobs.includes(job._id) ? "Applied" : "Apply"}
//             </button> */}
//             <button
//               onClick={() => applyJob(job._id)}
//               disabled={job.isApplied}
//               className={`mt-4 px-4 py-2 rounded text-white ${
//                 job.isApplied ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
//               }`}
//             >
//               {job.isApplied ? "Applied" : "Apply"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// CandidateDashboard.jsx
// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function CandidateDashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [activeTab, setActiveTab] = useState("all"); // all | applied
//   const [search, setSearch] = useState("");
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [resume, setResume] = useState(null);

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const res = await api.get("/jobs");
//       setJobs(res.data);
//     } catch {
//       alert("Failed to load jobs");
//     }
//   };

//   const applyJob = async (jobId) => {
//     try {
//       await api.post(`/jobs/apply/${jobId}`);
//       alert("Applied successfully");
//       fetchJobs();
//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     }
//   };

//   const uploadResume = async () => {
//     if (!resume) return alert("Select resume first");
//     const formData = new FormData();
//     formData.append("resume", resume);

//     try {
//       await api.post("/candidates/upload-resume", formData);
//       alert("Resume uploaded");
//     } catch {
//       alert("Resume upload failed");
//     }
//   };

//   const filteredJobs = jobs.filter((job) => {
//     if (activeTab === "applied" && !job.isApplied) return false;
//     if (search && !job.title.toLowerCase().includes(search.toLowerCase()))
//       return false;
//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Candidate Dashboard</h1>

//         {/* Resume Upload */}
//         <div className="flex gap-2">
//           <input
//             type="file"
//             onChange={(e) => setResume(e.target.files[0])}
//             className="text-sm"
//           />
//           <button
//             onClick={uploadResume}
//             className="bg-green-600 text-white px-3 py-1 rounded"
//           >
//             Upload Resume
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-4 mb-4">
//         <button
//           onClick={() => setActiveTab("all")}
//           className={`px-4 py-2 rounded ${
//             activeTab === "all"
//               ? "bg-blue-600 text-white"
//               : "bg-white"
//           }`}
//         >
//           All Jobs
//         </button>
//         <button
//           onClick={() => setActiveTab("applied")}
//           className={`px-4 py-2 rounded ${
//             activeTab === "applied"
//               ? "bg-blue-600 text-white"
//               : "bg-white"
//           }`}
//         >
//           Applied Jobs
//         </button>
//       </div>

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search job title..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full p-2 mb-6 border rounded"
//       />

//       {/* Job Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {filteredJobs.map((job) => (
//           <div
//             key={job._id}
//             className="bg-white p-5 rounded shadow hover:shadow-md transition"
//           >
//             <h2 className="text-lg font-semibold">{job.title}</h2>

//             <p className="text-sm text-gray-500 mb-2">
//               Posted on {new Date(job.createdAt).toLocaleDateString()}
//             </p>

//             {/* Status */}
//             {job.isApplied && (
//               <span className="inline-block mb-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
//                 Status: {job.status || "Applied"}
//               </span>
//             )}

//             <div className="flex gap-3 mt-3">
//               <button
//                 onClick={() => setSelectedJob(job)}
//                 className="px-3 py-1 bg-gray-200 rounded"
//               >
//                 View Details
//               </button>

//               <button
//                 onClick={() => applyJob(job._id)}
//                 disabled={job.isApplied}
//                 className={`px-3 py-1 rounded text-white ${
//                   job.isApplied
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-blue-600"
//                 }`}
//               >
//                 {job.isApplied ? "Applied" : "Apply"}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Job Details Modal */}
//       {selectedJob && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="bg-white w-full max-w-lg p-6 rounded">
//             <h2 className="text-xl font-bold mb-2">
//               {selectedJob.title}
//             </h2>

//             <p className="text-sm text-gray-500 mb-4">
//               Posted on{" "}
//               {new Date(selectedJob.createdAt).toLocaleDateString()}
//             </p>

//             <p className="mb-4">
//               {selectedJob.description || "No description provided"}
//             </p>

//             <button
//               onClick={() => setSelectedJob(null)}
//               className="bg-red-500 text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

//CandidateDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function CandidateDashboard() {
  const [jobs, setJobs] = useState([]);
  // const [showApplyForm, setShowApplyForm] = useState(false);
  // const [selectedJobId, setSelectedJobId] = useState(null);
  // const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  // const [formData, setFormData] = useState({
  //   fullName: "",
  //   email: "",
  //   phone: "",
  //   experience: "",
  //   skills: "",
  //   coverLetter: "",
  //   location: "",
  //   noticePeriod: "",
  //   salary: "",
  //   portfolio: "",
  //   linkedin: "",
  //   availability: "",
  // });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await api.get("/jobs");
    setJobs(res.data);
  };
  const applyForJob = async (jobId) => {
    try {
      await api.post(`/jobs/apply/${jobId}`);
      alert("Applied successfully");
      fetchJobs();
    } catch (err) {
      if (err.response?.status === 400) {
        alert("Please complete your profile before applying");
        navigate("/candidate/profile");
      } else {
        alert("Application failed");
      }
    }
  };

  // const openApplyForm = (jobId) => {
  //   setSelectedJobId(jobId);
  //   setShowApplyForm(true);
  // };

  // const submitApplication = async () => {
  //   if (!resume) return alert("Resume is required");

  //   const data = new FormData();
  //   Object.keys(formData).forEach((key) =>
  //     data.append(key, formData[key])
  //   );
  //   data.append("resume", resume);

  //   try {
  //     await api.post(`/jobs/apply/${selectedJobId}`, data);
  //     alert("Applied successfully");
  //     setShowApplyForm(false);
  //     fetchJobs();
  //   } catch (err) {
  //     alert("Application failed");
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* 🔥 HEADER WITH PROFILE BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Available Jobs</h1>

        <button
          onClick={() => navigate("/candidate/profile")}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          My Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white p-5 rounded shadow">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-sm text-gray-500">
              Posted on {new Date(job.createdAt).toLocaleDateString()}
            </p>

            <button
              onClick={() => applyForJob(job._id)}
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

      {/* APPLY FORM MODAL */}
      {/* {showApplyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-full max-w-2xl p-6 rounded overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">Apply for Job</h2>

            {[
              ["Full Name", "fullName"],
              ["Email", "email"],
              ["Phone", "phone"],
              ["Experience (years)", "experience"],
              ["Skills", "skills"],
              ["Current Location", "location"],
              ["Notice Period", "noticePeriod"],
              ["Expected Salary", "salary"],
              ["Portfolio / GitHub Link", "portfolio"],
              ["LinkedIn Profile", "linkedin"],
            ].map(([label, key]) => (
              <input
                key={key}
                placeholder={label}
                value={formData[key]}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                className="w-full p-2 mb-3 border rounded"
              />
            ))} */}

            {/* Availability */}
            {/* <select
              value={formData.availability}
              onChange={(e) =>
                setFormData({ ...formData, availability: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            >
              <option value="">Select Availability</option>
              <option>Full-time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select> */}

            {/* Resume */}
            {/* <input
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full mb-3"
            />

            {/* Cover Letter */}
//             <textarea
//               placeholder="Cover Letter"
//               value={formData.coverLetter}
//               onChange={(e) =>
//                 setFormData({ ...formData, coverLetter: e.target.value })
//               }
//               className="w-full p-2 mb-4 border rounded"
//             />

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowApplyForm(false)}
//                 className="bg-gray-400 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={submitApplication}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Submit Application
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// } */}
