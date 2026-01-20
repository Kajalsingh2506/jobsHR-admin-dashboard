// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function RecruiterDashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [jobTitle, setJobTitle] = useState("");
//   const [recruiterName, setRecruiterName] = useState("");

//   const [selectedJobId, setSelectedJobId] = useState(null);
//   const [applicants, setApplicants] = useState([]);
//   const [interviewDate, setInterviewDate] = useState("");
//   const [interviewTime, setInterviewTime] = useState("");

//   // Load recruiter name + jobs on page load
//   useEffect(() => {
//     const name = localStorage.getItem("name");
//     setRecruiterName(name);

//     fetchMyJobs();
//   }, []);

//   // Fetch recruiter-specific jobs
//   const fetchMyJobs = async () => {
//     try {
//       const res = await api.get("/jobs/my");
//       setJobs(res.data);
//     } catch (err) {
//       console.error("Failed to load jobs");
//     }
//   };

//   // Create new job
//   const createJob = async () => {
//     if (!jobTitle.trim()) return;

//     try {
//       const res = await api.post("/jobs", { title: jobTitle });

//       // Add newly created job to top
//       setJobs([res.data, ...jobs]);
//       setJobTitle("");
//     } catch (err) {
//       alert("Failed to create job");
//     }
//   };

//   const viewApplicants = async (jobId) => {
//     try {
//       const res = await api.get(`/jobs/${jobId}/applicants`);
//       setApplicants(res.data);
//       setSelectedJobId(jobId);
//     } catch (err) {
//       alert("Failed to load applicants");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-6">
//         Recruiter Dashboard - {recruiterName}
//       </h1>

//       {/* Create Job */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="font-semibold mb-2">Create Job</h2>
//         <div className="flex gap-2">
//           <input
//             className="border p-2 w-full"
//             placeholder="Job Title"
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//           />
//           <button
//             onClick={createJob}
//             className="bg-blue-600 text-white px-4 rounded"
//           >
//             Create
//           </button>
//         </div>
//       </div>

//       {/* Jobs */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="font-semibold mb-4">My Jobs</h2>

//         {jobs.length === 0 && (
//           <p className="text-gray-500">No jobs created yet</p>
//         )}

//         {/* {jobs.map((job) => (
//           <div key={job._id} className="border-b py-3">
//             <h3 className="font-semibold">{job.title}</h3>

//             <p className="text-sm text-gray-500">
//               Created on {new Date(job.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         ))} */}

//         {jobs.map((job) => (
//           <div key={job._id} className="border-b py-3">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="font-semibold">{job.title}</h3>
//                 <p className="text-sm text-gray-500">
//                   Created on {new Date(job.createdAt).toLocaleDateString()}
//                 </p>
//               </div>

//               <button
//                 onClick={() => viewApplicants(job._id)}
//                 className="bg-green-600 text-white px-3 py-1 rounded text-sm"
//               >
//                 View Applicants
//               </button>
//             </div>

//             {/* Applicants list */}
//             {/* {selectedJobId === job._id && (
//               <div className="mt-3 pl-4">
//                 {applicants.length === 0 ? (
//                   <p className="text-sm text-gray-500">No applicants yet</p>
//                 ) : (
//                   applicants.map((a) => (
//                     <div key={a._id} className="text-sm">
//                       • {a.name} ({a.email})
//                     </div>
//                   ))
//                 )}
//               </div>
//             )} */}

//             {selectedJobId === job._id && (
//               <div className="mt-3 pl-4">
//                 {applicants.length === 0 ? (
//                   <p className="text-sm text-gray-500">No applicants yet</p>
//                 ) : (
//                   applicants.map((a) => (
//                     // <div
//                     //   key={a.candidate._id}
//                     //   className="flex justify-between items-center text-sm mt-2"
//                     // >
//                     //   <span>
//                     //     {a.candidate.name} ({a.candidate.email})
//                     //   </span>

//                     //   <select
//                     //     value={a.status}
//                     //     onChange={async (e) => {
//                     //       const newStatus = e.target.value;

//                     //       await api.put(
//                     //         `/jobs/${selectedJobId}/applicants/${a.candidate._id}/status`,
//                     //         { status: newStatus },
//                     //       );

//                     //       // update UI instantly
//                     //       setApplicants((prev) =>
//                     //         prev.map((x) =>
//                     //           x.candidate._id === a.candidate._id
//                     //             ? { ...x, status: newStatus }
//                     //             : x,
//                     //         ),
//                     //       );
//                     //     }}
//                     //     className="border p-1 rounded"
//                     //   >
//                     //     {/* Schedule Interview */}
//                     //     <div className="flex gap-2 mt-2">
//                     //       <input
//                     //         type="date"
//                     //         className="border p-1 rounded"
//                     //         value={interviewDate}
//                     //         onChange={(e) => setInterviewDate(e.target.value)}
//                     //       />

