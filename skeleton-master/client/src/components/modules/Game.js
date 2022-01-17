import React, { useState, useEffect } from "react";
import { get } from "../../utilities"
import "./Game.css";

const Game = (props) => {
  return (
    <>
      {props.pairing.player1.userId}--and--{props.pairing.player2.userId}
    </>
  );
};

export default Game;
