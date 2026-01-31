// //JobApplicants.jsx
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../../services/api";

// export default function JobApplicants() {
//   const { jobId } = useParams();

//   const [applicants, setApplicants] = useState([]);
//   const [interviewers, setInterviewers] = useState([]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);

//   const [viewApplicant, setViewApplicant] = useState(null);
//   const [decision, setDecision] = useState(null); // "SHORTLISTED" | "NOT_SHORTLISTED"

//   const [modalSchedule, setModalSchedule] = useState({
//     interviewerId: "",
//     date: "",
//     hour: "",
//     minute: "",
//     period: "",
//   });

//   useEffect(() => {
//     fetchApplicants();
//     fetchInterviewers();
//   }, []);

//   const fetchApplicants = async () => {
//     const res = await api.get(`/jobs/${jobId}/applicants`);
//     setApplicants(res.data);
//   };

//   const fetchInterviewers = async () => {
//     const res = await api.get("/users/interviewers");
//     setInterviewers(res.data);
//   };

//   const confirmSchedule = async () => {
//     const { interviewerId, date, hour, minute, period } = modalSchedule;

//     if (!interviewerId || !date || !hour || !minute || !period) {
//       return alert("Please fill all fields");
//     }

//     const interviewTime = `${hour}:${minute} ${period}`;

//     await api.put(`/jobs/${jobId}/applicants/${selectedCandidate}/schedule`, {
//       interviewerId,
//       interviewDate: date,
//       interviewTime,
//     });

//     setIsModalOpen(false);
//     setModalSchedule({
//       interviewerId: "",
//       date: "",
//       hour: "",
//       minute: "",
//       period: "",
//     });

//     fetchApplicants();
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 p-8">
//       <h1 className="text-2xl font-semibold mb-6 text-gray-800">
//         Applicants for Job
//       </h1>

//       <div className="bg-white rounded-xl shadow border overflow-hidden">
//         <table className="w-full border-collapse">
//           <thead className="bg-blue-100">
//             <tr className="text-sm text-gray-700">
//               <th className="px-6 py-4 text-center w-24">ID</th>
//               <th className="px-6 py-4 text-left w-64">Name</th>
//               <th className="px-6 py-4 text-left">Email</th>
//               <th className="px-6 py-4 text-center w-40">Applied On</th>
//               <th className="px-6 py-4 text-center w-56">Status</th>
//               <th className="px-6 py-4 text-center w-40">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {applicants.map((a, i) => (
//               <tr
//                 key={a.candidate._id}
//                 className="border-t text-sm hover:bg-blue-50 transition"
//               >
//                 {/* ID */}
//                 <td className="px-6 py-4 text-center font-medium text-gray-700">
//                   A-{i + 1}
//                 </td>

//                 {/* Name */}
//                 <td className="px-6 py-4 text-gray-800">{a.candidate.name}</td>

//                 {/* Email */}
//                 <td className="px-6 py-4 text-gray-600">{a.candidate.email}</td>

//                 {/* Applied On */}
//                 <td className="px-6 py-4 text-center text-gray-600">
//                   {new Date(a.appliedAt).toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </td>

//                 {/* Status */}
//                 <td className="px-6 py-4 text-center">
//                   <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
//                     {a.status.replaceAll("_", " ")}
//                   </span>
//                 </td>

//                 {/* Action */}
//                 <td className="px-6 py-4 text-center">
//                   {/* <button
//                     onClick={() => {
//                       setSelectedCandidate(a.candidate._id);
//                       setIsModalOpen(true);
//                     }}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
//                   >
//                     Schedule
//                   </button> */}

//                   <button
//                     onClick={() => {
//                       setSelectedCandidate(a.candidate._id);
//                       setViewApplicant(a.candidate);
//                       setDecision(null);
//                       setIsModalOpen(true);
//                     }}
//                     className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium transition"
//                   >
//                     View Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ================= MODAL ================= */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-[420px] shadow-lg">
//             {/* <h2 className="text-xl font-semibold mb-5 text-gray-800">
//               Schedule Interview
//             </h2> */}

//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               Applicant Details
//             </h2>
//             {/* Applicant Profile */}
//             <div className="flex items-center gap-4 mb-4">
//               <img
//                 src={
//                   viewApplicant?.profilePhoto ||
//                   "https://via.placeholder.com/80"
//                 }
//                 className="w-20 h-20 rounded-full border"
//               />

