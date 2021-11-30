import APIRouter from "../../common/api-router";
import { APIMethodType, APIDefaultHeader } from "../../common/api-config";
import ErrorMessage from "../../common/error-message";

import { toggleSpinner, toggleErrorMessage } from "./common";

export const todayAction = {
  fetchTodaySuccess: "FETCH_TODAY_SUCCESS",
  addPostCount: "ADD_POST_COUNT",
};

const fetchTodaySuccess = (today) => {
  return {
    type: todayAction.fetchTodaySuccess,
    payload: today,
  };
};

const addPostCount = (today) => {
  return {
    type: todayAction.addPostCount,
  };
};

export const fetchToday = () => {
  return (dispatch) => {
    dispatch(toggleSpinner(true));
    dispatch(toggleErrorMessage());

    fetch(APIRouter.calendar.today, {
      method: APIMethodType.get,
      headers: APIDefaultHeader,
    })
      .then((response) => {
        if (!response.ok) throw new Error(ErrorMessage.common.common);

        return response.json();
      })
      .then((jsonData) => {
        setTimeout(() => {
          dispatch(fetchTodaySuccess(jsonData.data));
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

export const changePostCount = () => {
  return (dispatch) => {
    dispatch(addPostCount());
  };
};
