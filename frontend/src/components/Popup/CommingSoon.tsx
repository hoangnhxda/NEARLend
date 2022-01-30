import { useEffect, useState } from "react";
import iconShib from "../../images/icon-shib.png";
import iconClose from "../../images/icon-close.png";
import { InputNumber, Slider } from "antd";
import { shortName } from "../../utils";
import { useState as hookState, Downgraded } from "@hookstate/core";
import globalState from "../../state/globalStore";
import { tokenFomat } from "../../utils/token";

type Props = {
  setTurnOff: Function;
  tokenId?: string;
  token?: any;
};
const CommingSoon = ({ setTurnOff }: Props) => {
  const { contract, wallet }: any = hookState<any>(globalState);
  const _handleTurnOff = () => {
    setTurnOff();
  };

  return (
    <div className="wrap-popup">
      <div className="popup notification">
        <h4 className="title-notification">Comming Soon ! 💻 </h4>
        <button className="button-notification" onClick={_handleTurnOff}>Close</button>
      </div>
    </div>
  );
};

export default CommingSoon;
