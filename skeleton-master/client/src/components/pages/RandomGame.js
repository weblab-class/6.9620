import React, { useState, useEffect } from "react";
import { get } from "../../utilities"
import { socket } from "../../client-socket.js";
import "./RandomGame.css";
import Game from "../modules/Game.js";

const RandomGame = (props) => {
  if (!props.userId) {
    return <div>Log in before using Chatbook</div>;
  }
  const [pairing, setPairing] = useState();
  let test = '';
  for (let i = 0; i < props.userId.length; i++)
  {
    test += props.userId[i];
  }
  useEffect(() => {
    document.title = "Game";
    const changeOpponent = (pairing) => {
      setPairing(pairing);
    };
    get("/api/randomgame", {gameType: "Random", userId: test}).then((pairing) => {
      setPairing(pairing);
    });
    socket.on("found_opponent", changeOpponent);
    return () => {
      socket.off("found_opponent", changeOpponent);
    };
  }, []);
  
  if (!pairing)
  {
    return (<>Loading</>);
  }
  else
  {
    if (pairing.player1.userId == pairing.player2.userId)
    {
      return (
        <>
          Waiting for random Player
        </>
      );
    }
    else
    {
      return (<Game turns_left={6} pairing={pairing} />);
    }
  }
};

export default RandomGame;
