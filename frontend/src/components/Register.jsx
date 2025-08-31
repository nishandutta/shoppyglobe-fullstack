import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((s) => s.user);

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser(form));
    if (res?.meta?.requestStatus === "fulfilled") {
      navigate("/login"); // after register, go to login
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Create Account</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              required
            />
          </div>

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
              minLength={6}
            />
          </div>

          <button disabled={status === "loading"}>
            {status === "loading" ? "Creating..." : "Register"}
          </button>
          {error && <p className="error">Error: {error}</p>}
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
