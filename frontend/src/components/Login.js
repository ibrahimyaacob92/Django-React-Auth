import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "../context";

const Login = () => {
  const { login, authState } = useAuthContext();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginFormData;

  const onChange = (e) =>
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    console.log("from onclick", authState); // getting latest state in this form doestn work
  };

  if (authState.isAuthenticated){
    return <Redirect to='/'/>
  }

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
          autoComplete='email'
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          required
          autoComplete='current-password'
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
