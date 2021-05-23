import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setModalOpen, setUserInfo } from "../actions";
import initialState from "../reducers/initialState";
import { RootState } from "../store/index";
import InfoUpdate from "./InfoUpdate";

function Mypage() {
  const dispatch = useDispatch();
  const [isUpdate, setIsUpdate] = useState(false);

  const userInfo = useSelector(
    (state: RootState) => state.userInfoReducer.userInfo
  );

  const logoutHandler = async () => {
    await axios({
      url: `${process.env.REACT_APP_SERVER}/user/logout`,
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }).then(() => {
      dispatch(setUserInfo(initialState.userInfo));
      dispatch(setModalOpen(false));
    });
  };

  return isUpdate ? (
    <InfoUpdate />
  ) : (
    <Background
      onClick={() => {
        dispatch(setModalOpen(false));
      }}
    >
      <ModalWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalContent>
          <CenterContent>
            <h2>마이페이지</h2>
          </CenterContent>
          <img src={userInfo.profileImage} width="100px" />
          <div>아이디 {userInfo.userId}</div>
          <div>닉네임 {userInfo.nickName}</div>
          <CenterContent>
            <button
              onClick={() => {
                setIsUpdate(true);
              }}
            >
              정보수정
            </button>
            <button onClick={logoutHandler}>로그아웃</button>
          </CenterContent>
        </ModalContent>
      </ModalWrapper>
    </Background>
  );
}

export default Mypage;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.342);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const ModalWrapper = styled.div`
  width: 350px;
  height: 450px;
  padding-top: 20px;
  background: #fff;
  color: #000;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  z-index: 3;
  position: relative;
`;

const ModalContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  text-align: left;
  color: #141414;
  overflow: auto;
  z-index: 5;

  & .file_label {
    position: relative;
    display: block;
    width: 99%;
    height: 45px;
    margin: 10px 0;
    background: #ffffff;
    border: 1px solid #dfdfdf;
    color: #666666;
    border-radius: 15px;
    line-height: 45px;
    text-align: center;
    text-transform: none;
    cursor: pointer;
    transition: all 0.3s;
  }
  & .profileImage:valid ~ .file_label {
    border-color: #39b54a;
    background: #39b54a;
    color: #39b54a;
  }
  & .profileImage:valid ~ .file_label:before {
    content: "업로드 되었습니다";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    color: #ffffff;
    line-height: 45px;
  }
`;

const CenterContent = styled.div`
  text-align: center;
  & .ttal {
    padding-top: 20px;
    margin-top: auto;
    margin-bottom: auto;

    & button {
      item-align: center;
      width: 80px;
      height: 35px;
      border-radius: 10px;
      outline: none;
      border: 0.5px solid #9e9e9e;
      cursor: pointer;
      background: #e7e7e7;
    }
  }
`;
