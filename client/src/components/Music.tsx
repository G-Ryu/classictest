import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setUserInfo } from "../actions";
import { RootState } from "../store/index";
import { music } from "../types";
import MusicUpdate from "./MusicUpdate";
import initialState from "../reducers/initialState";

interface props {
  data: music[];
  music: music;
  setData: React.Dispatch<React.SetStateAction<music[] | null>>;
}

function Music({ data, music, setData }: props) {
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector(
    (state: RootState) => state.userInfoReducer.userInfo
  );

  const deleteHandler = (musicId: number) => {
    axios({
      url: `${process.env.REACT_APP_SERVER}/music/delete`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
      params: {
        musicId,
      },
      withCredentials: true,
    })
      .then(() => {
        const cgData = data.filter((music) => music.id !== musicId);
        setData(cgData);
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          dispatch(setUserInfo(initialState.userInfo));
        }
      });
  };

  return (
    <div>
      <FloatBox>
        <ImageBox>
          <img src={music.poster} width="100px" height="100px" />
        </ImageBox>
        <TextBox>
          <div>음악가 {music.singer}</div>
          <div>트랙명 {music.track}</div>
          <div>앨범명 {music.album}</div>
          <audio controls src={music.filePath} />
        </TextBox>
        <ButtonBox>
          {music.uploader.userId === userInfo.userId ? (
            <>
              <button
                onClick={() => {
                  setIsUpdate(true);
                }}
              >
                수정
              </button>
              <button
                onClick={() => {
                  deleteHandler(music.id);
                }}
              >
                삭제
              </button>
            </>
          ) : null}
        </ButtonBox>
      </FloatBox>
      <div>
        {isUpdate ? (
          <MusicUpdate
            setIsUpdate={setIsUpdate}
            target={music}
            data={data}
            setData={setData}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Music;

const FloatBox = styled.div`
  overflow: hidden;
`;

const ImageBox = styled.div`
  float: left;
  margin-right: 10px;
`;

const TextBox = styled.div`
  float: left;
`;

const ButtonBox = styled.div`
  float: right;
`;
