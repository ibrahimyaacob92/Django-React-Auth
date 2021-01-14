import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL,
  ACTIVATE_FAIL,
  ACTIVATE_SUCCESS,
} from "./AuthTypes";

export const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
  loginFailed: false,
};

export default function authReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      return {
        ...state,
        access: payload.access,
        refresh: payload.refresh,
        isAuthenticated: true,
        loginFail: false,
      };
    case LOAD_USER_SUCCESS:
      console.log(LOAD_USER_SUCCESS, payload);
      return {
        ...state,
        user: payload.user,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loginFail: true,
      };

    case ACTIVATE_SUCCESS:
    case ACTIVATE_FAIL:
    case AUTHENTICATE_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
