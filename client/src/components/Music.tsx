import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store/index";
import { music } from "../types";
import MusicUpdate from "./MusicUpdate";

interface props {
  data: music[];
  setData: React.Dispatch<React.SetStateAction<music[] | null>>;
}

function Music({ data, setData }: props) {
  const [isUpdate, setIsUpdate] = useState(false);
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
    }).then(() => {
      const cgData = data.filter((music) => music.id !== musicId);
      setData(cgData);
    });
  };

  return data.length === 0 ? (
    <div>등록된 음악이 없습니다</div>
  ) : (
    <div>
      {data.map((music, idx) => {
        return (
          <div key={idx}>
            <FloatBox>
              <ImageBox>
                <img src={music.poster} width="100px" height="100px" />
              </ImageBox>
              <TextBox>
                <div>음악가 {music.singer}</div>
                <div>트랙명 {music.track}</div>
                <div>앨범명 {music.album}</div>
              </TextBox>
              <ButtonBox>
                {music.uploader.nickName === userInfo.nickName ? (
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
      })}
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
