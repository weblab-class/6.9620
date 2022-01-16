import React, { useState, useEffect } from "react";
import { get } from "../../utilities"
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
    get("/api/randomgame", {gameType: "Random", userId: test}).then((code) => {
      setOtherPlayerId(code.userId);
    });
  }, []);
  
  
  return (
    <>
      {test}
      {otherPlayerId}
    </>
  );
};

export default RandomGame;
