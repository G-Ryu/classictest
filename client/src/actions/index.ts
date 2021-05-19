import { userInfo } from "../types";
export const SET_MODAL_OPEN = "SET_MODAL_OPEN";
export const SET_LOGIN = "SET_LOGIN";
export const SET_USERINFO = "SET_USERINFO";

export const setModalOpen = (isModal: boolean) => {
  return {
    type: SET_MODAL_OPEN,
    payload: isModal,
  };
};

export const setUserInfo = (userInfo: userInfo) => {
  return {
    type: SET_USERINFO,
    payload: userInfo,
  };
};
