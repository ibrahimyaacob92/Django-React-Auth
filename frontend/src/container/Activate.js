import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuthContext } from "../context";

const Activate = ({ match }) => {
  const uid = match.params.uid;
  const token = match.params.token;
  const { activateAccount, authStates } = useAuthContext();
  

  useEffect(() => {
    activateAccount(uid, token)
  },[])

  return (
    <div>
      Your Account has been Activate ! Sending id : {token} and token : {uid}
      <p>Go back to</p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Activate;
