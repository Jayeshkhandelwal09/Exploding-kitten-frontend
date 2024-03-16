import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, fetchHighscore } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./authStyle.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://exploding-kitten-1-fs5m.onrender.com/users/login", {
        email,
        password,
      });
      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
      dispatch(fetchHighscore());
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
          </div>
          <div>
            <label>Password:</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
          </div>
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => navigate("/signup")}>Not a user? Signup</button>
      </div>
    </div>
  );
}

export default Login;
