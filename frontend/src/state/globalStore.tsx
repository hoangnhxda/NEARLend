import { createState } from "@hookstate/core";

const globalState: any = createState<any>({
  near: null,
  wallet: null,
  contract: null,
  balance: null,
  userBalance: null,
});


export default globalState;