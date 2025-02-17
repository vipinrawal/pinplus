import React from "react";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import PinCard from "../components/PinCard";

const Home = () => {
  const { pins, loading } = PinData();
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="inner-container">
              {pins?.length > 0 ? (
                pins.map((e) => <PinCard key={e.id || e.someUniqueField} pin={e} />)
              ) : (
                <p className="no-pins">No Pins Yet</p>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
