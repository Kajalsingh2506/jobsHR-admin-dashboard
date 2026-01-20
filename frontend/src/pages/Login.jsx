import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  // const handleLogin = async () => {
  //   const res = await api.post("/auth/login", { email, password });
  //   setUser(res.data);

  //   if (res.data.role === "CANDIDATE") navigate("/candidate");
  //   if (res.data.role === "RECRUITER") navigate("/recruiter");
  //   if (res.data.role === "INTERVIEWER") navigate("/interviewer");
  //   if (res.data.role === "HR_ADMIN") navigate("/hr");
  //   if (res.data.role === "SUPER_ADMIN") navigate("/superadmin");
  // };
  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data);

      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      if (res.data.role === "CANDIDATE") navigate("/candidate");
      if (res.data.role === "RECRUITER") navigate("/recruiter");
      if (res.data.role === "INTERVIEWER") navigate("/interviewer");
      if (res.data.role === "HR_ADMIN") navigate("/hr");
      if (res.data.role === "SUPER_ADMIN") navigate("/superadmin");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded w-80">
        <h1 className="text-xl font-bold mb-4">JobsHR Login</h1>

        <input
          className="border w-full mb-2 p-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border w-full mb-4 p-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
