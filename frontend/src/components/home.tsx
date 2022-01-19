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
import {
  _near,
  _walletConnection,
  _contract,
  checkIsSigned,
} from "../services/connect";
import { DepositPopup, BorrowPopup } from "./Popup";

function Home() {
  const { near, wallet, contract, poolListToken }: any = hookState<any>(globalState);
  const [isShowPopupDeposit, setIsShowPopupDeposit] = useState(false);
  const [isShowPopupBorrow, setIsShowPopupBorrow] = useState(false);
  const [tokenList, setTokenList] = useState([]);
  const [tokenId, setTokenId] = useState("");
  const [tokenChose, setTokenChose] = useState(null);

  async function initConnect() {
    const initNear = await _near();
    const initWallet = _walletConnection(initNear);
    const initContract = _contract(initWallet);

    near.set(initNear);
    wallet.set(initWallet);
    contract.set(initContract);

    return checkIsSigned(initWallet);
  }

  const openPopupDeposit = (e: any, item:any) => {
    e.preventDefault();
    setTokenId(item.tokenId);
    setTokenChose(item)
    setIsShowPopupDeposit(true);
  };

  const openPopupBorrow = (e: any, item:any) => {
    e.preventDefault();
    setTokenId(item.tokenId);
    setTokenChose(item)
    setIsShowPopupBorrow(true);
  };

  useEffect(() => {
    if (!contract) {
      initConnect();
    }
    const getTokenList = async () => {
      if (contract.attach(Downgraded).get()) {
        await contract
          .attach(Downgraded)
          .get()
          .get_assets_paged({ from_index: 0, limit: 10 })
          .then((res: any) => {
            const fomat = res.map((item: any) => {
              return {
                tokenId: item[0],
                ...item[1],
              };
            });
            setTokenList(fomat);
            console.log(res);
            console.log('fomat', fomat);

            poolListToken.set(fomat);
            return res;
          })
          .catch((err: any) => console.log(err));
      }
    };

    setTimeout(() => {
      getTokenList();
    }, 500);
  }, []);

  return (
    <div className="container homepage">
      {isShowPopupDeposit && (
        <DepositPopup
          tokenId={tokenId}
          token={tokenChose}
          setTurnOff={() => setIsShowPopupDeposit(false)}
        />
      )}
      {isShowPopupBorrow && (
        <BorrowPopup
          tokenId={tokenId}
          token={tokenChose}
          setTurnOff={() => setIsShowPopupBorrow(false)}
        />
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
          {tokenList && tokenList.length > 0
            ? tokenList.map((item: any, idx: number) => {
                return (
                  <div key={idx} className="wrap-pool">
                    <div className="mini asset market-flex">
                      <img
                        className="icon"
                        src={iconSol}
                        width={30}
                        height={30}
                        alt="Logo"
                      />
                      <div>
                        <p className="top coin color-white fwb">{item.tokenId}</p>
                        <p className="color-space-gray">$124.5</p>
                      </div>
                    </div>
                    <div className="mini deposit">
                      <p className="top color-white fwb">
                        {item?.supplied.balance / (10 ** item.config.extra_decimals)}
                      </p>
                      <p className="color-space-gray">$124.5M</p>
                    </div>
                    <div className="mini deposit">
                      <p className="top color-white fwb">
                        {item?.borrowed.balance / (10 ** item.config.extra_decimals)}
                      </p>
                      <p className="color-space-gray">$124.5M</p>
                    </div>
                    <div
                      onClick={(e) => openPopupDeposit(e, item)}
                      className="action mini color-white"
                    >
                      <div className="market-flex apy">
                        <p>7.29% +</p>
                        <p className="icon-apy">
                          <img
                            src={iconSol}
                            width={18}
                            height={18}
                            alt="Logo"
                          />
                        </p>
                      </div>
                      <button>Deposit</button>
                    </div>
                    <div
                      onClick={(e) => openPopupBorrow(e, item)}
                      className="action mini color-white"
                    >
                      <div className="market-flex apy">
                        <p>7.29% +</p>
                        <p className="icon-apy ">
                          <img
                            src={iconSol}
                            width={18}
                            height={18}
                            alt="Logo"
                          />
                        </p>
                      </div>
                      <button>Borrow</button>
                    </div>
                  </div>
                );
              })
            : null}
          {/* <div className="wrap-pool">
            <div className="mini asset market-flex">
              <img
                className="icon"
                src={iconSol}
                width={30}
                height={30}
                alt="Logo"
              />
              <div>
                <p className="top coin color-white fwb">SOL</p>
                <p className="color-space-gray">$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p className="color-space-gray">$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p className="color-space-gray">$124.5M</p>
            </div>
            <div onClick={openPopupDeposit} className="action mini color-white">
              <div className="market-flex apy">
                <p>7.29% +</p>
                <p className="icon-apy">
                  <img src={iconSol} width={15} height={15} alt="Logo" />
                </p>
              </div>
              <button>Deposit</button>
            </div>
            <div onClick={openPopupBorrow} className="action mini color-white">
              <div className="market-flex apy">
                <p>7.29% +</p>
                <p className="icon-apy ">
                  <img src={iconSol} width={15} height={15} alt="Logo" />
                </p>
              </div>
              <button>Borrow</button>
            </div>
          </div>
          <div className="wrap-pool">
            <div className="mini asset market-flex">
              <img
                className="icon"
                src={iconBitcoin}
                width={30}
                height={30}
                alt="Logo"
              />
              <div>
                <p className="top coin color-white fwb">BTC</p>
                <p className="color-space-gray">$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p className="color-space-gray">$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p className="color-space-gray">$124.5M</p>
            </div>
            <div onClick={openPopupDeposit} className="action mini color-white">
              <div className="market-flex apy">
                <p>7.29% +</p>
                <p className="icon-apy">
                  <img src={iconBitcoin} width={15} height={15} alt="Logo" />
                </p>
              </div>
              <button>Deposit</button>
            </div>
            <div onClick={openPopupBorrow} className="action mini color-white">
              <div className="market-flex apy">
                <p>7.29% +</p>
                <p className="icon-apy">
                  <img src={iconBitcoin} width={15} height={15} alt="Logo" />
                </p>
              </div>
              <button>Borrow</button>
            </div>
          </div>
          <div className="wrap-pool">
            <div className="mini asset market-flex">
              <img
                className="icon"
                src={iconShib}
                width={30}
                height={30}
                alt="Logo"
              />
              <div>
                <p className="top coin color-white fwb">SHIB</p>
                <p className="color-space-gray">$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p className="color-space-gray">$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p className="color-space-gray">$124.5M</p>
            </div>
            <div onClick={openPopupDeposit} className="action mini color-white">
              <div className="market-flex apy">
                <p>7.29% +</p>
                <p className="icon-apy">
                  <img src={iconShib} width={15} height={15} alt="Logo" />
                </p>
              </div>
              <button>Deposit</button>
            </div>
            <div onClick={openPopupBorrow} className="action mini color-white">
              <div className="market-flex apy">
                <p>7.29% +</p>
                <p className="icon-apy">
                  <img src={iconShib} width={15} height={15} alt="Logo" />
                </p>
              </div>
              <button>Borrow</button>
            </div>
          </div>
          <div className="wrap-pool">
            <div className="mini asset market-flex">
              <img
                className="icon"
                src={iconDoge}
                width={30}
                height={30}
                alt="Logo"
              />
              <div>
                <p className="top coin color-white fwb">DOGE</p>
                <p className="color-space-gray">$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p className="color-space-gray">$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p className="color-space-gray">$124.5M</p>
            </div>
            <div onClick={openPopupDeposit} className="action mini color-white">
              <div className="market-flex apy">
                <p>7.29% +</p>
                <p className="icon-apy">
                  <img src={iconDoge} width={15} height={15} alt="Logo" />
                </p>
              </div>
              <button>Deposit</button>
            </div>
            <div onClick={openPopupBorrow} className="action mini color-white">
              <div className="market-flex apy">
                <p>7.29% +</p>
                <p className="icon-apy">
                  <img src={iconDoge} width={15} height={15} alt="Logo" />
                </p>
              </div>
              <button>Borrow</button>
            </div>
          </div>

          <div className="wrap-pool">
            <div className="mini asset market-flex">
              <img
                className="icon"
                src={iconSol}
                width={30}
                height={30}
                alt="Logo"
              />
              <div>
                <p className="top coin color-white fwb">SOL</p>
                <p className="color-space-gray">$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p className="color-space-gray">$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p className="color-space-gray">$124.5M</p>
            </div>
            <div onClick={openPopupDeposit} className="action mini color-white">
              <div className="market-flex apy">
                <p>7.29% +</p>
                <p className="icon-apy">
                  <img src={iconSol} width={15} height={15} alt="Logo" />
                </p>
              </div>
              <button>Deposit</button>
            </div>
            <div onClick={openPopupBorrow} className="action mini color-white">
              <div className="market-flex apy">
                <p>7.29% +</p>
                <p className="icon-apy ">
                  <img src={iconSol} width={15} height={15} alt="Logo" />
                </p>
              </div>
              <button>Borrow</button>
            </div>
          </div>
          <div className="wrap-pool">
            <div className="mini asset market-flex">
              <img
                className="icon"
                src={iconBitcoin}
                width={30}
                height={30}
                alt="Logo"
              />
              <div>
                <p className="top coin color-white fwb">BTC</p>
                <p className="color-space-gray">$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p className="color-space-gray">$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p className="color-space-gray">$124.5M</p>
            </div>
            <div onClick={openPopupDeposit} className="action mini color-white">
              <div className="market-flex apy">
                <p>7.29% +</p>
                <p className="icon-apy">
                  <img src={iconBitcoin} width={15} height={15} alt="Logo" />
                </p>
              </div>
              <button>Deposit</button>
            </div>
            <div onClick={openPopupBorrow} className="action mini color-white">
              <div className="market-flex apy">
                <p>7.29% +</p>
                <p className="icon-apy">
                  <img src={iconBitcoin} width={15} height={15} alt="Logo" />
                </p>
              </div>
              <button>Borrow</button>
            </div>
          </div>
          <div className="wrap-pool">
            <div className="mini asset market-flex">
              <img
                className="icon"
                src={iconShib}
                width={30}
                height={30}
                alt="Logo"
              />
              <div>
                <p className="top coin color-white fwb">SHIB</p>
                <p className="color-space-gray">$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p className="color-space-gray">$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p className="color-space-gray">$124.5M</p>
            </div>
            <div onClick={openPopupDeposit} className="action mini color-white">
              <div className="market-flex apy">
                <p>7.29% +</p>
                <p className="icon-apy">
                  <img src={iconShib} width={15} height={15} alt="Logo" />
                </p>
              </div>
              <button>Deposit</button>
            </div>
            <div onClick={openPopupBorrow} className="action mini color-white">
              <div className="market-flex apy">
                <p>7.29% +</p>
                <p className="icon-apy">
                  <img src={iconShib} width={15} height={15} alt="Logo" />
                </p>
              </div>
              <button>Borrow</button>
            </div>
          </div>
          <div className="wrap-pool">
            <div className="mini asset market-flex">
              <img
                className="icon"
                src={iconDoge}
                width={30}
                height={30}
                alt="Logo"
              />
              <div>
                <p className="top coin color-white fwb">DOGE</p>
                <p className="color-space-gray">$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p className="color-space-gray">$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p className="color-space-gray">$124.5M</p>
            </div>
            <div onClick={openPopupDeposit} className="action mini color-white">
              <div className="market-flex apy">
                <p>7.29% +</p>
                <p className="icon-apy">
                  <img src={iconDoge} width={15} height={15} alt="Logo" />
                </p>
              </div>
              <button>Deposit</button>
            </div>
            <div onClick={openPopupBorrow} className="action mini color-white">
              <div className="market-flex apy">
                <p>7.29% +</p>
                <p className="icon-apy">
                  <img src={iconDoge} width={15} height={15} alt="Logo" />
                </p>
              </div>
              <button>Borrow</button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
