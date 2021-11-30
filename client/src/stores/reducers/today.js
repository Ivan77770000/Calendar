import { todayAction } from "../actions/today";

const defaultState = {
  today: {
    year: null,
    month: null,
    day: null,
  },
  postCount: 0,
};

const todayReducer = (state = defaultState, action) => {
  switch (action.type) {
    case todayAction.fetchTodaySuccess:
      return {
        ...state,
        today: action.payload,
      };
    case todayAction.addPostCount:
      return {
        ...state,
        postCount: state.postCount + 1,
      };
    default:
      return state;
  }
};

export default todayReducer;