//               <div>
//                 <p className="font-semibold text-lg">{viewApplicant?.name}</p>
//                 <p className="text-sm text-gray-600">{viewApplicant?.email}</p>
//                 <p className="text-sm text-gray-500">
//                   DOB: {viewApplicant?.dob || "—"}
//                 </p>
//               </div>
//             </div>
//             {/* Skills */}
//             <div className="mb-4">
//               <p className="font-medium mb-1">Skills</p>
//               <div className="flex flex-wrap gap-2">
//                 {(viewApplicant?.skills || []).map((s) => (
//                   <span
//                     key={s}
//                     className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
//                   >
//                     {s}
//                   </span>
//                 ))}
//               </div>
//             </div>
//             {/* Decision */}
//             {/* <div className="flex gap-3 mb-4"> */}
//              <div className="mb-4">
//               <div className="flex gap-3">
//               <button
//                 onClick={() => setDecision("SHORTLISTED")}
//                 className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium"
//               >
//                 Shortlisted
//               </button>

//               <button
//                 onClick={() => setDecision("NOT_SHORTLISTED")}
//                 className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium"
//               >
//                 Not Shortlisted
//               </button>
//             </div>
//               {decision === "NOT_SHORTLISTED" && (
//                 <p className="text-center text-red-600 font-medium mt-3">
//                   Candidate marked as Not Shortlisted
//                 </p>
//               )}
//             </div>

//             </div>

//             {/* Interviewer */}
//             <select
//               className="border w-full px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={modalSchedule.interviewerId}
//               onChange={(e) =>
//                 setModalSchedule((p) => ({
//                   ...p,
//                   interviewerId: e.target.value,
//                 }))
//               }
//             >
//               <option value="">Select Interviewer</option>
//               {interviewers.map((i) => (
//                 <option key={i._id} value={i._id}>
//                   {i.name}
//                 </option>
//               ))}
//             </select>

//             {/* Date */}
//             <input
//               type="date"
//               className="border w-full px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={modalSchedule.date}
//               onChange={(e) =>
//                 setModalSchedule((p) => ({
//                   ...p,
//                   date: e.target.value,
//                 }))
//               }
//             />

//             {/* Time */}
//             <div className="flex gap-3 mb-5">
//               <select
//                 className="border px-2 py-2 rounded w-1/3"
//                 value={modalSchedule.hour}
//                 onChange={(e) =>
//                   setModalSchedule((p) => ({
//                     ...p,
//                     hour: e.target.value,
//                   }))
//                 }
//               >
//                 <option value="">HH</option>
//                 {[...Array(12)].map((_, i) => {
//                   const h = String(i + 1).padStart(2, "0");
//                   return (
//                     <option key={h} value={h}>
//                       {h}
//                     </option>
//                   );
//                 })}
//               </select>

//               <select
//                 className="border px-2 py-2 rounded w-1/3"
//                 value={modalSchedule.minute}
//                 onChange={(e) =>
//                   setModalSchedule((p) => ({
//                     ...p,
//                     minute: e.target.value,
//                   }))
//                 }
//               >
//                 <option value="">MM</option>
//                 {["00", "15", "30", "45"].map((m) => (
//                   <option key={m} value={m}>
//                     {m}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 className="border px-2 py-2 rounded w-1/3"
//                 value={modalSchedule.period}
//                 onChange={(e) =>
//                   setModalSchedule((p) => ({
//                     ...p,
//                     period: e.target.value,
//                   }))
//                 }
//               >
//                 <option value="">AM/PM</option>
//                 <option value="AM">AM</option>
//                 <option value="PM">PM</option>
//               </select>
//             </div>

//             {/* Actions */}
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={confirmSchedule}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// //JobApplicants.jsx
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../../services/api";

// export default function JobApplicants() {
//   const { jobId } = useParams();

//   const [applicants, setApplicants] = useState([]);
//   const [interviewers, setInterviewers] = useState([]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [viewApplicant, setViewApplicant] = useState(null);
//   const [decision, setDecision] = useState(null); // SHORTLISTED | NOT_SHORTLISTED

//   const [modalSchedule, setModalSchedule] = useState({
//     interviewerId: "",
//     date: "",
//     hour: "",
//     minute: "",
//     period: "",
//   });

//   useEffect(() => {
//     fetchApplicants();
//     fetchInterviewers();
//   }, []);

//   const fetchApplicants = async () => {
//     const res = await api.get(`/jobs/${jobId}/applicants`);
//     setApplicants(res.data);
//   };

//   const fetchInterviewers = async () => {
//     const res = await api.get("/users/interviewers");
//     setInterviewers(res.data);
//   };

