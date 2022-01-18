import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./Navigation.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "1061692360630-j0j2v8rkpspn9l8eaagsl2qoau9p3fuo.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const Navigation = (props) => {
  return (
    <>
      <nav className="NavBar-container">
        <div>
          <Link to="/" className="NavBar-link">
            Home
          </Link>
          {props.userId && (
            <Link to={`/profile/${props.userId}`} className="NavBar-link">
              Profile
            </Link>
          )}
          {props.userId && (
            <Link to="/creategame" className="NavBar-link">
              Create Game
            </Link>
          )}
          {props.userId && (
            <Link to="/joingame" className="NavBar-link">
              Join Game
            </Link>
          )}
          <Link to="/leaderboard" className="NavBar-link">
            LeaderBoard
          </Link>
          {props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;