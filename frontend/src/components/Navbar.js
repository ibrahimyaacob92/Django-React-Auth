import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context";

const Navbar = () => {
  const { authState, logout } = useAuthContext();

  const handleLogout = () =>{
      console.log('logging out')
    logout()
  } 
    
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <a href='' onClick={e=>{handleLogout()}}>Logout</a>
      {authState.user && (
        <>
          <h1>{authState.user.email}</h1>
          <h2>{authState.user.first_name + ' ' + authState.user.last_name}</h2>
        </>
      )}
    </nav>
  );
};

export default Navbar;
