import React, {useEffect} from "react";
import { Redirect, useLocation } from "react-router-dom";
import queryString from 'query-string'
import { useAuthContext } from "../context";

const GoogleAuthCatcher = () => {
  let location = useLocation()
  const {googleAuthenticate, authState} = useAuthContext()

  useEffect(() => {
    const values = queryString.parse(location.search)
    const state = values.state ? values.state : null
    const code = values.code ? values.code :null

    if (state && code){
      googleAuthenticate(state, code)
    }
  }, [location])

  if (authState.isAuthenticate){
    return <Redirect to='/'/>
  }

  return <div>Authenticting with Google</div>;
};

export default GoogleAuthCatcher;
