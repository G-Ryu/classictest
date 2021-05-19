import { SET_USERINFO } from "../actions/index";
import initialState from "./initialState";

const userInfoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USERINFO:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

export default userInfoReducer;
