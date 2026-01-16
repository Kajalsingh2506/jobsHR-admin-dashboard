import { useState } from "react";
import api from "../../services/api";

export default function HRDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const openModal = (userRole) => {
    setRole(userRole);
    setShowModal(true);
  };

  const createUser = async () => {
    try {
      await api.post("/users", {
        ...form,
        role,
      });

      alert(`${role} created successfully`);
      setShowModal(false);
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        HR Dashboard – TechNova
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Jobs Created" value="8" />
        <StatCard title="Recruiters" value="4" />
        <StatCard title="Interviewers" value="6" />
        <StatCard title="Interviews Completed" value="32" />
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

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">
              Add {role}
            </h2>

            <input
              className="border p-2 w-full mb-2"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="border p-2 w-full mb-2"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              className="border p-2 w-full mb-4"
              placeholder="Temporary Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={createUser}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Create
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
