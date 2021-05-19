import { SET_MODAL_OPEN } from "../actions/index";
import initialState from "./initialState";

const userInfoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MODAL_OPEN:
      return { ...state, isModal: action.payload };
    default:
      return state;
  }
};

export default userInfoReducer;
