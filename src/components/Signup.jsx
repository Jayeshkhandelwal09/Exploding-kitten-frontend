import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./authStyle.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://exploding-kitten-1-fs5m.onrender.com/users/signup", {
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1>Signup</h1>
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
        <button onClick={() => navigate("/login")}>
          Already a user? Login
        </button>
      </div>
    </div>
  );
}

export default Signup;
