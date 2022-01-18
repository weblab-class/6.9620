import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import CreateGame from "./pages/CreateGame.js";
import JoinGame from "./pages/JoinGame.js";
import Leaderboard from "./pages/Leaderboard.js";
import Wait from "./pages/Wait.js";
import RandomGame from "./pages/RandomGame.js";
import Navigation from "./modules/Navigation.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    }).then(() => {
      get("/api/deletequeue", {userId: userId});
    });
    //post("/api/createword");
  }, [])

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <Navigation
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userId={userId}
      />
      <Router>
        <Home path="/" userId={userId} />
        <Profile path="/profile/:userId" userId={userId} />
        <CreateGame path="/creategame/" userId={userId} />
        <JoinGame path="/joingame/" userId={userId} />
        <Leaderboard path="/leaderboard/" />
        <Wait path="/wait/" userId={userId} />
        <RandomGame path="/joingame/random/" userId={userId} />
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
