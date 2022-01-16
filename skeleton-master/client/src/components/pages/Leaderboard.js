import React, { useState, useEffect } from "react";
import { get } from "../../utilities"
import "./Leaderboard.css";

const Leaderboard = (props) => {
  useEffect(() => {
    document.title = "Leaderboard";
  }, []);
  return (
    <>
      Leaderboard
    </>
  );
};

export default Leaderboard;
