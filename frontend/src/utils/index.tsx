import { tokenFomat } from "./token";

export const contractName = "nel.nthellious.testnet";

export const nearConfig = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  contractName,
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  headers: {
    "Content-Type": "application/json",
  },
};

export const shortName = (str: string) => {
  return str.slice(0, 6).toString() + ".." || "";
};

export const totalBalance = (arrayOject: any) => {
  var result = arrayOject?.reduce((acc: any, item: any) => {
    const decimals = tokenFomat[item.token_id]?.decimals;
    if (!decimals) return 0;
    const bal = item.balance / 10 ** decimals;
    return acc + bal;
  }, 0);
  // console.log("total-result", result);
  return result || 0;
};

export const fomatBalanceWithDecimal = (
  balance: number,
  decimal: number
): string => {
  const result: number = +balance / 10 ** decimal;
  if (result <= 0) {
    return "0.00";
  }
  return result.toString().slice(0, 4) || "0.00";
};

export const shortBalance = (balance: number): string => {
  if (balance < 0) {
    return "0.00";
  }
  const bl = balance.toString();
  const dotIndex = bl.indexOf(".");
  const integer = bl.slice(0, dotIndex);
  const real = bl.slice(dotIndex).slice(0, 3);
  const rs = integer + real;
  return rs ?? "0.00";
};
