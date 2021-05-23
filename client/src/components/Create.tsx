import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setUserInfo } from "../actions";
import { RootState } from "../store/index";
import { music } from "../types";
import { refresh } from "../utils/verification";
import initialState from "../reducers/initialState";

interface props {
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  data: music[] | null;
  setData: React.Dispatch<React.SetStateAction<music[] | null>>;
}

function Create({ setIsCreate, data, setData }: props) {
  const [isErr, setIsErr] = useState(false);
  const dispatch = useDispatch();

  const userInfo = useSelector(
    (state: RootState) => state.userInfoReducer.userInfo
  );

  const createHandler = async () => {
    const file = document.getElementById("filePath") as HTMLInputElement;

    if (!file.value) {
      setIsErr(true);
    } else {
      const formTag = document.getElementById("formData") as HTMLFormElement;
      const form = new FormData(formTag);

      await axios({
        url: `${process.env.REACT_APP_SERVER}/music/create`,
        data: form,
        method: "POST",
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
        .then((res) => {
          if (data) {
            setData([...data, res.data.data]);
          } else {
            setData([res.data.data]);
          }
          setIsCreate(false);
        })
        .catch(async (err) => {
          if (err.response && err.response.status === 401) {
            const token = await refresh();
            console.log(token);
            // if (token) {
            //   const refreshInfo = Object.assign({}, userInfo, {
            //     accessToken: token,
            //   });
            //   dispatch(setUserInfo(refreshInfo));
            //   createHandler();
            // } else {
            //   dispatch(setUserInfo(initialState.userInfo));
            //   setIsCreate(false);
            // }
          }
        });
    }
  };

  return (
    <Wrapper>
      <form id="formData">
        <div>음악가</div>
        <input type="text" name="singer"></input>
        <div>트랙명</div>
        <input type="text" name="track"></input>
        <div>앨범명</div>
        <input type="text" name="album"></input>
        <div>포스터</div>
        <input type="file" name="poster" id="poster" accept="image/*"></input>
        <div>음악 파일</div>
        <input
          type="file"
          name="filePath"
          id="filePath"
          accept="audio/*"
          onClick={() => {
            setIsErr(false);
          }}
        ></input>
      </form>
      <button onClick={createHandler}>등록</button>
      <button
        onClick={() => {
          setIsCreate(false);
        }}
      >
        취소
      </button>
      {isErr ? <div>음악 파일을 등록해주십시오</div> : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid red;
  & button {
    margin-top: 20px;
  }
`;

export default Create;
