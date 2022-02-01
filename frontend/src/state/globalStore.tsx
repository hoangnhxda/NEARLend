import { createState } from "@hookstate/core";

const globalState: any = createState<any>({
  near: null,
  wallet: null,
  contract: null,
  balance: null,
  userBalance: null,
  poolListToken: null,
  isLogged: false,
});


export default globalState;