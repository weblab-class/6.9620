import React, { useState, useEffect } from "react";
import { get } from "../../utilities"
import { socket } from "../../client-socket.js";
import "./RandomGame.css";

const RandomGame = (props) => {
  if (!props.userId) {
    return <div>Log in before using Chatbook</div>;
  }
  const [otherPlayerId, setOtherPlayerId] = useState();
  let test = '';
  for (let i = 0; i < props.userId.length; i++)
  {
    test += props.userId[i];
  }
  useEffect(() => {
    document.title = "Game";
    const changeOpponent = (player) => {
      setOtherPlayerId(player);
    };
    get("/api/randomgame", {gameType: "Random", userId: test}).then((code) => {
      setOtherPlayerId(code.userId);
    });
    socket.on("found_opponent", changeOpponent);
    return () => {
      socket.off("found_opponent", changeOpponent);
    };
  }, []);
  
  
  return (
    <>
      {test}
      {otherPlayerId}
    </>
  );
};

export default RandomGame;
