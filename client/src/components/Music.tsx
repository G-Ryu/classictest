import React from "react";
import styled from "styled-components";
import { music } from "../types";

interface props {
  data: music[];
}

function Music({ data }: props) {
  return (
    <>
      <div>'hi'</div>
      {data.map((music, idx) => {
        return <div>{music.singer}</div>;
      })}
    </>
  );
}

export default Music;
