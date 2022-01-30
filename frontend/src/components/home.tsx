/* eslint-disable jsx-a11y/iframe-has-title */
import { useEffect, useState } from "react";
import iconSol from "../images/icon-sol.png";
import iconBitcoin from "../images/icon-bitcoin.png";
import iconShib from "../images/icon-shib.png";
import iconDoge from "../images/icon-doge.png";
import "../App.css";
import "../responsive.css";
import { useState as hookState, Downgraded } from "@hookstate/core";
import globalState from "../state/globalStore";
import { _near, _walletConnection, _contract } from "../services/connect";
import { fomatBalance } from "../utils";
import { DepositPopup, BorrowPopup, RegistFirstTime } from "./Popup";
import { tokenFomat } from "../utils/token";
import TokenList from "./token-list";

function Home() {
  const { contract, poolListToken, userBalance }: any =
    hookState<any>(globalState);
  const contractState = contract.attach(Downgraded).get();
  const userBalanceState = userBalance.attach(Downgraded).get();
  const poolListTokenState = poolListToken.attach(Downgraded).get();

  const [isShowPopupDeposit, setIsShowPopupDeposit] = useState(false);
  const [isShowPopupBorrow, setIsShowPopupBorrow] = useState(false);
  const [isShowPopupRegist, setIsShowPopupRegist] = useState(false);
  const [tokenList, setTokenList] = useState([]);
  const [tokenId, setTokenId] = useState("");
  const [tokenChose, setTokenChose] = useState(null);

  const setUpPopup = (e: any, item: any) => {
    e.preventDefault();
    if (userBalanceState === null) {
      setIsShowPopupRegist(true);
      // console.log("nullllll");
      return;
    }
    setTokenId(item.tokenId);
    setTokenChose(item);
  };

  const openPopupDeposit = (e: any, item: any) => {
    setUpPopup(e, item);
    setIsShowPopupDeposit(true);
  };

  const openPopupBorrow = (e: any, item: any) => {
    setUpPopup(e, item);
    setIsShowPopupBorrow(true);
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

  useEffect(() => {
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
