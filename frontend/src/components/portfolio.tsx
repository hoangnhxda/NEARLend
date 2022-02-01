import { useState as hookState, Downgraded } from "@hookstate/core";
import globalState from "../state/globalStore";
import { useEffect, useState } from "react";
import { totalBalance, fomatBalance } from "../utils";
import { tokenFomat } from "../utils/token";

export default function Intro() {
  const { userBalance }: any = hookState<any>(globalState);
  const userBalanceState = userBalance.attach(Downgraded).get();
  const [account, setAccount] = useState<any>(null);

  useEffect(() => {
    console.log("user balance: ", userBalanceState);
    setTimeout(() => {
      setAccount(userBalance.attach(Downgraded).get());
    }, 500);
  }, [account, userBalance]);

  const _handToggleDiv = (e: any) => {
    e.preventDefault();
    e.target.classList.toggle("active");
  };

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
              <p className="title">APY</p>
              <p className="title">Actions</p>
            </div>
            {account?.supplied.length > 0 ? (
              account?.supplied.map((item: any, idx: number) => {
                // console.log(item);
                const decimals = tokenFomat[item.token_id].decimals;
                const icon = tokenFomat[item.token_id].icon;
                const symbol = tokenFomat[item.token_id].symbol;
                const balance = fomatBalance(item.balance, decimals);
                const shares = fomatBalance(item.shares, decimals);
                return (
                  <div key={idx} onClick={_handToggleDiv} className="wrap-info">
                    <div className="label label__token">
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
                      <p className="label__token-mini">
                        {(Number(item.apr) * 100).toFixed(3)}%
                      </p>
                      <button className="button-basic">Withdraw</button>
                    </div>
                    <div className="label label__token__detail">
                      <div className="token__detail__row">
                        <p className="title">Available:</p>
                        <p className="label__token-mini">
                          {Number(shares).toFixed(1)}
                        </p>
                      </div>
                      <div className="token__detail__row">
                        <p className="title">Balance:</p>
                        <p className="label__token-mini">
                          {Number(balance).toFixed(1)}
                        </p>
                      </div>

                      <div className="token__detail__row">
                        <p className="title">Earned:</p>
                        <p className="label__token-mini">
                          {Number(0).toFixed(1)}
                        </p>
                      </div>
                    </div>
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
              <p className="title">APY</p>
              <p className="title">Actions</p>
            </div>
            {account?.borrowed.length > 0 ? (
              account?.borrowed.map((item: any, idx: number) => {
                const decimals = tokenFomat[item.token_id].decimals;
                const icon = tokenFomat[item.token_id].icon;
                const symbol = tokenFomat[item.token_id].symbol;
                const balance = fomatBalance(item.balance, decimals);
                const shares = fomatBalance(item.shares, decimals);
                return (
                  <div key={idx} onClick={_handToggleDiv} className="wrap-info">
                    <div className="label label__token">
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
                      <p className="label__token-mini">
                        {(Number(item.apr) * 100).toFixed(3)}%
                      </p>
                      <button className="button-basic">Withdraw</button>
                    </div>
                    <div className="label label__token__detail">
                      <div className="token__detail__row">
                        <p className="title">Available:</p>
                        <p className="label__token-mini">
                          {Number(shares).toFixed(1)}
                        </p>
                      </div>
                      <div className="token__detail__row">
                        <p className="title">Balance:</p>
                        <p className="label__token-mini">
                          {Number(balance).toFixed(1)}
                        </p>
                      </div>

                      <div className="token__detail__row">
                        <p className="title">Earned:</p>
                        <p className="label__token-mini">
                          {Number(0).toFixed(1)}
                        </p>
                      </div>
                    </div>
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
