import React from "react";
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Account = ({ user }) => {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = UserData();
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      toast.success(data.message);
      navigate("/login");
      setIsAuth(false);
      setUser([]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { pins } = PinData();

  let userPins;

  if (pins) {
    userPins = pins.filter((pin) => pin.owner === user._id);
  }
  return (
    <div className="profile-container">
    <div className="profile-wrapper">

      <div className="details">

        <div className="profile-avatar">
          <span>{user?.name?.slice(0, 1) || "?"}</span>
        </div>

        <div className="user">
          <h1 className="profile-name">{user?.name || "Unknown User"}</h1>
          <p className="profile-email">{user?.email || "No Email Provided"}</p>
        </div>
        
      </div>

      <div className="follow">
        {user.followers && <p>{user.followers.length} followers</p>}
        {user.following && <p>{user.following.length} followings</p>}
      </div>

        <button onClick={logoutHandler} className="logout-button">
          <i class="ri-logout-box-r-line"></i> <span>Logout</span>
        </button>

    </div>
      <div className="inner-container">
        {userPins && userPins.length > 0 ? (
          userPins.map((e) => <PinCard key={e._id} pin={e} />)
        ) : (
          <p className="no-pin">No Pin Yet</p>
        )}
      </div>
  </div>
  );
};

export default Account;
