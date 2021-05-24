import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setModalOpen, setUserInfo } from "../actions";
import initialState from "../reducers/initialState";
import { RootState } from "../store/index";

function InfoUpdate() {
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDuplNN, setIsDuplNN] = useState(false);
  const [isSignout, setIsSignout] = useState(false);

  const userInfo = useSelector(
    (state: RootState) => state.userInfoReducer.userInfo
  );

  const updateHandler = async () => {
    const formTag = document.getElementById("formData") as HTMLFormElement;
    const form = new FormData(formTag);

    await axios({
      url: `${process.env.REACT_APP_SERVER}/user/update`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
      withCredentials: true,
      data: form,
    })
      .then((res) => {
        const nickName = res.data.data.nickName;
        const profileImage = res.data.data.profileImage;
        const cgIF = Object.assign({}, userInfo, { nickName, profileImage });

        if (res.data.accessToken) {
          cgIF["accessToken"] = res.data.accessToken;
        }

        dispatch(setUserInfo(cgIF));
        dispatch(setModalOpen(false));
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          dispatch(setUserInfo(initialState.userInfo));
          dispatch(setModalOpen(false));
        }
      });
  };

  const duplCheck = async () => {
    const nick = document.getElementById("nickName") as HTMLInputElement;
    const value = nick.value;

    await axios({
      url: `${process.env.REACT_APP_SERVER}/user/exist`,
      params: {
        nickName: value,
      },
    })
      .then(() => {
        setIsDuplNN(true);
      })
      .catch(() => {
        setIsDuplNN(false);
      });
  };

  const signoutHandler = async () => {
    await axios({
      url: `${process.env.REACT_APP_SERVER}/user/signout`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
      withCredentials: true,
    })
      .then(() => {
        dispatch(setUserInfo(initialState.userInfo));
        dispatch(setModalOpen(false));
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          dispatch(setUserInfo(initialState.userInfo));
          dispatch(setModalOpen(false));
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
            <h2>마이페이지</h2>
          </CenterContent>
          <form id="formData">
            <div>
              <div>아이디</div>
              <div>{userInfo.userId}</div>
            </div>
            <div>
              <div>닉네임</div>
              <input
                className="short"
                name="nickName"
                id="nickName"
                onFocus={() => {
                  setIsDuplNN(false);
                  setIsSubmit(false);
                }}
              ></input>
              <button onClick={duplCheck}>중복 검사</button>
              {isDuplNN ? <span>사용 가능</span> : <span>사용 불가능</span>}
            </div>
            <div>
              <div>비밀번호 변경</div>
              <input name="password" type="password" id="password"></input>
            </div>
            <div>
              <div>프로필 사진</div>
              <input
                type="file"
                name="profileImage"
                className="profileImage"
                id="profileImage"
                style={{ display: "none" }}
                required
              ></input>
              <label className="file_label" htmlFor="profileImage">
                사진 선택
              </label>
            </div>
          </form>
          <CenterContent>
            {isSubmit ? <div>중복 검사를 해주세요</div> : null}
            <div className="ttal">
              {isDuplNN ? (
                <button onClick={updateHandler}>정보수정</button>
              ) : (
                <button
                  onClick={() => {
                    const nick = document.getElementById(
                      "nickName"
                    ) as HTMLInputElement;

                    if (nick.value) {
                      setIsSubmit(true);
                    } else {
                      updateHandler();
                    }
                  }}
                >
                  정보수정
                </button>
              )}
              <button
                onClick={() => {
                  setIsSignout(true);
                }}
              >
                회원탈퇴
              </button>
            </div>
          </CenterContent>
          {isSignout ? (
            <CenterContent>
              <div>모든 정보가 삭제됩니다</div>
              <div>정말 탈퇴하시겠습니까?</div>
              <div>
                <button onClick={signoutHandler}>예</button>
              </div>
            </CenterContent>
          ) : null}
        </ModalContent>
      </ModalWrapper>
    </Background>
  );
}

export default InfoUpdate;

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
