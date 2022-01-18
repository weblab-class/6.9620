import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";
import "./JoinGame.css";
import GameCodeInput from "../modules/GameCodeInput.js";

const JoinGame = (props) => {
  useEffect(() => {
    document.title = "Join Game";
    get("/api/deletequeue", {userId: props.userId});
  }, []);
  if (!props.userId) {
    return <div>Log in before using Chatbook</div>;
  }
  return (
    <>
      <div className="titleContainer">
        <h1 className="title">Join Game</h1>
      </div>
      <div className="randomGameButtonContainer">
        <Link to="/joingame/random/" className="randomGameButton">
          Join Random Game
        </Link>
      </div>
      <div>
        {props.userId && <GameCodeInput />}
      </div>
    </>
  );
};

export default JoinGame;
