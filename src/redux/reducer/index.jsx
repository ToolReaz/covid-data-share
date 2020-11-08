import initReducers from "./initReducers";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  init: initReducers,
});

export default rootReducer;
