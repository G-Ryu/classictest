import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../actions";
import { RootState } from "../store/index";

function Nav() {
  const dispatch = useDispatch();
  // const modalOpen = useSelector(
  //   (state: RootState) => state.modalReducer.isModal
  // );
  const isLogin = useSelector(
    (state: RootState) => state.userInfoReducer.userInfo.isLogin
  );

  function modalOpen() {
    dispatch(setModalOpen(true));
  }

  return (
    <>
      {isLogin ? (
        <button onClick={modalOpen}>마페</button>
      ) : (
        <button onClick={modalOpen}>로긴</button>
      )}
    </>
  );
}

export default Nav;
