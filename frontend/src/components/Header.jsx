import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Header() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // const logout = async () => {
  //   try {
  //     await api.post("/auth/logout");
  //     setUser(null);
  //     navigate("/");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const logout = async () => {
  try {
    await api.post("/auth/logout");

    // 🔴 IMPORTANT: clear auth state FIRST
    setUser(null);

    // 🔴 HARD redirect (not navigate)
    window.location.href = "/";
  } catch (err) {
    console.error(err);
  }
};

  return (
    <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        JobsHR
      </Link>

      {/* Right Side Buttons */}
      <div className="flex gap-4 items-center">
        {!user ? (
          <>
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
