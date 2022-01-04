import { Link } from "react-router-dom";
import { useState as hookState, Downgraded } from "@hookstate/core";
import globalState from "../state/globalStore";
import { contractName } from "../utils";
import { useEffect, useState } from "react";
export default function Header() {
  const { wallet, contract }: any = hookState<any>(globalState);
  const [isLogin, setIsLogin] = useState(false);
  const [accountName, setAccountName] = useState("");

  const login = () => {
    wallet
      .attach(Downgraded)
      .get()
      .requestSignIn(contractName, "Rust Counter Example");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.document
        .getElementsByTagName("html")[0]
        .classList.remove("nav-open");
      window.addEventListener("scroll", handleScoll);
      return () => window.removeEventListener("scroll", handleScoll);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (contract.attach(Downgraded).get()?.account.accountId) {
      setIsLogin(true);
      setAccountName(contract.attach(Downgraded).get()?.account.accountId)
    }
  }, [contract]);

  const handleScoll = () => {
    const elementTopMenu: Element | null =
      window.document.getElementById("wrap-header-menu");
    if (window.scrollY >= 100) {
      elementTopMenu && elementTopMenu.classList.add("active");
    } else {
      elementTopMenu && elementTopMenu.classList.remove("active");
    }
  };

  return (
    <header id="wrap-header-menu" className="header">
      <div className="container">
        <h1>
          <Link to="/">N E A R Lend</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/invoices">Invoices</Link>
            </li>
            <li>
              <Link to="/expenses">Expenses</Link>
            </li>
            {isLogin ? (
              <li className="btn-connect">
                {accountName}
              </li>
            ) : (
              <li onClick={login} className="btn-connect">
                Connect to Wallet
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
