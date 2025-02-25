import React, { useState } from "react";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import PinCard from "../components/PinCard";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { pins, loading } = PinData();
  return (
    <div>
      
      {loading ? ( 
        <Loading />
      ) : (
        <div className="container">
          <div className="searchcontainer">
            <div className="searchbar">
              <input
                type="text"
                placeholder=" Search for ideas "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
        </div>
          <div className="inner-container">
              {pins?.length > 0 ? (
                pins
                  .filter((pin) =>
                    pin.title.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((e) => <PinCard key={e.id || e.someUniqueField} pin={e} />)
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
