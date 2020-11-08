import { SET_INIT_ACTION } from "../action/initActions";

export default function (state, action) {
  switch (action.type) {
    case SET_INIT_ACTION:
      return {
        ...state,
        isInit: action.payload,
      };
    default:
      return state;
  }
}
