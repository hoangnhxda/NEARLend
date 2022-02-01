import { contractName } from "../../utils";
import { useState as hookState, Downgraded } from "@hookstate/core";
import globalState from "../../state/globalStore";
type Props = {
  setTurnOff: Function;
  tokenId?: string;
  token?: any;
};

const RequireLogin = ({ setTurnOff }: Props) => {
  const { wallet }: any = hookState<any>(globalState);
  const walletState = wallet.attach(Downgraded).get();
  const login = () => {
    walletState.requestSignIn(contractName, "Hello Nearlend !");
  };
  const _handleTurnOff = () => {
    setTurnOff();
  };

  return (
    <div className="wrap-popup">
      <div className="popup notification">
        <h4 className="text-notification">
          You need to <strong>Login</strong> to deposit or borrow !
        </h4>
        <div className="wrap-button">
          <button className="button-notification" onClick={login}>
            Login
          </button>
          <button
            className="button-notification button-gray"
            onClick={_handleTurnOff}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequireLogin;
