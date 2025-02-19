import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";
import { UserData } from "../context/UserContext";

const UserProfile = ({ user: loggedInUser }) => {
  const params = useParams();
  const [user, setUser] = useState([]);

  async function fetchUser() {
    try {
      const { data } = await axios.get(`/api/user/${params.id}`);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  const [isFollow, setIsFollow] = useState(false);

  const { followUser } = UserData();

  const followHander = () => {
    setIsFollow(!isFollow);
    followUser(user._id, fetchUser);
  };

  const followers = user.followers;

  useEffect(() => {
    if (followers && followers.includes(loggedInUser._id)) setIsFollow(true);
  }, [user]);

  const { pins } = PinData();

  let userPins;

  if (pins) {
    userPins = pins.filter((pin) => pin.owner === user._id);
  }

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      {user && (
        <div className="profile-container">
          <div className="profile-wrapper">
            <div className="details">
              <div className="profile-avatar">
                {user.name && (
                  <span className="text-3xl text-gray-700">
                    {user.name.slice(0, 1)}
                  </span>
                )}
              </div>
              <div className="user">
                <h1 className="profile-name">{user.name}</h1>
                <p className="profile-email">{user.email}</p>
              </div>
            </div>
            <div className="follow">
              {user.followers && <p>{user.followers.length} followers</p>}
              {user.following && <p>{user.following.length} followings</p>}
            </div>
            {user && user._id === loggedInUser._id ? (
              ""
            ) : (
              <div className="follow-button">
                <button
                  onClick={followHander}
                  className="bg-gray-200 px-4 py-2 rounded">
                  {isFollow ? "Unfollow" : " Follow"}
                </button>
              </div>
            )}
          </div>
            <div className="inner-container">
              {userPins && userPins.length > 0 ? (
                userPins.map((e) => <PinCard key={e._id} pin={e} />)
              ) : (
                <p>No Pin Yet</p>
              )}
            </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