//   const confirmSchedule = async () => {
//     const { interviewerId, date, hour, minute, period } = modalSchedule;

//     if (!interviewerId || !date || !hour || !minute || !period) {
//       return alert("Please fill all fields");
//     }

//     const interviewTime = `${hour}:${minute} ${period}`;

//     await api.put(`/jobs/${jobId}/applicants/${selectedCandidate}/schedule`, {
//       interviewerId,
//       interviewDate: date,
//       interviewTime,
//     });

//     setIsModalOpen(false);
//     setDecision(null);
//     setModalSchedule({
//       interviewerId: "",
//       date: "",
//       hour: "",
//       minute: "",
//       period: "",
//     });

//     fetchApplicants();
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 p-8">
//       <h1 className="text-2xl font-semibold mb-6 text-gray-800">
//         Applicants for Job
//       </h1>

//       <div className="bg-white rounded-xl shadow border overflow-hidden">
//         <table className="w-full border-collapse">
//           <thead className="bg-blue-100">
//             <tr className="text-sm text-gray-700">
//               <th className="px-6 py-4 text-center w-24">ID</th>
//               <th className="px-6 py-4 text-left w-64">Name</th>
//               <th className="px-6 py-4 text-left">Email</th>
//               <th className="px-6 py-4 text-center w-40">Applied On</th>
//               <th className="px-6 py-4 text-center w-56">Status</th>
//               <th className="px-6 py-4 text-center w-40">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {applicants.map((a, i) => (
//               <tr
//                 key={a.candidate._id}
//                 className="border-t text-sm hover:bg-blue-50 transition"
//               >
//                 <td className="px-6 py-4 text-center font-medium text-gray-700">
//                   A-{i + 1}
//                 </td>

//                 <td className="px-6 py-4 text-gray-800">
//                   {a.candidate.name}
//                 </td>

//                 <td className="px-6 py-4 text-gray-600">
//                   {a.candidate.email}
//                 </td>

//                 <td className="px-6 py-4 text-center text-gray-600">
//                   {a.appliedAt
//                     ? new Date(a.appliedAt).toLocaleDateString("en-IN")
//                     : "—"}
//                 </td>

//                 <td className="px-6 py-4 text-center">
//                   <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
//                     {a.status.replaceAll("_", " ")}
//                   </span>
//                 </td>

//                 <td className="px-6 py-4 text-center">
//                   <button
//                     onClick={() => {
//                       setSelectedCandidate(a.candidate._id);
//                       setViewApplicant(a.candidate);
//                       setDecision(null);
//                       setIsModalOpen(true);
//                     }}
//                     className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium"
//                   >
//                     View Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ================= MODAL ================= */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-[420px] shadow-lg">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               Applicant Details
//             </h2>

//             {/* Applicant Info */}
//             <div className="flex items-center gap-4 mb-4">
//               <img
//                 src={viewApplicant?.profilePhoto || "https://via.placeholder.com/80"}
//                 className="w-20 h-20 rounded-full border"
//               />
//               <div>
//                 <p className="font-semibold text-lg">
//                   {viewApplicant?.name}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   {viewApplicant?.email}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   DOB: {viewApplicant?.dob || "—"}
//                 </p>
//               </div>
//             </div>

//             {/* Skills */}
//             <div className="mb-4">
//               <p className="font-medium mb-1">Skills</p>
//               <div className="flex flex-wrap gap-2">
//                 {(viewApplicant?.skills || []).map((s) => (
//                   <span
//                     key={s}
//                     className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
//                   >
//                     {s}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Decision */}
//             <div className="mb-4">
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setDecision("SHORTLISTED")}
//                   className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium"
//                 >
//                   Shortlisted
//                 </button>

//                 <button
//                   onClick={() => setDecision("NOT_SHORTLISTED")}
//                   className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium"
//                 >
//                   Not Shortlisted
//                 </button>
//               </div>

//               {decision === "NOT_SHORTLISTED" && (
//                 <p className="text-center text-red-600 font-medium mt-3">
//                   Candidate marked as Not Shortlisted
//                 </p>
//               )}
//             </div>

//             {/* Scheduling (only if shortlisted) */}
//             {decision === "SHORTLISTED" && (
//               <>
//                 <select
//                   className="border w-full px-3 py-2 rounded mb-3"
//                   value={modalSchedule.interviewerId}
//                   onChange={(e) =>
//                     setModalSchedule((p) => ({
//                       ...p,
//                       interviewerId: e.target.value,
//                     }))
//                   }
//                 >
//                   <option value="">Select Interviewer</option>
//                   {interviewers.map((i) => (
//                     <option key={i._id} value={i._id}>
//                       {i.name}
//                     </option>
//                   ))}
//                 </select>

