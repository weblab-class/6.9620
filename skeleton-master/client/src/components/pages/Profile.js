import React, { useState, useEffect } from "react";
import { get } from "../../utilities"
import "./Profile.css";

const Profile = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    document.title = "Profile";
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  if (!user) {
    return (<div> Loading! </div>);
  }
  if (!props.userId) {
    return <div>Log in before using Chatbook</div>;
  }
  return (
    <>
      Profile
    </>
  );
};

export default Profile;
