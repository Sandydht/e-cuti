import { combineReducers } from "redux";
import pnsReducer from "./pnsReducer";

export default combineReducers({
  pns: pnsReducer
});