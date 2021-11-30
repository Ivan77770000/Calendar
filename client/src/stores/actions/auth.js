import APIRouter from "../../common/api-router";
import { APIMethodType, APIDefaultHeader } from "../../common/api-config";
import ErrorMessage from "../../common/error-message";

import {
  toggleSpinner,
  toggleErrorMessage,
  toggleFormErrorMessage,
} from "./common";

export const actionWhere = {
  signup: "REGISTER",
  signin: "LOGIN",
};

export const authAction = {
  loginSuccess: "LOGIN_SUCCESS",
  logoutSuccess: "LOGOUT_SUCCESS",
  registerSuccess: "REGISTER_SUCCESS",
};

const loginSuccess = (data) => {
  return {
    type: authAction.loginSuccess,
    payload: data,
  };
};

const logoutSuccess = () => {
  return {
    type: authAction.logoutSuccess,
  };
};

const registerSuccess = (data) => {
  return {
    type: authAction.registerSuccess,
    payload: data,
  };
};

export const login = (postData) => {
  return (dispatch) => {
    dispatch(toggleSpinner(true));

    fetch(APIRouter.user.signin, {
      method: APIMethodType.post,
      headers: APIDefaultHeader,
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) throw new Error(ErrorMessage.common.common);
        return response.json();
      })
      .then((jsonData) => {
        setTimeout(() => {
          dispatch(loginSuccess(jsonData.data));
          dispatch(toggleSpinner(false));
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          dispatch(toggleFormErrorMessage(error.message, actionWhere.signin));
          dispatch(toggleSpinner(false));
        }, 1000);
      });
  };
};

export const logout = (user) => {
  return (dispatch) => {
    dispatch(toggleSpinner(true));
    const url = `${APIRouter.user.logout}/${user.email}`;
    APIDefaultHeader["authorization"] = `Bearer ${user.token}`;

    fetch(url, {
      method: APIMethodType.get,
      headers: APIDefaultHeader,
    })
      .then((response) => {
        if (!response.ok) throw new Error(ErrorMessage.common.common);
        return response.json();
      })
      .then(() => {
        setTimeout(() => {
          dispatch(logoutSuccess());
          dispatch(toggleSpinner(false));
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          dispatch(toggleErrorMessage(error.message));
          dispatch(toggleSpinner(false));
        }, 1000);
      });
  };
};

export const register = (postData) => {
  return (dispatch) => {
    dispatch(toggleSpinner(true));
    const url = `${APIRouter.user.signup}`;

    fetch(url, {
      method: APIMethodType.post,
      headers: APIDefaultHeader,
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) throw new Error(ErrorMessage.common.common);
        return response.json();
      })
      .then((jsonData) => {
        setTimeout(() => {
          dispatch(registerSuccess(jsonData.data));
          dispatch(toggleFormErrorMessage());
          dispatch(toggleSpinner(false));
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          dispatch(toggleFormErrorMessage(error.message, actionWhere.signup));
          dispatch(toggleSpinner(false));
        }, 1000);
      });
  };
};
