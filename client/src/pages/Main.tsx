import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Music from "../components/Music";
import Create from "../components/Create";
import { music } from "../types";
import { RootState } from "../store/index";
import SearchBar from "../components/SearchBar";

function Main() {
  const [data, setData] = useState<music[] | null>(null);
  const [isCreate, setIsCreate] = useState(false);

  const userInfo = useSelector(
    (state: RootState) => state.userInfoReducer.userInfo
  );

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_SERVER}/music/read`,
    }).then((res) => {
      setData(res.data.data);
    });
  }, []);

  return (
    <div>
      <h2>음악 목록</h2>
      <SearchBar setData={setData}/>
      {userInfo.isLogin ? (
        !isCreate ? (
          <div>
            <button
              onClick={() => {
                setIsCreate(true);
              }}
            >
              음악 등록
            </button>
          </div>
        ) : null
      ) : null}
      {isCreate ? (
        <Create setIsCreate={setIsCreate} data={data} setData={setData} />
      ) : null}

      {data ? (
        data.map((music, idx) => {
          return (
            <Music key={idx} data={data} music={music} setData={setData} />
          );
        })
      ) : (
        <div>로딩 중</div>
      )}
    </div>
  );
}

export default Main;
