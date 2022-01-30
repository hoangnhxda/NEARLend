import { useState as hookState, Downgraded } from "@hookstate/core";
import globalState from "../state/globalStore";
import { useEffect, useState } from "react";
import { totalBalance, fomatBalance } from "../utils";
import { tokenFomat } from "../utils/token";

export default function Intro() {
  const { userBalance }: any = hookState<any>(globalState);
  const [account, setAccount] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setAccount(userBalance.attach(Downgraded).get());
    }, 500);
  }, [account, userBalance]);

  return (
    <main className="container portforlio homepage">
      <div className="total">
        <div className="wrap-total">
          <div className="total deposit">
            <p className="title">My Total Deposits</p>
            <p className="value">
              $
              {account?.supplied.length > 0
                ? (totalBalance(account?.supplied) * 23).toFixed(1)
                : 0}
            </p>
          </div>
          <div className="total deposit">
            <p className="title">Net APY</p>
            <p className="value">....</p>
          </div>
          <div className="total borrow">
            <p className="title">My Total Borrows</p>
            <p className="value">
              $
              {account?.borrowed.length > 0
                ? (totalBalance(account?.borrowed) * 23).toFixed(0)
                : 0}
            </p>
          </div>
        </div>
      </div>

      <div className="token-list">
        <div className="side">
          <div className="my-info">
            <h5>Deposited</h5>
            <h5>$ {(totalBalance(account?.supplied) * 23).toFixed(0)}</h5>
          </div>
          <div className="detail">
            <div className="label">
              <p className="title">Asset</p>
              <p className="title">Balance</p>
              <p className="title">APY</p>
              {/* <p className="title">Actions</p> */}
            </div>
            {account?.supplied.length > 0 ? (
              account?.supplied.map((item: any, idx: number) => {
                // console.log(item);
                const decimals = tokenFomat[item.token_id].decimals;
                const icon = tokenFomat[item.token_id].icon;
                const symbol = tokenFomat[item.token_id].symbol;
                const balance = fomatBalance(item.balance, decimals);
                return (
                  <div key={idx} className="label label__token">
                    <div className="label__token-mini token__logo">
                      <img
                        className="icon"
                        src={icon}
                        width={30}
                        height={30}
                        alt="Logo"
                      />
                      <div className="token__price">
                        <p className="token_name">{symbol}</p>
                        <p className="color-space-gray">$23</p>
                      </div>
                    </div>
                    <p className="label__token-mini">{Number(balance).toFixed(1)}</p>
                    <p className="label__token-mini">{(Number(item.apr) * 100).toFixed(3)}%</p>
                    {/* <p className="label__token-mini">Actions</p> */}
                  </div>
                );
              })
            ) : (
              <div className="empty-account-line"></div>
            )}
          </div>
        </div>
        <div className="side">
          <div className="my-info">
            <h5>Borrowed</h5>
            <h5>$ {(totalBalance(account?.borrowed) * 23).toFixed(0)}</h5>
          </div>
          <div className="detail">
            <div className="label">
              <p className="title">Asset</p>
              <p className="title">Balance</p>
              <p className="title">APY</p>
              {/* <p className="title">Actions</p> */}
            </div>
            {account?.borrowed.length > 0 ? (
              account?.borrowed.map((item: any, idx: number) => {
                const decimals = tokenFomat[item.token_id].decimals;
                const icon = tokenFomat[item.token_id].icon;
                const symbol = tokenFomat[item.token_id].symbol;
                const balance = fomatBalance(item.balance, decimals);
                return (
                  <div key={idx} className="label label__token">
                    <div className="label__token-mini token__logo">
                      <img
                        className="icon"
                        src={icon}
                        width={30}
                        height={30}
                        alt="Logo"
                      />
                      <div className="token__price">
                        <p className="token_name">{symbol}</p>
                        <p className="color-space-gray">$23</p>
                      </div>
                    </div>
                    <p className="label__token-mini">{Number(balance).toFixed(1)}</p>
                    <p className="label__token-mini">{(Number(item.apr) * 100).toFixed(3)}%</p>
                    {/* <p className="label__token-mini">Actions</p> */}
                  </div>
                );
              })
            ) : (
              <div className="empty-account-line"></div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
