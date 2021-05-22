import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setModalOpen } from "../actions";

interface signUpProp {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function Signup({ setIsSignUp }: signUpProp) {
  const dispatch = useDispatch();

  const signupHandler = async () => {
    const formTag = document.getElementById("formData") as HTMLFormElement;
    const form = new FormData(formTag);

    await axios({
      url: `${process.env.REACT_APP_SERVER}/user/signup`,
      method: "POST",
      data: form,
    });
  };

  return (
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
          <h2>회원가입</h2>
          <form id="formData">
            <div>
              <div>아이디</div>
              <input name="userId"></input>
            </div>
            <div>
              <div>비밀번호</div>
              <input name="password"></input>
            </div>
            <div>
              <div>비밀번호 확인</div>
              <input></input>
            </div>
            <div>
              <div>프로필 사진</div>
              <input
                type="file"
                name="profileImage"
                className="profileImage"
              ></input>
            </div>

            <div className="ttal">
              <button onClick={signupHandler}>가입하기</button>
              <button
                onClick={() => {
                  setIsSignUp(false);
                }}
              >
                뒤로가기
              </button>
            </div>
          </form>
        </ModalContent>
      </ModalWrapper>
    </Background>
  );
}

export default Signup;

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
  height: 350px;
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
  text-align: center;
  color: #141414;
  overflow: auto;
  z-index: 5;
  & .profileImage {
    padding-top: 20px;
  }
  
  & .ttal {
    padding-top: 20px;
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
