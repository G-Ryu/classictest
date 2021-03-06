import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setModalOpen, setUserInfo } from "../actions";

interface signUpProp {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function Signup({ setIsSignUp }: signUpProp) {
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDuplId, setIsDuplId] = useState(false);
  const [isDuplNN, setIsDuplNN] = useState(false);

  const signupHandler = async () => {
    const formTag = document.getElementById("formData") as HTMLFormElement;
    const form = new FormData(formTag);

    await axios({
      url: `${process.env.REACT_APP_SERVER}/user/signup`,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: form,
    }).then(async () => {
      const id = document.getElementById("userId") as HTMLInputElement;
      const pw = document.getElementById("password") as HTMLInputElement;

      await axios({
        url: `${process.env.REACT_APP_SERVER}/user/login`,
        method: "POST",
        data: {
          userId: id.value,
          password: pw.value,
        },
      }).then((res) => {
        const userInfo = Object.assign({ isLogin: true }, res.data.data);
        dispatch(setUserInfo(userInfo));
      });
    });
  };

  const duplCheck = async (field: string) => {
    const id = document.getElementById("userId") as HTMLInputElement;
    const nick = document.getElementById("nickName") as HTMLInputElement;

    const value = field === "userId" ? id.value : nick.value;
    await axios({
      url: `${process.env.REACT_APP_SERVER}/user/exist`,
      params: {
        [field]: value,
      },
    })
      .then(() => {
        if (field === "userId") {
          setIsDuplId(true);
        } else {
          setIsDuplNN(true);
        }
      })
      .catch(() => {
        if (field === "userId") {
          setIsDuplId(false);
        } else {
          setIsDuplNN(false);
        }
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
          <CenterContent>
            <h2>????????????</h2>
          </CenterContent>
          <form id="formData">
            <div>
              <div>?????????</div>
              <input
                className="short"
                name="userId"
                id="userId"
                onFocus={() => {
                  setIsDuplId(false);
                  setIsSubmit(false);
                }}
              ></input>
              <button
                onClick={() => {
                  duplCheck("userId");
                }}
              >
                ?????? ??????
              </button>
              {isDuplId ? <span>?????? ??????</span> : <span>?????? ?????????</span>}
            </div>
            <div>
              <div>?????????</div>
              <input
                className="short"
                name="nickName"
                id="nickName"
                onFocus={() => {
                  setIsDuplNN(false);
                  setIsSubmit(false);
                }}
              ></input>
              <button
                onClick={() => {
                  duplCheck("nickName");
                }}
              >
                ?????? ??????
              </button>
              {isDuplNN ? <span>?????? ??????</span> : <span>?????? ?????????</span>}
            </div>
            <div>
              <div>????????????</div>
              <input name="password" type="password" id="password"></input>
            </div>
            <div>
              <div>????????? ??????</div>
              <input
                type="file"
                name="profileImage"
                className="profileImage"
                id="profileImage"
                style={{ display: "none" }}
                required
              ></input>
              <label className="file_label" htmlFor="profileImage">
                ?????? ??????
              </label>
            </div>
          </form>
          <CenterContent>
            {isSubmit ? <div>?????? ????????? ????????????</div> : null}
            <div className="ttal">
              {isDuplId && isDuplNN ? (
                <button onClick={signupHandler}>????????????</button>
              ) : (
                <button
                  onClick={() => {
                    setIsSubmit(true);
                  }}
                >
                  ????????????
                </button>
              )}
              <button
                onClick={() => {
                  setIsSignUp(false);
                }}
              >
                ????????????
              </button>
            </div>
          </CenterContent>
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
    content: "????????? ???????????????";
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
