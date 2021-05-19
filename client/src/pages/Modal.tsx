import React from "react";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import Mypage from "../components/Mypage";
import { RootState } from "../store/index";

function Modal() {
  const modalOpen = useSelector(
    (state: RootState) => state.modalReducer.isModal
  );
  const isLogin = useSelector(
    (state: RootState) => state.userInfoReducer.userInfo.isLogin
  );

  return modalOpen ? isLogin ? <Mypage /> : <Login /> : null;
}

export default Modal;
