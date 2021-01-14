import React from "react";
import { Signup, Login } from "../components";
import { useAuthContext } from "../context";

const LoginSignup = () => {
  const { authState } = useAuthContext();

  return (
    <div>
      <h1>Login</h1>
      <Login />
      {authState.loginFail && <p>Wrong password or username is inserted</p>}
      <h1>Signup</h1>
      <Signup />
    </div>
  );
};

export default LoginSignup;
