import * as nearAPI from "near-api-js";
import { contractName, nearConfig } from "../utils";
const { connect, WalletConnection, keyStores } = nearAPI;
const keyStore = new keyStores.BrowserLocalStorageKeyStore();

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

export const checkIsSigned = async function (wallet: any, contract: any) {
  async function sup() {
    const accountId = wallet.getAccountId();
    var tmpAvila = await wallet.account().getAccountBalance();
    const balance = tmpAvila.available / Math.pow(10, 24);
    console.log("accountId", accountId);
    console.log("balance", balance);
  }

  const ONE_YOCTO = 1;
  const GAS = 200000000000000;

  console.log(contract);
  if (wallet.isSignedIn()) {
    sup();

    // 1
    // await contract.storage_deposit({ account_id: wallet.getAccountId()});

    // 2
    // await contract.account.functionCall(
    //   contract.contractId,
    //   "storage_deposit",
    //   { attached_deposit: 0.1 },
    //   GAS,
    //   ONE_YOCTO
    // );
  }
};
