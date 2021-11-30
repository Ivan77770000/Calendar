import { commonAction } from "../actions/common";

const defaultState = {
  showSpinner: false,
  errorMessage: null,
  formErrorMessage: null,
  where: null,
};

const commonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case commonAction.showSpinner:
      return {
        ...state,
        showSpinner: true,
      };
    case commonAction.hideSpinner:
      return {
        ...state,
        showSpinner: false,
      };
    case commonAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case commonAction.cleanErrorMessage:
      return {
        ...state,
        errorMessage: null,
      };
    case commonAction.setFormErrorMessage:
      return {
        ...state,
        formErrorMessage: action.payload.message,
        where: action.payload.where,
      };
    case commonAction.cleanFormErrorMessage:
      return {
        ...state,
        formErrorMessage: null,
        where: null,
      };
    default:
      return state;
  }
};

export default commonReducer;
