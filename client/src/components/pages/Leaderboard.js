import React, { useState, useEffect } from "react";
import { get } from "../../utilities"
import "./Leaderboard.css";

const Leaderboard = (props) => {
  useEffect(() => {
    document.title = "Leaderboard";
    get("/api/deletequeue", {userId: props.userId});
  }, []);
  return (
    <>
      <div className="titleContainer">
        <h1 className="title">Leaderboard</h1>
      </div>
      <div className="descContainer">
        <p className="desc">Not Implemented Yet :(</p>
      </div>
    </>
  );
};

export default Leaderboard;
