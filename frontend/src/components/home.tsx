/* eslint-disable jsx-a11y/iframe-has-title */
import { useEffect, useState } from "react";
import "../App.css";
import "../responsive.css";
import { useState as hookState, Downgraded } from "@hookstate/core";
import globalState from "../state/globalStore";
import {
  DepositPopup,
  BorrowPopup,
  RegistFirstTime,
  RequireLogin,
} from "./Popup";
import TokenList from "./token-list";

function Home() {
  const { contract, poolListToken, userBalance, isLogged }: any =
    hookState<any>(globalState);
  const contractState = contract.attach(Downgraded).get();
  const userBalanceState = userBalance.attach(Downgraded).get();
  const poolListTokenState = poolListToken.attach(Downgraded).get();
  const isLoggedState = isLogged.attach(Downgraded).get();

  const [isShowPopupDeposit, setIsShowPopupDeposit] = useState(false);
  const [isShowPopupBorrow, setIsShowPopupBorrow] = useState(false);
  const [isShowPopupRegist, setIsShowPopupRegist] = useState(false);
  const [isShowPopupRequireLogin, setIsShowPopupRequireLogin] = useState(false);
  const [tokenList, setTokenList] = useState([]);
  const [tokenId, setTokenId] = useState("");
  const [tokenChose, setTokenChose] = useState(null);

  const setUpPopup = (e: any, item: any) => {
    e.preventDefault();
    setTokenId(item.tokenId);
    setTokenChose(item);
  };

  const openPopupDeposit = (e: any, item: any) => {
    setUpPopup(e, item);
    handleValidate("deposit");
  };

  const openPopupBorrow = (e: any, item: any) => {
    setUpPopup(e, item);
    handleValidate("borrow");
  };

  const handleValidate = (type: string) => {
    if (!isLoggedState) {
      return setIsShowPopupRequireLogin(true);
    } else if (userBalanceState === null) {
      return setIsShowPopupRegist(true);
    } else if (isLoggedState) {
      return type === "deposit"
        ? setIsShowPopupDeposit(true)
        : setIsShowPopupBorrow(true);
    }
  };

  const _handleClosePopupDeposit = () => {
    setIsShowPopupDeposit(false);
  };

  const _handleClosePopupBorrow = () => {
    setIsShowPopupBorrow(false);
  };

  const _handleClosePopupRegist = () => {
    setIsShowPopupRegist(false);
  };
  const _handleClosePopupRequire = () => {
    setIsShowPopupRequireLogin(false);
  };

  const getTokenList = async () => {
    if (contractState !== null) {
      await contractState
        .get_assets_paged({ from_index: 0, limit: 10 })
        .then((res: any) => {
          const fomat = res.map((item: any) => {
            return {
              tokenId: item[0],
              ...item[1],
            };
          });
          poolListToken.set(fomat);
          return res;
        })
        .catch((err: any) => console.log(err));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getTokenList();
    }, 500);
  }, [contractState]);

  useEffect(() => {
    if (poolListTokenState) {
      setTokenList(poolListTokenState);
    }
  }, [poolListTokenState, tokenList]);

  return (
    <div className="container homepage">
      {isShowPopupDeposit && (
        <DepositPopup
          tokenId={tokenId}
          token={tokenChose}
          setTurnOff={_handleClosePopupDeposit}
        />
      )}
      {isShowPopupBorrow && (
        <BorrowPopup
          tokenId={tokenId}
          token={tokenChose}
          setTurnOff={_handleClosePopupBorrow}
        />
      )}
      {isShowPopupRegist && (
        <RegistFirstTime setTurnOff={_handleClosePopupRegist} />
      )}
      {isShowPopupRequireLogin && (
        <RequireLogin setTurnOff={_handleClosePopupRequire} />
      )}
      <div className="wrap-total">
        <div className="total deposit">
          <p className="title">Total Market Deposited</p>
          <p className="value">$200,100,999</p>
        </div>
        <div className="total borrow">
          <p className="title">Total Market Borrowed</p>
          <p className="value">$50,100,999</p>
        </div>
      </div>

      <div className="wrap-market">
        <h5 className="title">Market</h5>
        <div className="wrap-label">
          <p>Asset</p>
          <p>Deposited</p>
          <p>Borrowed</p>
          <p>Deposit APY</p>
          <p>Borrow APY</p>
        </div>
        <div className="pools">
          <TokenList
            tokenList={tokenList}
            _openPopupDeposit={openPopupDeposit}
            _openPopupBorrow={openPopupBorrow}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
