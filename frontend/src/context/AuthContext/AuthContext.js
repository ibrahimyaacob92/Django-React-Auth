import React, { useContext, useReducer, useState } from "react";
import authReducer, { initialState } from "./authReducer";
import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL,
  LOGOUT,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  ACTIVATE_SUCCESS,
  ACTIVATE_FAIL,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
  FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_FAIL,
} from "./AuthTypes";

const urlLogin = "http://localhost:8000/auth/jwt/create/";
const urlGetUser = "http://localhost:8000/auth/users/me/";
const urlVerifyToken = "http://localhost:8000/auth/jwt/verify";
const urlRefreshToken = "";
const urlRegister = "http://localhost:8000/auth/users/";
const urlActivation = "http://localhost:8000/auth/users/activation/";
const urlContinueGoogle =
  "http://localhost:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:8000/auth/google";
const urlAuthenticateGoogle = "http://localhost:8000/auth/o/google-oauth2/?";
const urlContinueFacebook =
  "http://localhost:8000/auth/o/facebook/?redirect_uri=http://localhost:8000/auth/facebook";
  
const urlAuthenticateFacebook = "http://localhost:8000/auth/o/facebook/?";

const AuthContext = React.createContext();

// to wrap the components
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email, password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(urlLogin, body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          ...res.data,
        },
      });
      dispatch(loadUser());
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

  const loadUser = async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      try {
        const res = await axios.get(urlGetUser, config);
        dispatch({
          type: LOAD_USER_SUCCESS,
          payload: {
            user: res.data,
          },
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: LOAD_USER_FAIL,
        });
      }
    }
  };

  const verifyTokenAuthenticated = async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const body = JSON.stringify({ token: localStorage.getItem("access") });
      try {
        const res = await axios.post(urlVerifyToken, body, config);
        if (res.data.code !== "token_not_valid") {
          dispatch({
            type: AUTHENTICATE_SUCCESS,
          });
        } else {
          dispatch({
            type: AUTHENTICATE_FAIL,
          });
        }
      } catch (error) {
        console.log("error on verifying token", error);
        dispatch({
          type: AUTHENTICATE_FAIL,
        });
      }
    }
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  const signup = async (
    email,
    first_name,
    last_name,
    password,
    re_password
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      re_password,
    });
    try {
      console.log(body);
      const res = await axios.post(urlRegister, body, config);

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: SIGNUP_FAIL,
      });
    }
  };

  const activateAccount = async (uid, token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ uid, token });
    try {
      const res = axios.post(urlActivation, body, config);
      dispatch({
        type: ACTIVATE_SUCCESS,
      });
    } catch (error) {
      console.log("Activation Failed", error);
      dispatch({
        type: ACTIVATE_FAIL,
      });
    }
  };

  // not an action.. but it's just nice to group it together
  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(urlContinueGoogle);
      window.location.replace(res.data.authorization_url);
    } catch (error) {
      console.log(error);
    }
  };

  const googleAuthenticate = async (state, code) => {
    if (state && code && !localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const details = {
        state: state,
        code: code,
      };

      const formBody = Object.keys(details)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
        )
        .join("&");

      try {
        console.log("posting to :", urlAuthenticateGoogle + formBody);
        const res = await axios.post(urlAuthenticateGoogle + formBody, config);
        console.log("authenticate google success ?", res.data);
        dispatch({
          type: GOOGLE_AUTH_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        console.log("authenticate google failed", error);
        dispatch({
          type: GOOGLE_AUTH_FAIL,
        });
      }
    }
  };

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(urlContinueFacebook);
      window.location.replace(res.data.authorization_url);
    } catch (error) {
      console.log("continue with facebook error", error);
    }
  };

  const facebookAuthenticate = async (state, code) => {
    if (state && code && !localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const details = {
        state: state,
        code: code,
      };

      const formBody = Object.keys(details)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
        )
        .join("&");

      try {
        console.log("posting to :", urlAuthenticateFacebook + formBody);
        const res = await axios.post(urlAuthenticateFacebook + formBody, config);
        console.log("authenticate facebook success ?", res.data);
        dispatch({
          type: FACEBOOK_AUTH_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        console.log("authenticate facebook failed", error);
        dispatch({
          type: FACEBOOK_AUTH_FAIL,
        });
      }
    }
  };
  // this is where the
  return (
    <AuthContext.Provider
      value={{
        authState: state,
        login: login,
        loadUser: loadUser,
        verifyTokenAuthenticated: verifyTokenAuthenticated,
        logout: logout,
        signup: signup,
        activateAccount: activateAccount,
        continueWithGoogle: continueWithGoogle,
        googleAuthenticate: googleAuthenticate,
        continueWithFacebook: continueWithFacebook,
        facebookAuthenticate: facebookAuthenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export the works
const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
