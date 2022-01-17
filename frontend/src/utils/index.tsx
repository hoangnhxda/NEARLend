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
  return str.slice(0, 10).toString() + "..";
};

export const totalBalance = (arrayOject: any) => {
  var result = arrayOject?.reduce((acc: any, obj: any) => {
    return acc + parseInt(obj.balance);
  }, 0);
  console.log("total-result", result);
  return result;
};