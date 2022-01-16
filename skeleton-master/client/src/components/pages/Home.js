import React, { Component, useEffect } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Home.css";

const Home = (props) => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <>
      Type It
    </>
  );
};

export default Home;