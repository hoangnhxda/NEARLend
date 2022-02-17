import { fomatBalanceWithDecimal } from "../utils";
import { tokenFomat } from "../utils/token";
import { DownOutlined } from "@ant-design/icons";
import globalState from "../state/globalStore";
import { Downgraded, useHookstate } from "@hookstate/core";
import { useEffect, useState } from "react";
import IncreaseCollateral from "./Popup/IncreaseCollateral";
import { getUsdtOfToken } from "../services";

export default function PortfolioDepositItem({ supplied, borrowed }: any) {
  const { contract, wallet, usdTokens, userBalance }: any =
    useHookstate<any>(globalState);
  const userBalanceState = userBalance.attach(Downgraded).get();
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowIncrease, setIsShowIncrease] = useState(false);
  const decimals = tokenFomat[supplied.token_id].decimals;
  const icon = tokenFomat[supplied.token_id].icon;
  const symbol = tokenFomat[supplied.token_id].symbol;
  const depositedBalance = supplied?.balance ?? 0;
  const borrowedBalance =
    borrowed?.find((f: any) => f.token_id === supplied.token_id)?.balance ?? 0;
  const available =
    borrowedBalance !== 0 ? +depositedBalance - +borrowedBalance : 0;
  const token = {
    symbol,
    icon,
    decimals,
  };
  console.log("userBalanceState", userBalanceState);
  const collateral =
    userBalanceState?.collateral?.find(
      (item: any) => item.token_id === supplied.token_id
    )?.balance ?? 0;
  console.log("collateral", collateral);

  const _handleToggle = (e: any) => {
    e.preventDefault();
    setIsShowDetail((prev) => !prev);
  };

  const _innerClick = (e: any) => {
    e.preventDefault();
    // setIsShowDetail((prev) => true);
  };

  const _handleToggleIncrease = () => {
    console.log("togle");
    setIsShowIncrease(!isShowIncrease);
  };

  const _handleIncrease = (e: any) => {
    e.preventDefault();
  };

  const _handleDecrease = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="wrap-info active">
      {isShowIncrease && (
        <IncreaseCollateral
          togglePopup={_handleToggleIncrease}
          listCollateral={userBalanceState?.collateral}
          token={supplied}
        />
      )}
      <div className="label label__token" onClick={_handleToggle}>
        <p className={`arrow-down ${isShowDetail ? "active" : ""}`}>
          <DownOutlined />
        </p>
        <div className="label__token-mini token__logo">
          <img className="icon" src={icon} width={30} height={30} alt="Logo" />
          <div className="token__price">
            <p className="token_name">{symbol}</p>
            <p className="color-space-gray">$23</p>
          </div>
        </div>
        <p className="label__token-mini">
          {(Number(supplied.apr) * 100).toFixed(3)}%
        </p>
        <button className="button-basic">Withdraw</button>
      </div>
      {isShowDetail && (
        <div className="label label__token__detail">
          <div className="token__detail__row">
            <p className="title">Deposited:</p>
            <p className="label__token-mini">
              {fomatBalanceWithDecimal(depositedBalance, decimals)}
            </p>
          </div>
          <div className="token__detail__row">
            <p className="title">Colleteral:</p>
            <p className="label__token-mini">
              {fomatBalanceWithDecimal(collateral, decimals)}
            </p>
            <button
              className="btn-plus button-basic"
              onClick={_handleToggleIncrease}
            ></button>
            <button
              className="btn-minus button-basic"
              onClick={_handleDecrease}
            ></button>
          </div>

          <div className="token__detail__row">
            <p className="title">Available:</p>
            <p className="label__token-mini">
              {fomatBalanceWithDecimal(available, decimals)}
            </p>
          </div>

          <div className="token__detail__row">
            <p className="title">Earned:</p>
            <p className="label__token-mini">
              {fomatBalanceWithDecimal(0, decimals)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
