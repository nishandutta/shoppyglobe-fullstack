import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((s) => s.user);

  const [form, setForm] = useState({ email: "", password: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (res?.meta?.requestStatus === "fulfilled" && res.payload?.token) {
      navigate("/");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="password"
              required
            />
          </div>

          <button disabled={status === "loading"}>
            {status === "loading" ? "Signing in..." : "Login"}
          </button>
          {error && <p className="error">Error: {error}</p>}
        </form>

        <p>
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
