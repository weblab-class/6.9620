import React, { Component, useEffect } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Home.css";

const Home = (props) => {
  useEffect(() => {
    document.title = "Home";
    get("/api/deletequeue", {userId: props.userId});
  }, []);
  return (
    <>
      <div className="titleContainer">
        <h1 className="title">Type It In</h1>
      </div>
      <div className="descContainer">
        <p className="desc">A Fun Game :)</p>
      </div>
    </>
  );
};

export default Home;