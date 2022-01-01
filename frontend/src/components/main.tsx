import { useEffect } from "react";
import logo from "../logo.svg";
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

function Main() {
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button onClick={login}>login</button>
        <button onClick={supply}>supply</button>
        <button onClick={test}>test1</button>
        <button onClick={get_total_pool_balance}>get_total_pool_balance</button>
        <button onClick={withdraw_supply}>withdraw_supply</button>
        <button onClick={get_account_supplied_balance}>
          get_account_supplied_balance
        </button>
        <button onClick={signOut}>signOut</button>
      </header>
    </div>
  );
}

export default Main;
