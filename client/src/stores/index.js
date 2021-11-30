import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import commonReducer from "./reducers/common";
import todayReducer from "./reducers/today";
import authReducer from "./reducers/auth";

const rootReducer = combineReducers({
  common: commonReducer,
  today: todayReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