//                 <input
//                   type="date"
//                   className="border w-full px-3 py-2 rounded mb-3"
//                   value={modalSchedule.date}
//                   onChange={(e) =>
//                     setModalSchedule((p) => ({
//                       ...p,
//                       date: e.target.value,
//                     }))
//                   }
//                 />

//                 <div className="flex gap-3 mb-4">
//                   <select
//                     className="border px-2 py-2 rounded w-1/3"
//                     value={modalSchedule.hour}
//                     onChange={(e) =>
//                       setModalSchedule((p) => ({
//                         ...p,
//                         hour: e.target.value,
//                       }))
//                     }
//                   >
//                     <option value="">HH</option>
//                     {[...Array(12)].map((_, i) => {
//                       const h = String(i + 1).padStart(2, "0");
//                       return (
//                         <option key={h} value={h}>
//                           {h}
//                         </option>
//                       );
//                     })}
//                   </select>

//                   <select
//                     className="border px-2 py-2 rounded w-1/3"
//                     value={modalSchedule.minute}
//                     onChange={(e) =>
//                       setModalSchedule((p) => ({
//                         ...p,
//                         minute: e.target.value,
//                       }))
//                     }
//                   >
//                     <option value="">MM</option>
//                     {["00", "15", "30", "45"].map((m) => (
//                       <option key={m} value={m}>
//                         {m}
//                       </option>
//                     ))}
//                   </select>

//                   <select
//                     className="border px-2 py-2 rounded w-1/3"
//                     value={modalSchedule.period}
//                     onChange={(e) =>
//                       setModalSchedule((p) => ({
//                         ...p,
//                         period: e.target.value,
//                       }))
//                     }
//                   >
//                     <option value="">AM/PM</option>
//                     <option value="AM">AM</option>
//                     <option value="PM">PM</option>
//                   </select>
//                 </div>

