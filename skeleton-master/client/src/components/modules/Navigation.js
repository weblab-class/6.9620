import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./Navigation.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const Navigation = (props) => {
  return (
    <>
      <nav>
        <div>
          Type It
        </div>
        <div>
          <Link to="/">
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
          <Link to="/leaderboard">
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