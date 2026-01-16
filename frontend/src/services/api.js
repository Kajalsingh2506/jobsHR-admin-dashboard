import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const url = err.config?.url;

    // 🔴 DO NOT redirect for auth check
    if (err.response?.status === 401 && url !== "/auth/me") {
      window.location.href = "/";
    }

    return Promise.reject(err);
  }
);

export default api;
