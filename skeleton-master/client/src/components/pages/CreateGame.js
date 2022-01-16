import React, { useState, useEffect } from "react";
import { get } from "../../utilities"
import "./CreateGame.css";

const CreateGame = (props) => {
  useEffect(() => {
    document.title = "Create Game";
  }, []);
  if (!props.userId) {
    return <div>Log in before using Chatbook</div>;
  }
  return (
    <>
      Create Game
    </>
  );
};

export default CreateGame;
