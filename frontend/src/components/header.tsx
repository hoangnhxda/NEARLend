import { Link } from "react-router-dom";
import { useState as hookState, Downgraded } from "@hookstate/core";
import globalState from "../state/globalStore";
import { contractName } from "../utils";
import { useEffect } from "react";
export default function Header() {
  const { wallet }: any = hookState<any>(globalState);

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
            <li onClick={login} className="btn-connect">
              Connect to Wallet
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
