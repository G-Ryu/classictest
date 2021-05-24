import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store/index";
import { music } from "../types";
import initialState from "../reducers/initialState";
import { setUserInfo } from "../actions";

interface props {
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  data: music[] | null;
  setData: React.Dispatch<React.SetStateAction<music[] | null>>;
  target: music;
}

function MusicUpdate({ setIsUpdate, target, data, setData }: props) {
  const dispatch = useDispatch();
  const userInfo = useSelector(
    (state: RootState) => state.userInfoReducer.userInfo
  );

  const updateHandler = async () => {
    const formTag = document.getElementById("formData") as HTMLFormElement;
    const form = new FormData(formTag);

    await axios({
      url: `${process.env.REACT_APP_SERVER}/music/update`,
      data: form,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
      .then((res) => {
        if (data) {
          const cgData = data.map((music) => {
            if (music.id !== target.id) {
              return music;
            } else {
              const cgMusic = Object.assign({}, res.data.data, {
                uploader: {
                  userId: music.uploader.userId,
                },
              });
              return cgMusic;
            }
          });
          setData(cgData);
          setIsUpdate(false);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          dispatch(setUserInfo(initialState.userInfo));
          setIsUpdate(false);
        }
      });
  };

  return (
    <Wrapper>
      <form id="formData">
        <div>음악가</div>
        <input
          type="text"
          name="musicId"
          defaultValue={target.id}
          style={{ display: "none" }}
        ></input>
        <input type="text" name="singer" placeholder={target.singer}></input>
        <div>트랙명</div>
        <input type="text" name="track" placeholder={target.track}></input>
        <div>앨범명</div>
        <input type="text" name="album" placeholder={target.album}></input>
        <div>포스터</div>
        <input type="file" name="poster" id="poster" accept="image/*"></input>
        <div>음악 파일</div>
        <input
          type="file"
          name="filePath"
          id="filePath"
          accept="audio/*"
        ></input>
      </form>
      <button onClick={updateHandler}>수정</button>
      <button
        onClick={() => {
          setIsUpdate(false);
        }}
      >
        취소
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid red;
  & button {
    margin-top: 20px;
  }
`;

export default MusicUpdate;
