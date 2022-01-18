import React, { useState, useEffect } from "react";
import { get } from "../../utilities"
import "./CreateGame.css";

const CreateGame = (props) => {
  useEffect(() => {
    document.title = "Create Game";
    get("/api/deletequeue", {userId: props.userId});
  }, []);
  if (!props.userId) {
    return (
      <>
        <div className="titleContainer">
          <h1 className="title">Log In Before<br />Creating Game</h1>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="titleContainer">
        <h1 className="title">Create Game</h1>
      </div>
      <div className="descContainer">
        <p className="desc">Not Implemented Yet :(</p>
      </div>
    </>
  );
};

export default CreateGame;
