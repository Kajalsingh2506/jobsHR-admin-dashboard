//src/pages/HRDashboard.jsx
import api from "../../services/api";
import { useState, useEffect } from "react";

export default function HRDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const [companyName, setCompanyName] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [stats, setStats] = useState({
    jobs: 0,
    recruiters: 0,
    interviewers: 0,
    interviewsCompleted: 0,
  });

  const [recruiters, setRecruiters] = useState([]);
  const [interviewers, setInterviewers] = useState([]);

  const fetchCompany = async () => {
    try {
      const res = await api.get("/hr/company");
      setCompanyName(res.data.name);
    } catch (err) {
      console.error("Failed to fetch company");
    }
  };

  // useEffect(() => {
  //   fetchDashboardStats();
  //   fetchCompany();
  //   fetchRecruiters();
  //   fetchInterviewers();
  // }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await api.get("/hr/dashboard-stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats");
    }
  };

  const fetchRecruiters = async () => {
    try {
      const res = await api.get("/users?role=RECRUITER");
      setRecruiters(res.data);
    } catch (err) {
      console.error("Failed to fetch recruiters");
    }
  };

  const fetchInterviewers = async () => {
    try {
      const res = await api.get("/users?role=INTERVIEWER");
      setInterviewers(res.data);
    } catch (err) {
      console.error("Failed to fetch interviewers");
    }
  };
  useEffect(() => {
    fetchCompany();
    fetchDashboardStats();
    fetchRecruiters();
    fetchInterviewers();
  }, []);

  // const openModal = (userRole) => {
  //   setRole(userRole);
  //   setShowModal(true);
  // };
  const openModal = (userRole, user = null) => {
    setRole(userRole);
    setEditingUser(user);

    if (user) {
      // EDIT MODE → fill form
      setForm({
        name: user.name,
        email: user.email,
        password: "",
      });
    } else {
      // ADD MODE → empty form
      setForm({ name: "", email: "", password: "" });
    }

    setShowModal(true);
  };

  // const createUser = async () => {
  //   try {
  //     await api.post("/users", {
  //       ...form,
  //       role,
  //     });

  //     // 🔥 refresh dashboard + lists
  //     await fetchDashboardStats();
  //     await fetchRecruiters();
  //     await fetchInterviewers();

  //     // ✅ UX fixes (important for “live” feeling)
  //     setShowModal(false);
  //     setForm({ name: "", email: "", password: "" });
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Failed to create user");
  //   }
  // };

  const saveUser = async () => {
    try {
      if (editingUser) {
        // ✅ UPDATE SAME RECORD
        await api.put(`/users/${editingUser._id}`, {
          name: form.name,
          email: form.email,
          password: form.password || undefined,
        });
      } else {
        // ✅ CREATE NEW USER
        await api.post("/users", {
          ...form,
          role,
        });
      }

      await fetchDashboardStats();
      await fetchRecruiters();
      await fetchInterviewers();

      setShowModal(false);
      setEditingUser(null);
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save user");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);

      await fetchDashboardStats();
      await fetchRecruiters();
      await fetchInterviewers();
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        HR Dashboard – {companyName || "Loading..."}{" "}
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Jobs Created" value={stats.jobs} />
        <StatCard title="Recruiters" value={stats.recruiters} />
        <StatCard title="Interviewers" value={stats.interviewers} />
        <StatCard
          title="Interviews Completed"
          value={stats.interviewsCompleted}
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => openModal("RECRUITER")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Recruiter
        </button>

        <button
          onClick={() => openModal("INTERVIEWER")}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          + Add Interviewer
        </button>
      </div>
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-4">Recruiters</h2>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {recruiters.map((r) => (
              <tr key={r._id}>
                <td className="p-2 border">{r.name}</td>
                <td className="p-2 border">{r.email}</td>
                <td className="p-2 border">
                  {/* <button
                    onClick={() => openModal("RECRUITER", r)}
                    className="text-blue-600"
                  >
                    Edit
                  </button> */}

                  <button
                    onClick={() => openModal("RECRUITER", r)}
                    className="text-blue-600 mr-4"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteUser(r._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-4">Interviewers</h2>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {interviewers.map((i) => (
              <tr key={i._id}>
                <td className="p-2 border">{i.name}</td>
                <td className="p-2 border">{i.email}</td>
                <td className="p-2 border">
                  {/* <button
                    onClick={() => openModal("INTERVIEWER", i)}
                    className="text-blue-600"
                  >
                    Edit
                  </button> */}

                  <button
                    onClick={() => openModal("INTERVIEWER", i)}
                    className="text-blue-600 mr-4"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteUser(i._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* JOB TABLE */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-4">Company Jobs</h2>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Job Title</th>
              <th className="p-2 border">Applications</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">Frontend Developer</td>
              <td className="p-2 border">18</td>
              <td className="p-2 border text-green-600">Open</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* MODAL  */}
      {showModal && (
        //         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
        //           <div className="bg-white p-6 rounded w-96">
        //             <h2 className="text-lg font-bold mb-4">Add {role}</h2>

        //             <input
        //               className="border p-2 w-full mb-2"
        //               placeholder="Name"
        //               value={form.name}
        //               onChange={(e) => setForm({ ...form, name: e.target.value })}
        //             />

        //             <input
        //               className="border p-2 w-full mb-2"
        //               placeholder="Email"
        //               value={form.email}
        //               onChange={(e) => setForm({ ...form, email: e.target.value })}
        //             />

        //             <input
        //               type="password"
        //               className="border p-2 w-full mb-4"
        //               placeholder="Temporary Password"
        //               value={form.password}
        //               onChange={(e) => setForm({ ...form, password: e.target.value })}
        //             />

        //             <div className="flex justify-end gap-2">
        //               <button
        //                 onClick={() => setShowModal(false)}
        //                 className="px-4 py-2 border rounded"
        //               >
        //                 Cancel
        //               </button>
        //               <button
        //                 onClick={createUser}
        //                 className="bg-green-600 text-white px-4 py-2 rounded"
        //               >
        //                 Create
        //               </button>
        //             </div>
        //           </div>
        //         </div>
        //       )}
        //     </div>
        //   );
        // }

        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">
              {editingUser ? `Edit ${role}` : `Add ${role}`}
            </h2>

            <input
              className="border p-2 w-full mb-2"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="border p-2 w-full mb-2"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="password"
              className="border p-2 w-full mb-4"
              placeholder="Temporary Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingUser(null);
                }}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveUser}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {editingUser ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}

function UserTable({ title, users }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="font-semibold mb-4">{title}</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="2" className="p-2 text-center text-gray-500">
                No records found
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u._id}>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
