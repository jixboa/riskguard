import authReducer from "./authReducer";
import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import indicatorReducer from "./indicatorReducer";
import scoreReducer from "./scoreReducer";
import itemReducer from "./itemReducer";
import indProfilerReducer from "./indProfilerReducer";
import corpProfilerReducer from "./copProfilerReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  indicators: indicatorReducer,
  scores: scoreReducer,
  items: itemReducer,
  indprofiles: indProfilerReducer,
  corpprofiles: corpProfilerReducer,
});

export default rootReducer;
