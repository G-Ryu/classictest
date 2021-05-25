import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { music } from "../types";
import { RootState } from "../store/index";

interface props {
  setData: React.Dispatch<React.SetStateAction<music[] | null>>;
}

function SearchBar({ setData }: props) {
  const [key, setKey] = useState("singer");

  const searchHandler = () => {
    const searchInput = document.getElementById("search") as HTMLInputElement;
    const value = searchInput.value;

    axios({
      url: `${process.env.REACT_APP_SERVER}/music/search`,
      params: {
        [key]: value,
      },
    }).then((res) => {
      setData(res.data.data);
      window.location.reload();
    });
  };

  return (
    <div>
      <select
        onChange={(e) => {
          setKey(e.target.value);
        }}
      >
        <option value="singer">음악가</option>
        <option value="track">트랙명</option>
      </select>
      <input placeholder="검색어" id="search" />
      <button onClick={searchHandler}>검색</button>
    </div>
  );
}

export default SearchBar;
