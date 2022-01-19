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
  console.log("total-result", result);
  return result || 0;
};

export const fomatBalance = (balance: number, decimal: number) => {
  const result: number = balance / 10 ** decimal;
  return result.toFixed(1) || "";
};
