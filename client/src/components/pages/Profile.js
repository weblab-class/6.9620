import React, { useState, useEffect } from "react";
import { get } from "../../utilities"
import "./Profile.css";

const Profile = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    document.title = "Profile";
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
    get("/api/deletequeue", {userId: props.userId});
  }, []);

  if (!user) {
    return (<div> Loading! </div>);
  }
  if (!props.userId) {
    return (
      <>
        <div className="titleContainer">
          <h1 className="title">Log In Before Seeing Profile</h1>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="titleContainer">
        <h1 className="title">Profile</h1>
      </div>
      <div className="descContainer">
        <p className="desc">Not Implemented Yet :(</p>
      </div>
    </>
  );
};

export default Profile;
