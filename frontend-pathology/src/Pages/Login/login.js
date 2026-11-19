import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './login.css'

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      toast.error("Please fill all fields ❌");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/auth/login", data);

      login(res.data);

      toast.success("Login Successful ✅");
      navigate("/");

    } catch (err) {
      console.log(err.response?.data);
      toast.error("Invalid Credentials ❌");
    }
  };

  return (
      <div className="login-wrapper">
      <div className="login-box">
        <h2>🧪 Pathology Lab</h2>
        <p className="subtitle">Management System</p>

        <div className="input-group">
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <label>Email Address</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
