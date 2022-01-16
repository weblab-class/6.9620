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
      Type It
    </>
  );
};

export default Home;