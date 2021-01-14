import React, {useEffect} from "react";
import { Redirect, useLocation } from "react-router-dom";
import queryString from 'query-string'
import { useAuthContext } from "../context";

const FacebookAuthCatch = () => {
  let location = useLocation()
  const {facebookAuthenticate, authState} = useAuthContext()

  useEffect(() => {
    const values = queryString.parse(location.search)
    const state = values.state ? values.state : null
    const code = values.code ? values.code :null

    if (state && code){
      facebookAuthenticate(state, code)
    }
  }, [location])

  if (authState.isAuthenticate){
    return <Redirect to='/'/>
  }

  return <div>Authenticting with Facebook</div>;
};

export default FacebookAuthCatch;
