import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, fetchHighscore, setLoading } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./authStyle.css";

import Spinner from "./Spinner"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true)); 
    try {
      const response = await axios.post("https://embarrassed-bee-belt.cyclic.app/users/login", {
        email,
        password,
      });
      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
      dispatch(fetchHighscore());
    } catch (error) {
      console.error("Login failed:", error.message);
    } finally {
      dispatch(setLoading(false)); 
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
        {isLoading && <Spinner />} 
      </div>
    </div>
  );
}

export default Login;
