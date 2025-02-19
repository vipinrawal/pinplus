import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <img
            src="/public/vite.svg"
            alt="Pinterest Logo"/>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
          <i class="ri-home-5-line"></i>
          </Link>
          <Link to="/create" className="nav-link">
          <i class="ri-add-circle-line"></i>
          </Link>
          <Link to="/account" className="nav-link">
            <i class="ri-account-circle-line"></i> {/*{user.name.slice(0, 1)}  */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
