import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setModalOpen } from "../actions";
import Signup from "./Signup";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  return isSignUp ? (
    <Signup setIsSignUp={setIsSignUp} />
  ) : (
    <Background
      onClick={(e) => {
        dispatch(setModalOpen(false));
      }}
    >
      <ModalWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalContent>
          <h2>로그인</h2>
          <div>
            <div>아이디</div>
            <input></input>
          </div>
          <div>
            <div>비밀번호</div>
            <input></input>
          </div>

          <div className="ttal">
            <button
              onClick={() => {
                setIsSignUp(true);
              }}
            >
              회원가입
            </button>
            <button>로그인</button>
          </div>
        </ModalContent>
      </ModalWrapper>
    </Background>
  );
}

export default Login;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.342);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const ModalWrapper = styled.div`
  width: 350px;
  height: 250px;
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
  align-items: center;
  color: #141414;
  overflow: auto;
  z-index: 4;
  & .ttal {
    margin-top: auto;
    margin-bottom: auto;

    & button {
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
