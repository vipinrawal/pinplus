import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pinterest-logo.png/600px-Pinterest-logo.png"
            alt="Pinterest Logo"/>
          <span className="navbar-brand">Pin<sup>+</sup></span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
          <i class="ri-home-fill"></i> Home
          </Link>
          <Link to="/create" className="nav-link">
          <i class="ri-add-circle-line"></i> Create
          </Link>
          <Link to="/account" className="nav-link">
           <i class="ri-account-circle-line"></i> Account{/*{user.name.slice(0, 1)} */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