//                     //       <input
//                     //         type="time"
//                     //         className="border p-1 rounded"
//                     //         value={interviewTime}
//                     //         onChange={(e) => setInterviewTime(e.target.value)}
//                     //       />

//                     //       <button
//                     //         onClick={async () => {
//                     //           if (!interviewDate || !interviewTime) {
//                     //             alert("Select date and time");
//                     //             return;
//                     //           }

//                     //           await api.put(
//                     //             `/jobs/${selectedJobId}/applicants/${a.candidate._id}/schedule`,
//                     //             {
//                     //               interviewDate,
//                     //               interviewTime,
//                     //             },
//                     //           );

//                     //           // update UI instantly
//                     //           setApplicants((prev) =>
//                     //             prev.map((x) =>
//                     //               x.candidate._id === a.candidate._id
//                     //                 ? {
//                     //                     ...x,
//                     //                     status: "INTERVIEW_SCHEDULED",
//                     //                     interviewDate,
//                     //                     interviewTime,
//                     //                   }
//                     //                 : x,
//                     //             ),
//                     //           );
//                     //         }}
//                     //         className="bg-blue-600 text-white px-3 py-1 rounded"
//                     //       >
//                     //         Schedule
//                     //       </button>
//                     //     </div>

//                     //     {/* Show scheduled interview */}
//                     //     {a.interviewDate && (
//                     //       <p className="text-xs text-gray-600 mt-1">
//                     //         Interview on {a.interviewDate} at {a.interviewTime}
//                     //       </p>
//                     //     )}

//                     //     <option value="APPLIED">Applied</option>
//                     //     <option value="SHORTLISTED">Shortlisted</option>
//                     //     <option value="INTERVIEW_SCHEDULED">
//                     //       Interview Scheduled
//                     //     </option>
//                     //     <option value="SELECTED">Selected</option>
//                     //     <option value="REJECTED">Rejected</option>
//                     //   </select>
//                     // </div>

//                     <div key={a.candidate._id} className="mt-3 text-sm">
//                       {/* Name */}
//                       <div className="flex justify-between items-center">
//                         <span>
//                           {a.candidate.name} ({a.candidate.email})
//                         </span>

//                         {/* Status dropdown */}
//                         <select
//                           value={a.status}
//                           onChange={async (e) => {
//                             const newStatus = e.target.value;

//                             await api.put(
//                               `/jobs/${selectedJobId}/applicants/${a.candidate._id}/status`,
//                               { status: newStatus },
//                             );

//                             setApplicants((prev) =>
//                               prev.map((x) =>
//                                 x.candidate._id === a.candidate._id
//                                   ? { ...x, status: newStatus }
//                                   : x,
//                               ),
//                             );
//                           }}
//                           className="border p-1 rounded"
//                         >
//                           <option value="APPLIED">Applied</option>
//                           <option value="SHORTLISTED">Shortlisted</option>
//                           <option value="INTERVIEW_SCHEDULED">
//                             Interview Scheduled
//                           </option>
//                           <option value="SELECTED">Selected</option>
//                           <option value="REJECTED">Rejected</option>
//                         </select>
//                       </div>

//                       {/* Schedule interview UI */}
//                       <div className="flex gap-2 mt-2">
//                         <input
//                           type="date"
//                           className="border p-1 rounded"
//                           value={interviewDate}
//                           onChange={(e) => setInterviewDate(e.target.value)}
//                         />

//                         <input
//                           type="time"
//                           className="border p-1 rounded"
//                           value={interviewTime}
//                           onChange={(e) => setInterviewTime(e.target.value)}
//                         />

//                         <button
//                           onClick={async () => {
//                             if (!interviewDate || !interviewTime) {
//                               alert("Select date and time");
//                               return;
//                             }

//                             await api.put(
//                               `/jobs/${selectedJobId}/applicants/${a.candidate._id}/schedule`,
//                               {
//                                 interviewDate,
//                                 interviewTime,
//                               },
//                             );

//                             setApplicants((prev) =>
//                               prev.map((x) =>
//                                 x.candidate._id === a.candidate._id
//                                   ? {
//                                       ...x,
//                                       status: "INTERVIEW_SCHEDULED",
//                                       interviewDate,
//                                       interviewTime,
//                                     }
//                                   : x,
//                               ),
//                             );
//                           }}
//                           className="bg-blue-600 text-white px-3 py-1 rounded"
//                         >
//                           Schedule
//                         </button>
//                       </div>

//                       {/* Show scheduled interview */}
//                       {a.interviewDate && (
//                         <p className="text-xs text-gray-600 mt-1">
//                           Interview on {a.interviewDate} at {a.interviewTime}
//                         </p>
//                       )}
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

