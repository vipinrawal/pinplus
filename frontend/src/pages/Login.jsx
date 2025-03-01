import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { LoadingAnimation } from "../components/Loading";
import { PinData } from "../context/PinContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, btnLoading } = UserData();
  const navigate = useNavigate();

  const { fetchPins } = PinData();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate, fetchPins);
  };
  return (
        <div className="login-container">
          <div className="login-subcontainer">
            <div className="login-card">
              <img src="logo.png" alt=""/>
              <h1>Hello Again!</h1>
              <p>Welcome back you've been missed!</p>
              <form onSubmit={submitHandler}>
                  <input
                    type="email"
                    id="email"
                    className="common-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    id="password"
                    className="common-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                  />
                <button type="submit" className="common-btn" disabled={btnLoading}>
                  {btnLoading ? <LoadingAnimation /> : "Sign in"}
                </button>
              </form>
              ____________________ OR ____________________
              <p>Not on pinplus yet? <span><Link to="/register">Register now</Link> </span></p>
            </div>
          </div>
        </div>
  );
};

export default Login;
