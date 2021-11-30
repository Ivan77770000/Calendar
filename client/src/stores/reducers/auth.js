import { authAction } from "../actions/auth";

const defaultState = {
  user: {
    id: null,
    email: null,
    token: null,
  },
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case authAction.loginSuccess:
      return {
        ...state,
        user: action.payload,
      };
    case authAction.logoutSuccess:
      return defaultState;
    case authAction.registerSuccess:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
