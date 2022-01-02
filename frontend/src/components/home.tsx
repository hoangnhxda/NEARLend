import { useEffect } from "react";
import iconSol from "../images/icon-sol.png";
import iconBitcoin from "../images/icon-bitcoin.png";
import iconShib from "../images/icon-shib.png";
import iconDoge from "../images/icon-doge.png";
import "../App.css";
import { useState as hookState, Downgraded } from "@hookstate/core";
import globalState from "../state/globalStore";
import { contractName } from "../utils";
import {
  _near,
  _walletConnection,
  _contract,
  checkIsSigned,
} from "../services/connect";

function Home() {
  const { near, wallet, contract, balance }: any = hookState<any>(globalState);

  const login = () => {
    wallet
      .attach(Downgraded)
      .get()
      .requestSignIn(contractName, "Rust Counter Example");
  };

  const signOut = () => {
    wallet.attach(Downgraded).get().signOut();
    window.location.reload();
  };

  const supply = async () => {
    contract
      .attach(Downgraded)
      .get()
      .supply({}, 100000000000000, 2)
      .then(console.log);
    var tmpAvila = await wallet
      .attach(Downgraded)
      .get()
      .account()
      .getAccountBalance();
    balance.set(tmpAvila.available / Math.pow(10, 24));
  };

  const get_total_pool_balance = () => {
    contract
      .attach(Downgraded)
      .get()
      .get_total_pool_balance()
      .then(console.log);
  };

  const withdraw_supply = () => {
    contract
      .attach(Downgraded)
      .get()
      .withdraw_supply({}, 100000000000000, 2)
      .then(console.log);
  };

  const get_account_supplied_balance = () => {
    contract
      .attach(Downgraded)
      .get()
      .get_account_supplied_balance()
      .then(console.log);
  };

  const test = () => {
    contract.attach(Downgraded).get().test1().then(console.log);
  };

  async function initConnect() {
    const initNear = await _near();
    const initWallet = _walletConnection(initNear);
    const initContract = _contract(initWallet);

    near.set(initNear);
    wallet.set(initWallet);
    contract.set(initContract);

    return checkIsSigned(initWallet);
  }

  useEffect(() => {
    initConnect();
  }, []);

  return (
    <div className="container homepage">
      {/* <button onClick={login}>login</button>
      <button onClick={supply}>supply</button>
      <button onClick={test}>test1</button>
      <button onClick={get_total_pool_balance}>get_total_pool_balance</button>
      <button onClick={withdraw_supply}>withdraw_supply</button>
      <button onClick={get_account_supplied_balance}>
        get_account_supplied_balance
      </button>
      <button onClick={signOut}>signOut</button> */}

      <div className="wrap-total">
        <div className="deposit">
          <p className="title">Total Market Deposited</p>
          <p className="value">$200,100,999</p>
        </div>
        <div className="borrow">
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
                <p>$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconSol} width={15} height={15} alt="Logo" />
              </p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconSol} width={15} height={15} alt="Logo" />
              </p>
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
                <p className="top coin color-white fwb">SOL</p>
                <p>$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconBitcoin} width={15} height={15} alt="Logo" />
              </p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconBitcoin} width={15} height={15} alt="Logo" />
              </p>
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
                <p className="top coin color-white fwb">SOL</p>
                <p>$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconShib} width={15} height={15} alt="Logo" />
              </p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconShib} width={15} height={15} alt="Logo" />
              </p>
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
                <p className="top coin color-white fwb">SOL</p>
                <p>$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconDoge} width={15} height={15} alt="Logo" />
              </p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconDoge} width={15} height={15} alt="Logo" />
              </p>
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
                <p>$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconSol} width={15} height={15} alt="Logo" />
              </p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconSol} width={15} height={15} alt="Logo" />
              </p>
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
                <p className="top coin color-white fwb">SOL</p>
                <p>$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconBitcoin} width={15} height={15} alt="Logo" />
              </p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconBitcoin} width={15} height={15} alt="Logo" />
              </p>
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
                <p className="top coin color-white fwb">SOL</p>
                <p>$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconShib} width={15} height={15} alt="Logo" />
              </p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconShib} width={15} height={15} alt="Logo" />
              </p>
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
                <p className="top coin color-white fwb">SOL</p>
                <p>$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconDoge} width={15} height={15} alt="Logo" />
              </p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconDoge} width={15} height={15} alt="Logo" />
              </p>
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
                <p>$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconSol} width={15} height={15} alt="Logo" />
              </p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconSol} width={15} height={15} alt="Logo" />
              </p>
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
                <p className="top coin color-white fwb">SOL</p>
                <p>$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconBitcoin} width={15} height={15} alt="Logo" />
              </p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconBitcoin} width={15} height={15} alt="Logo" />
              </p>
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
                <p className="top coin color-white fwb">SOL</p>
                <p>$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconShib} width={15} height={15} alt="Logo" />
              </p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconShib} width={15} height={15} alt="Logo" />
              </p>
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
                <p className="top coin color-white fwb">SOL</p>
                <p>$124.5</p>
              </div>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini deposit">
              <p className="top color-white fwb">129.04K</p>
              <p>$124.5M</p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconDoge} width={15} height={15} alt="Logo" />
              </p>
            </div>
            <div className="mini market-flex color-white apy">
              <p>7.29% +</p>
              <p className="icon-apy">
                <img src={iconDoge} width={15} height={15} alt="Logo" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
