import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities"
import "./JoinGame.css";
import GameCodeInput from "../modules/GameCodeInput.js";

const JoinGame = (props) => {
  return (
    <>
      <div>
        <Link to="/joingame/random/">
          Random Game
        </Link>
        {props.userId && <GameCodeInput />}
      </div>
    </>
  );
};

export default JoinGame;
