export const commonAction = {
  showSpinner: "SHOW_SPINNER",
  hideSpinner: "HIDE_SPINNER",
  setErrorMessage: "SET_ERROR_MESSAGE",
  cleanErrorMessage: "CLEAN_ERROR_MESSAGE",
  setFormErrorMessage: "SET_FORM_ERROR_MESSAGE",
  cleanFormErrorMessage: "CLEAN_FORM_ERROR_MESSAGE",
};

const showSpinner = () => {
  return {
    type: commonAction.showSpinner,
  };
};

const hideSpinner = () => {
  return {
    type: commonAction.hideSpinner,
  };
};

const setErrorMessage = (errorMessage) => {
  return {
    type: commonAction.setErrorMessage,
    payload: errorMessage,
  };
};

const cleanErrorMessage = () => {
  return {
    type: commonAction.cleanErrorMessage,
  };
};

const setFormErrorMessage = (errorMessage, where) => {
  return {
    type: commonAction.setFormErrorMessage,
    payload: {
      message: errorMessage,
      where,
    },
  };
};

const cleanFormErrorMessage = () => {
  return {
    type: commonAction.cleanFormErrorMessage,
  };
};

export const toggleSpinner = (flag) => {
  return (dispatch) => {
    if (flag) {
      dispatch(showSpinner());
    } else {
      dispatch(hideSpinner());
    }
  };
};

export const toggleErrorMessage = (errorMessage = null) => {
  return (dispatch) => {
    if (errorMessage) {
      dispatch(setErrorMessage(errorMessage));
    } else {
      dispatch(cleanErrorMessage());
    }
  };
};

export const toggleFormErrorMessage = (errorMessage = null, where = null) => {
  return (dispatch) => {
    if (errorMessage) {
      dispatch(setFormErrorMessage(errorMessage, where));
    } else {
      dispatch(cleanFormErrorMessage());
    }
  };
};
