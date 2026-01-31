// // CandidateProfile.jsx
// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function CandidateProfile() {
//   const [profile, setProfile] = useState({
//     fullName: "",
//     dob: "",
//     gender: "",
//     email: "",
//     location: "",
//     languages: "",
//     education: "",
//     skills: "",
//      profilePhoto: "",   // 🔥 ADD
//     resume: "",         // 🔥 ADD
//   });

//   const [photo, setPhoto] = useState(null);
//   const [resume, setResume] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Load profile on page load
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await api.get("/candidate/profile")
//       if (res.data) {
//         setProfile(res.data);
//       }
//     } catch {
//       console.log("No profile found");
//     }
//   };

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   //   const saveProfile = async () => {
//   //     setLoading(true);
//   //     const formData = new FormData();

//   //     Object.keys(profile).forEach((key) => formData.append(key, profile[key]));

//   //     if (photo) formData.append("photo", photo);
//   //     if (resume) formData.append("resume", resume);

//   //     try {
//   //       await api.post("/candidate/profile", formData, {
//   //         headers: {
//   //           "Content-Type": "multipart/form-data",
//   //         },
//   //       });
//   //       alert("Profile saved successfully");
//   //       fetchProfile();
//   //     } catch {
//   //       alert("Failed to save profile");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
// const saveProfile = async () => {
//   setLoading(true);
//   const formData = new FormData();

//   Object.keys(profile).forEach((key) =>
//     formData.append(key, profile[key])
//   );

//   if (photo) formData.append("photo", photo);
//   if (resume) formData.append("resume", resume);

//   try {
//     await api.post("/candidate/profile", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     alert("Profile saved successfully");
//     setPhoto(null);   // 🔥 reset local file
//       setResume(null);  // 🔥 reset local file

//     fetchProfile();
//   } catch (err) {
//     console.error("SAVE PROFILE ERROR:", err);

//     alert(
//       err.response?.data?.message ||
//       err.message ||
//       "Failed to save profile"
//     );
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
//         <h1 className="text-2xl font-bold mb-6">Candidate Profile</h1>

//         {/* Profile Photo */}
//         <label className="block mb-3 font-medium">Profile Photo</label>
//         <input
//           type="file"
//           onChange={(e) => setPhoto(e.target.files[0])}
//           className="mb-4"
//         />

//         {/* Inputs */}
//         {[
//           ["Full Name", "fullName"],
//           ["Date of Birth", "dob", "date"],
//           ["Email", "email", "email"],
//           ["Current Location", "location"],
//           ["Languages Known", "languages"],
//           ["Highest Education", "education"],
//           ["Skills", "skills"],
//         ].map(([label, name, type = "text"]) => (
//           <div key={name} className="mb-4">
//             <label className="block font-medium mb-1">{label}</label>
//             <input
//               type={type}
//               name={name}
//               value={profile[name]}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//         ))}

//         {/* Gender */}
//         <div className="mb-4">
//           <label className="block font-medium mb-1">Gender</label>
//           <select
//             name="gender"
//             value={profile.gender}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           >
//             <option value="">Select Gender</option>
//             <option>Male</option>
//             <option>Female</option>
//             <option>Other</option>
//           </select>
//         </div>

//         {/* Resume */}
//         <label className="block mb-2 font-medium">Upload Resume</label>
//         <input
//           type="file"
//           onChange={(e) => setResume(e.target.files[0])}
//           className="mb-6"
//         />

//         {/* Save Button */}
//         <button
//           onClick={saveProfile}
//           disabled={loading}
//           className="bg-blue-600 text-white px-6 py-2 rounded"
//         >
//           {loading ? "Saving..." : "Save Profile"}
//         </button>
//       </div>
//     </div>
//   );
// }

// CandidateProfile.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CandidateProfile() {
  const [profile, setProfile] = useState({
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    location: "",
    languages: "",
    education: "",
    skills: "",
    profilePhoto: "", // 🔥 ADD
    resume: "", // 🔥 ADD
  });

  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Load profile on page load
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/candidate/profile");
      if (res.data) {
        setProfile(res.data);
      }
    } catch {
      console.log("No profile found");
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // 🔹 Save profile
  const saveProfile = async () => {
    setLoading(true);
    const formData = new FormData();

    Object.keys(profile).forEach((key) => formData.append(key, profile[key]));

    if (photo) formData.append("photo", photo);
    if (resume) formData.append("resume", resume);

    try {
      await api.post("/candidate/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile saved successfully");
      setPhoto(null); // 🔥 reset local file
      setResume(null); // 🔥 reset local file
      fetchProfile();
    } catch (err) {
      console.error("SAVE PROFILE ERROR:", err);
      alert(
        err.response?.data?.message || err.message || "Failed to save profile",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Candidate Profile</h1>

        {/* ================= PROFILE PHOTO PREVIEW ================= */}
        {profile.profilePhoto && (
          <img
            src={profile.profilePhoto}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 border"
          />
        )}

        {/* Upload Profile Photo */}
        <label className="block mb-2 font-medium">Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="mb-6"
        />

        {/* ================= INPUT FIELDS ================= */}
        {[
          ["Full Name", "fullName"],
          // ["Date of Birth", "dob", "date"],
          <div className="mb-4">
            <label className="block font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={
                profile.dob
                  ? new Date(profile.dob).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>,
          ["Email", "email", "email"],
          ["Current Location", "location"],
          ["Languages Known", "languages"],
          ["Highest Education", "education"],
          ["Skills (comma separated)", "skills"],
        ].map(([label, name, type = "text"]) => (
          <div key={name} className="mb-4">
            <label className="block font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={profile[name] || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        {/* ================= GENDER ================= */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={profile.gender || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* ================= RESUME SECTION ================= */}
        <label className="block mb-2 font-medium">Resume</label>

        {profile.resume && (
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 text-sm underline block mb-2"
          >
            View Uploaded Resume
          </a>
        )}

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          className="mb-6"
        />

        {/* ================= SAVE BUTTON ================= */}
        <button
          onClick={saveProfile}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}
