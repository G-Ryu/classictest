import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../actions";
import Music from "../components/Music";
import { music } from "../types";

function Main() {
  const [data, setData] = useState<music[] | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    //서버에서 데이터 받아오기
  }, []);

  return (
    <div>
      <h2>Main</h2>
      {data ? <Music data={data} /> : null}
      <button
        onClick={() => {
          dispatch(setModalOpen(true));
        }}
      >
        모달오픈
      </button>
    </div>
  );
}

export default Main;
