import { combineReducers } from "redux";
import userReducer from "./userDetails";
import authReducer from "./auth";

export default combineReducers({
  user: authReducer,
  userDetails: userReducer
});