//                 <div className="flex justify-end gap-3">
//                   <button
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-4 py-2 border rounded-md text-gray-600"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     onClick={confirmSchedule}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium"
//                   >
//                     Schedule
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// JobApplicants.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function JobApplicants() {
  const { jobId } = useParams();

  const [applicants, setApplicants] = useState([]);
  const [interviewers, setInterviewers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [viewApplicant, setViewApplicant] = useState(null); // FULL application
  const [decision, setDecision] = useState(null); // SHORTLISTED | NOT_SHORTLISTED
  // const [searchTerm, setSearchTerm] = useState("");
  // const [statusFilter, setStatusFilter] = useState("ALL");
  // const [sortOrder, setSortOrder] = useState("NEWEST");

  const [modalSchedule, setModalSchedule] = useState({
    interviewerId: "",
    date: "",
    hour: "",
    minute: "",
    period: "",
  });

  useEffect(() => {
    fetchApplicants();
    fetchInterviewers();
  }, []);

  const fetchApplicants = async () => {
    const res = await api.get(`/jobs/${jobId}/applicants`);
    setApplicants(res.data);
  };

  const fetchInterviewers = async () => {
    const res = await api.get("/users/interviewers");
    setInterviewers(res.data);
  };

  const confirmSchedule = async () => {
    const { interviewerId, date, hour, minute, period } = modalSchedule;

    if (!interviewerId || !date || !hour || !minute || !period) {
      return alert("Please fill all fields");
    }

    const interviewTime = `${hour}:${minute} ${period}`;

    await api.put(`/jobs/${jobId}/applicants/${selectedCandidate}/schedule`, {
      interviewerId,
      interviewDate: date,
      interviewTime,
    });

    setIsModalOpen(false);
    setDecision(null);
    setModalSchedule({
      interviewerId: "",
      date: "",
      hour: "",
      minute: "",
      period: "",
    });

    fetchApplicants();
  };

  
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Applicants for Job
      </h1>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-blue-100">
            <tr className="text-sm text-gray-700">
              <th className="px-6 py-4 text-center w-24">ID</th>
              <th className="px-6 py-4 text-left w-64">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-center w-40">Applied On</th>
              <th className="px-6 py-4 text-center w-56">Status</th>
              <th className="px-6 py-4 text-center w-40">Action</th>
            </tr>
          </thead>

          <tbody>
            {applicants.map((a, i) => (
              <tr
                key={a.candidate._id}
                className="border-t text-sm hover:bg-blue-50 transition"
              >
                <td className="px-6 py-4 text-center font-medium text-gray-700">
                  A-{i + 1}
                </td>

                <td className="px-6 py-4 text-gray-800">{a.candidate.name}</td>

                <td className="px-6 py-4 text-gray-600">{a.candidate.email}</td>

                <td className="px-6 py-4 text-center text-gray-600">
                  {a.appliedAt
                    ? new Date(a.appliedAt).toLocaleDateString("en-IN")
                    : "—"}
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                    {a.status.replaceAll("_", " ")}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => {
                      setSelectedCandidate(a.candidate._id);
                      setViewApplicant(a); // ✅ FULL application
                      setDecision(null);
                      setIsModalOpen(true);
                    }}
                    className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && viewApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          {/* <div className="bg-white rounded-xl p-6 w-[420px] shadow-lg"> */}


      
          <div className="bg-white rounded-xl p-6 w-[420px] shadow-lg relative">
            {/* Close Icon */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setDecision(null);
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Applicant Details
            </h2>

            {/* Applicant Info */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={
                  viewApplicant.candidate.profilePhoto ||
                  "https://via.placeholder.com/80"
                }
                className="w-20 h-20 rounded-full border"
                alt="profile"
              />
              <div>
                <p className="font-semibold text-lg">
                  {viewApplicant.candidate.name}
                </p>
                <p className="text-sm text-gray-600">
                  {viewApplicant.candidate.email}
                </p>
                <p className="text-sm text-gray-500">
                  DOB: {viewApplicant.dob || "—"}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <p className="font-medium mb-1">Skills</p>
              <div className="flex flex-wrap gap-2">
                {(viewApplicant.skills || []).map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Resume */}
            <div className="mb-4">
              <p className="font-medium mb-1">Resume</p>
              {viewApplicant.resumeUrl ? (
                <a
                  href={viewApplicant.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  View / Download Resume
                </a>
              ) : (
                <p className="text-sm text-gray-500">No resume uploaded</p>
              )}
            </div>

            {/* Decision */}
            <div className="mb-4">
              {/* Show buttons ONLY before decision */}
              {decision === null && (
                <div className="flex gap-3">
                  <button
                    onClick={() => setDecision("SHORTLISTED")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium"
                  >
                    Shortlisted
                  </button>

                  <button
                    onClick={() => setDecision("NOT_SHORTLISTED")}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium"
                  >
                    Not Shortlisted
                  </button>
                </div>
              )}

              {/* Not shortlisted message */}
              {decision === "NOT_SHORTLISTED" && (
                <p className="text-center text-red-600 font-medium mt-3">
                  ❌ Candidate marked as Not Shortlisted
                </p>
              )}
            </div>

            {/* Scheduling */}
            {decision === "SHORTLISTED" && (
              <>
                <select
                  className="border w-full px-3 py-2 rounded mb-3"
                  value={modalSchedule.interviewerId}
                  onChange={(e) =>
                    setModalSchedule((p) => ({
                      ...p,
                      interviewerId: e.target.value,
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
                  className="border w-full px-3 py-2 rounded mb-3"
                  value={modalSchedule.date}
                  onChange={(e) =>
                    setModalSchedule((p) => ({
                      ...p,
                      date: e.target.value,
                    }))
                  }
                />

                <div className="flex gap-3 mb-4">
                  <select
                    className="border px-2 py-2 rounded w-1/3"
                    value={modalSchedule.hour}
                    onChange={(e) =>
                      setModalSchedule((p) => ({
                        ...p,
                        hour: e.target.value,
                      }))
                    }
                  >
                    <option value="">HH</option>
                    {[...Array(12)].map((_, i) => {
                      const h = String(i + 1).padStart(2, "0");
                      return (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      );
                    })}
                  </select>

                  <select
                    className="border px-2 py-2 rounded w-1/3"
                    value={modalSchedule.minute}
                    onChange={(e) =>
                      setModalSchedule((p) => ({
                        ...p,
                        minute: e.target.value,
                      }))
                    }
                  >
                    <option value="">MM</option>
                    {["00", "15", "30", "45"].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>

                  <select
                    className="border px-2 py-2 rounded w-1/3"
                    value={modalSchedule.period}
                    onChange={(e) =>
                      setModalSchedule((p) => ({
                        ...p,
                        period: e.target.value,
                      }))
                    }
                  >
                    <option value="">AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border rounded-md text-gray-600"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={confirmSchedule}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium"
                  >
                    Schedule
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
