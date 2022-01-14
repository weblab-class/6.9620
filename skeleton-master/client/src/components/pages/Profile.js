import React, { useState, useEffect } from "react";
import { get } from "../../utilities"
import "./Profile.css";

const Profile = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    document.title = "Profile Page";
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  if (!user) {
    return (<div> Loading! </div>);
  }
  return (
    <>
      Profile
    </>
  );
};

export default Profile;
