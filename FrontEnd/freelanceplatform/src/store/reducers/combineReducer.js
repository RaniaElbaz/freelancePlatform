import { combineReducers } from "redux";
import userReducer from "./userDetails";

export default combineReducers({
  userDetails: userReducer
});
