import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setModalOpen } from "../actions";
import { RootState } from "../store/index";

function Nav() {
  const dispatch = useDispatch();

  const userInfo = useSelector(
    (state: RootState) => state.userInfoReducer.userInfo
  );

  function modalOpen() {
    dispatch(setModalOpen(true));
  }

  return (
    <Navi>
      {userInfo.isLogin ? (
        <div>
          <div>
            <img src={userInfo.profileImage} width="150px" />
            <div>닉네임 {userInfo.nickName}</div>
            <button onClick={modalOpen}>마이페이지</button>
          </div>
        </div>
      ) : (
        <div>
          로그인이 필요합니다
          <button onClick={modalOpen}>로그인</button>
        </div>
      )}
    </Navi>
  );
}

const Navi = styled.div`
  & button {
    width: 120px;
    height: 50px;
    font-size: 20px;
  }
`;
export default Nav;
