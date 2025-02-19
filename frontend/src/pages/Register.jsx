import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { LoadingAnimation } from "../components/Loading";
import { PinData } from "../context/PinContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { registerUser, btnLoading } = UserData();
  const navigate = useNavigate();

  const { fetchPins } = PinData();

  const submitHandler = (e) => {
    e.preventDefault();
    registerUser(name, email, password, navigate, fetchPins);
  };
  return (
        <div className="login-container">
          <div className="login-subcontainer">
            <div className="login-card">
              <img src="https://res.cloudinary.com/dmcowp1wi/image/upload/v1739971080/vite_graqcz.svg" alt="" />
              <h1>Welcome to pinplus</h1>
              <p>Create your account</p>
              <form onSubmit={submitHandler}>
                  <input
                    type="text"
                    id="name"
                    className="common-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your name"
                  />
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
                  {btnLoading ? <LoadingAnimation /> : "Sign up"}
                </button>
              </form>
              ____________________ OR ____________________
              <p>Already have an account? <span><Link to="/login">Login</Link> </span></p>
            </div>
          </div>
        </div>
  );
};

export default Register;
