import { useEffect, useState } from "react";
import iconClose from "../../images/icon-close.png";
import { InputNumber, Slider } from "antd";
import { shortBalance, shortName, totalBalance } from "../../utils";
import { useState as hookState, Downgraded } from "@hookstate/core";
import globalState from "../../state/globalStore";
import { tokenFomat } from "../../utils/token";
import { handleDeposit } from "../../services/connect";
import { Switch } from "antd";
import { getUsdtOfToken } from "../../services";

type Props = {
  togglePopup: () => void;
  listCollateral: any;
  token: any;
};
const IncreaseCollateral = ({ togglePopup, listCollateral, token }: Props) => {
  const { contract, wallet, usdTokens, userBalance }: any =
    hookState<any>(globalState);
  const contractState = contract.attach(Downgraded).get();
  const walletState = wallet.attach(Downgraded).get();
  const usdTokensState = usdTokens.attach(Downgraded).get();
  const userBalanceState = userBalance.attach(Downgraded).get();
  const [amountToken, setAmountToken] = useState(0);
  const [amountTokenPercent, setAmountTokenPercent] = useState(0);
  const [limitToken, setLimitToken] = useState(0);
  const [usd, setUsd] = useState(0);
  const [shares, setShares] = useState(0);
  const [error, setError] = useState("");
  const [isCollateral, setIsCollateral] = useState(false);

  const collateral = userBalanceState?.collateral;
  // console.log("listCollateral in popup", listCollateral);

  const depositBalance = token?.balance;

  // console.log("usd", usd);
  // console.log("usdTokensState", usdTokensState);
  const tokenId = token?.tokenId || token?.token_id;
  const tokenConfig = token && tokenFomat[tokenId];
  const icon = tokenConfig && tokenConfig?.icon;
  const tokenName = tokenConfig && tokenConfig?.name;
  const tokenDecimals = tokenConfig && tokenConfig?.decimals;
  const tokenSymbol = tokenConfig && tokenConfig?.symbol;
  const priceUsd = (usdTokensState && usdTokensState[tokenName]?.usd) ?? 23;

  const marks = {
    0: "0%",
    25: "25%",
    50: "50%",
    75: "75%",
    100: "100%",
  };

  function _onChangeCollateral(checked: boolean) {
    setIsCollateral(checked);
  }

  // should debounce
  function formatter(value: any) {
    return `${value.toString()}%`;
  }

  const _handleIncreaseCollateral = () => {
    if (depositBalance === 0) {
      return setError(`You need to Deposit for this Token`);
    } else if (amountToken === 0 || amountToken === null) {
      return setError(`You have to Enter amount of Tokens`);
    } else if (amountToken > limitToken) {
      return setError(`Allow equal or lower value that you deposited`);
    }
    // return handleDeposit(token, amountToken, contractState, isCollateral);
  };

  const onChange = (e: any) => {
    setAmountToken(e);
    setAmountTokenPercent((e / limitToken) * 100);
  };

  const sliderOnChange = (e: any) => {
    setAmountToken((e / 100) * limitToken);
    setAmountTokenPercent(e);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const htmlEle = window.document.getElementsByTagName("html")[0];
      htmlEle.classList.add("popup-open");
    }
    return () => {
      const htmlEle = window.document.getElementsByTagName("html")[0];
      htmlEle.classList.remove("popup-open");
      return;
    };
  }, [limitToken]);

  useEffect(() => {
    console.log("collateralcollateral", collateral);
    console.log("usdTokensStateusdTokensState", usdTokensState);

    const collateral__To__USDT = totalBalance(collateral, usdTokensState);
    console.log("collateralTo__USDT", collateral__To__USDT);
  }, [collateral, userBalanceState]);

  useEffect(() => {
    const fomatDepositBalance = depositBalance / (10 **tokenDecimals);
    setLimitToken(fomatDepositBalance);
    async function initGetUSDPrice() {
      const res = await getUsdtOfToken();
      if (res !== null) {
        usdTokens.set(res);
      }
    }
    const init = async () => await initGetUSDPrice();
    const interval = setInterval(init, 10000);

    //clean component
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="wrap-popup">
      <div className="popup">
        <p className="icon-close" onClick={togglePopup}>
          <img alt="icon-close" src={iconClose} width={12} height={12} />
        </p>
        <div className="Ocean">
          <svg className="Wave" viewBox="0 0 12960 1120">
            <path d="M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z">
              <animate
                dur="5s"
                repeatCount="indefinite"
                attributeName="d"
                values="
              M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z;
              M9720,0C8100,0,8100,319,6480,319S4860,0,3240,0,1620,320,0,320v800H12960V320C11340,320,11340,0,9720,0Z;
              M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z
            "
              />
            </path>
          </svg>
        </div>
        <h4 className="title">Increase</h4>
        <p className="icon">
          <img className="icon" src={icon} width={54} height={54} alt="Logo" />
        </p>
        <p className="icon-name">{tokenName}</p>
        <p className="value-percent">0.03%</p>
        <div className="bg-white position-relative wrap-white">
          <div className="info pad-side-14">
            <p>
              Available:{" "}
              <span className="popup-available-price">
                {shortBalance(limitToken)}
              </span>
              <br />
              ($
              {/* {shortBalance(+limitToken * priceUsd)}) */}
            </p>
            <p className="tar">
              1 {tokenSymbol} = ${shortBalance(priceUsd)}
            </p>
          </div>
          <div className="pad-side-14">
            <InputNumber
              className="input-number"
              defaultValue={0}
              type="number"
              // formatter={(value:any) =>
              //   `${shortBalance(value)}`
              // }
              value={amountToken}
              onChange={onChange}
            />
          </div>
          <div
            id="slider-range"
            className="position-relative slider-range bg-white"
          >
            <Slider
              marks={marks}
              step={1}
              tipFormatter={formatter}
              getTooltipPopupContainer={(): any =>
                document?.getElementById("slider-range")
              }
              value={amountTokenPercent || 0}
              onChange={sliderOnChange}
            />
          </div>

          <p className="position-relative total bg-white">
            Total Supply <span style={{ fontSize: 22 }}>&#8771;</span> $
            {shortBalance(amountToken * priceUsd)}
          </p>
          <p className="position-relative rates-title fwb bg-white pad-side-14">
            Supply Rates
          </p>
          <div className="position-relative flex bg-white pad-side-14">
            <div className="left">Deposit APY</div>
            <div className="right fwb">0.028533093636258104</div>
          </div>
          <div className="position-relative flex bg-white pad-side-14">
            <div className="left">Collateral Factor</div>
            <div className="right fwb">60%</div>
          </div>
          <div className="position-relative flex bg-white pad-side-14">
            <div className="left">Use as Collateral</div>
            <div className="right fwb">
              <label className="switch">
                <Switch defaultChecked={false} onChange={_onChangeCollateral} />
              </label>
            </div>
          </div>
          {error && <p className="text-error">* {error}</p>}
          <button
            className="position-relative btn"
            onClick={_handleIncreaseCollateral}
          >
            Collateral
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncreaseCollateral;