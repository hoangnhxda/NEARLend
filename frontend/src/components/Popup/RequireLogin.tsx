import { contractName } from "../../utils";
import { useState as hookState, Downgraded } from "@hookstate/core";
import globalState from "../../state/globalStore";
import { useEffect } from "react";
type Props = {
  tokenId?: string;
  token?: any;
  textTitle?: string;
  textConfirm?: string;
  textCancel?: string;
  togglePopup?: any;
  handleConfirm?: any;
};

const RequireLogin = ({
  togglePopup,
  textTitle,
  textConfirm,
  textCancel,
  handleConfirm,
}: Props) => {
  const { wallet }: any = hookState<any>(globalState);
  const walletState = wallet.attach(Downgraded).get();

  const login = () => {
    walletState.requestSignIn(contractName, "Hello Nearlend !");
  };
  const _handleTogglePopup = () => {
    togglePopup();
  };

  return (
    <div className="wrap-popup">
      <div className="popup notification">
        <h4 className="text-notification">
          {`${textTitle ?? "You need to Login to deposit or borrow !"} `}
        </h4>
        <div className="wrap-button">
          <button
            className="button-notification"
            onClick={handleConfirm ?? login}
          >
            {`${textConfirm ?? "Login"} `}
          </button>
          <button
            className="button-notification button-gray"
            onClick={_handleTogglePopup}
          >
            {`${textCancel ?? "Close"} `}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequireLogin;