//RecruiterDashboard.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [recruiterName, setRecruiterName] = useState("");

  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewers, setInterviewers] = useState([]);
  const [selectedInterviewer, setSelectedInterviewer] = useState({});

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
        <p className="text-black mt-1">Welcome back, {recruiterName}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Jobs" value={jobs.length} />
        <StatCard
          title="Applicants"
          value={jobs.reduce((a, b) => a + (b.applicantsCount || 0), 0)}
        />
        <StatCard
          title="Interviews"
          value={jobs.reduce((a, b) => a + (b.interviewsCount || 0), 0)}
        />
      </div>

      {/* Create Job */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Create New Job</h2>
        <p className="text-gray-500 mb-4">Post a new opening for candidates</p>

        <div className="flex gap-3">
          <input
            className="flex-1 border rounded-lg px-4 py-2"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <button
            onClick={createJob}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
          >
            Create
          </button>
        </div>
      </div>

      {/* Jobs */}
      <div>
        <h2 className="text-xl font-semibold mb-4">My Jobs</h2>

        {jobs.length === 0 && (
          <p className="text-gray-500">No jobs created yet</p>
        )}

        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-500">
                    Created on {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => viewApplicants(job._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  View Applicants
                </button>
              </div>

              {/* Applicants */}
              {selectedJobId === job._id && (
                <div className="mt-6">
                  {applicants.length === 0 ? (
                    <p className="text-gray-500">No applicants yet</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border mt-4">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="p-2 text-left">Candidate</th>
                            <th>Status</th>
                            <th>Interview</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applicants.map((a) => (
                            <tr key={a.candidate._id} className="border-t">
                              <td className="p-2">
                                <div className="font-medium">
                                  {a.candidate.name}
                                </div>
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
                                  className="border rounded px-2 py-1"
                                >
                                  <option value="APPLIED">Applied</option>
                                  <option value="SHORTLISTED">
                                    Shortlisted
                                  </option>
                                  <option value="INTERVIEW_SCHEDULED">
                                    Interview Scheduled
                                  </option>
                                  <option value="SELECTED">Selected</option>
                                  <option value="REJECTED">Rejected</option>
                                </select>
                              </td>

                              {/* <td>
                                {a.interviewDate ? (
                                  <span className="text-sm">
                                    {a.interviewDate} @ {a.interviewTime}
                                  </span>
                                ) : (
                                  <span className="text-sm text-gray-400">
                                    Not scheduled
                                  </span>
                                )}
                              </td> */}
                              <td>
                                {a.interviewer ? (
                                  <div className="text-sm">
                                    <div>{a.interviewer.name}</div>
                                    <div className="text-gray-500">
                                      {a.interviewDate} @ {a.interviewTime}
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-gray-400 text-sm">
                                    Not scheduled
                                  </span>
                                )}
                              </td>

                              {/* <td>
                                <div className="flex gap-2">
                                  <input
                                    type="date"
                                    className="border rounded px-2 py-1"
                                    onChange={(e) =>
                                      setInterviewDate(e.target.value)
                                    }
                                  />
                                  <input
                                    type="time"
                                    className="border rounded px-2 py-1"
                                    onChange={(e) =>
                                      setInterviewTime(e.target.value)
                                    }
                                  />
                                  <button
                                    className="bg-blue-600 text-white px-3 rounded"
                                    onClick={async () => {
                                      await api.put(
                                        `/jobs/${job._id}/applicants/${a.candidate._id}/schedule`,
                                        { interviewDate, interviewTime },
                                      );
                                      setApplicants((prev) =>
                                        prev.map((x) =>
                                          x.candidate._id === a.candidate._id
                                            ? {
                                                ...x,
                                                status: "INTERVIEW_SCHEDULED",
                                                interviewDate,
                                                interviewTime,
                                              }
                                            : x,
                                        ),
                                      );
                                    }}
                                  >
                                    Schedule
                                  </button>
                                </div>
                              </td> */}
                              <td>
                                <div className="flex flex-wrap gap-2 items-center">
                                  {/* Interviewer Select */}
                                  <select
                                    className="border rounded px-2 py-1"
                                    value={
                                      selectedInterviewer[a.candidate._id] || ""
                                    }
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

                                  {/* Date */}
                                  <input
                                    type="date"
                                    className="border rounded px-2 py-1"
                                    onChange={(e) =>
                                      setInterviewDate(e.target.value)
                                    }
                                  />

                                  {/* Time */}
                                  <input
                                    type="time"
                                    className="border rounded px-2 py-1"
                                    onChange={(e) =>
                                      setInterviewTime(e.target.value)
                                    }
                                  />

                                  {/* Schedule Button */}
                                  <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                    disabled={
                                      !selectedInterviewer[a.candidate._id]
                                    }
                                    onClick={async () => {
                                      await api.put(
                                        `/jobs/${job._id}/applicants/${a.candidate._id}/schedule`,
                                        {
                                          interviewDate,
                                          interviewTime,
                                          interviewerId:
                                            selectedInterviewer[
                                              a.candidate._id
                                            ],
                                        },
                                      );

                                      // reload applicants so interviewer name shows
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
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Small reusable stat card ---------- */
function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-1">{value}</h2>
    </div>
  );
}
