import logo from "../images/nearlend.png";
import { useState as hookState, Downgraded } from "@hookstate/core";
import globalState from "../state/globalStore";
import { useEffect, useState } from "react";
import { fomatBalance } from "../utils";
import { tokenFomat } from "../utils/token";

export default function PortfolioItem() {
  const { userBalance }: any = hookState<any>(globalState);
  const [account, setAccount] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setAccount(userBalance.attach(Downgraded).get());
    }, 500);
  }, [account, userBalance]);

  return (
    <div>
      {account?.supplied.length > 0 ? (
        account?.supplied.map((item: any, idx: number) => {
          console.log(item);
          const decimals = tokenFomat[item.token_id].decimals;
          const icon = tokenFomat[item.token_id].icon;
          const symbol = tokenFomat[item.token_id].symbol;
          const balance = fomatBalance(item.balance, decimals);
          return (
            <div key={idx} className="label label__token">
              <div className="label__token-mini token__logo">
                <img
                  className="icon"
                  src={icon || logo}
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
              <p className="label__token-mini">
                {(Number(item.apr) * 100).toFixed(3)}%
              </p>
              {/* <p className="label__token-mini">Actions</p> */}
            </div>
          );
        })
      ) : (
        <div className="empty-account-line"></div>
      )}
    </div>
  );
}
