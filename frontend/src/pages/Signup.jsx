import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSignup = async () => {
    await api.post("/auth/signup", form);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded w-80">
        <h1 className="text-xl font-bold mb-4">Candidate Signup</h1>

        <input className="border w-full mb-2 p-2" placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input className="border w-full mb-2 p-2" placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input type="password" className="border w-full mb-4 p-2" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSignup}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
