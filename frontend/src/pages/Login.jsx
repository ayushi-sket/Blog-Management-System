import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("blog_token", res.data.token);
      localStorage.setItem("blog_user", JSON.stringify(res.data.user));

      if (res.data.user.role === "Admin") {
        navigate("/admin");
      } else if (res.data.user.role === "Author") {
        navigate("/author");
      } else {
        navigate("/reader");
      }

      window.location.reload();
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue to BlogSphere</p>

        <form onSubmit={loginUser} className="form">
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>

        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default Login;