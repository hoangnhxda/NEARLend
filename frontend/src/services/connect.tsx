import * as nearAPI from "near-api-js";
import { contractName, nearConfig } from "../utils";
const { connect, WalletConnection, keyStores } = nearAPI;
const keyStore = new keyStores.BrowserLocalStorageKeyStore();
const GAS = 200000000000000;
const ONE_OCTO = 1;
const ONE_OCTO_STRING = "100000000000000000000000";

export const _near = async function () {
  return await connect({
    deps: {
      keyStore,
    },
    ...nearConfig,
  });
};

export const _walletConnection = function (_near: any) {
  return new WalletConnection(_near, null);
};

export const _contract = function (wallet: any) {
  return new nearAPI.Contract(wallet.account(), contractName, {
    viewMethods: [
      "get_assets_paged",
      "get_assets_paged_detailed",
      "get_asset",
      "ft_metadata",
      "get_account",
    ],
    changeMethods: ["storage_deposit", "ft_transfer", "ft_transfer_call"],
  });
};

export const checkIsSigned = async function (wallet: any) {
  const accountId = wallet.getAccountId();
  async function initCheck() {
    var tmpAvila = await wallet.account().getAccountBalance();
    const balance = tmpAvila.available / Math.pow(10, 24);
    // console.log("accountId", accountId);
    // console.log("balance", balance);
  }
  if (wallet.isSignedIn()) {
    initCheck();
  }
};

export const handleDepositFirstTime = async function (
  contract: any,
  wallet: any
) {
  const accountId = wallet.getAccountId();
  await contract.storage_deposit(
    {
      account_id: accountId,
      registration_only: true,
    },
    GAS,
    ONE_OCTO_STRING
  );
};

export const handleDeposit = async function (
  token: any,
  amountToken: number,
  contract: any
) {
  const amount = amountToken * (10 ** token.config.extra_decimals);
  const contractID = contract.contractId;
  const tokenID = token.tokenId;
  const args = {
    receiver_id: contractID,
    amount: amount.toLocaleString("fullwide", { useGrouping: false }),
    msg: "",
  };

  return await contract.account.functionCall(
    tokenID,
    "ft_transfer_call",
    args,
    GAS,
    ONE_OCTO
  );
};

export const handleBorrow = async function (
  token: any,
  amountToken: number,
  contract: any
) {
  try {
    let amount = amountToken * 10 ** token.config.extra_decimals;
    let amountToString = amount.toLocaleString("fullwide", {
      useGrouping: false,
    });

    const contractID = contract.contractId;
    const tokenID = token.tokenId;
    const args = {
      receiver_id: contractID,
      amount: "1",
      msg: `{"Execute": {"actions": [{"Borrow": {"token_id": "${tokenID}", "amount": "${amountToString}"}}]}}`,
    };

    return await contract.account.functionCall(
      tokenID,
      "ft_transfer_call",
      args,
      GAS,
      ONE_OCTO
    );
  } catch (error) {
    console.log(error);
  }
};

/* 
 @Example Code
 @Do not delete
*/
// 1 - deposit to pool for first time User login
// await contract.storage_deposit(
//   {
//     account_id: accountId,
//     registration_only: true,
//   },
//   GAS,
//   "100000000000000000000000",
// );

// 2 - deposit to pool for first time User login
// await contract.account.functionCall(
//   contract.contractId,
//   "storage_deposit",
//   {
//     account_id: accountId,
//     registration_only: true,
//   },
//   GAS,
//   "100000000000000000000000"
// );
