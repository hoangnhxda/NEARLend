import { fomatBalanceWithDecimal } from "../utils";
import { tokenFomat } from "../utils/token";
import arrow_down_white from "../images/arrow_down_white.png";

export default function PortfolioBorrowItem({
  data,
  handleToggle,
  supplies,
}: any) {
  const decimals = tokenFomat[data.token_id].decimals;
  const icon = tokenFomat[data.token_id].icon;
  const symbol = tokenFomat[data.token_id].symbol;
  const borrowedBalance = data.balance;
  // const borrowedShares = fomatBalanceWithDecimal(item.shares, decimals);
  const supplied = supplies.find((f: any) => f.token_id === data.token_id);
  const suppliedBalance = supplied.balance;
  const availableBorrowed = +suppliedBalance - +borrowedBalance;
  
  const _handleToggle = (e: any) => {
    handleToggle(e);
  };

  return (
    <div onClick={_handleToggle} className="wrap-info">
      <div className="label label__token">
        <div className="label__token-mini token__logo">
          <img className="icon" src={icon} width={30} height={30} alt="Logo" />
          <div className="token__price">
            <p className="token_name">{symbol}</p>
            <p className="color-space-gray">$23</p>
          </div>
        </div>
        <p className="label__token-mini">
          {(Number(data.apr) * 100).toFixed(3)}%
        </p>
        <button className="button-basic">Withdraw</button>
        {/* <p className="arrow-down"><img alt="Arrow down" src={arrow_down_white} width={12} height={10} /></p> */}
      </div>
      <div className="label label__token__detail">
        <div className="token__detail__row">
          <p className="title">Borrowed:</p>
          <p className="label__token-mini">
            {fomatBalanceWithDecimal(borrowedBalance, decimals)}
          </p>
        </div>
        <div className="token__detail__row">
          <p className="title">Available:</p>
          <p className="label__token-mini">
            {fomatBalanceWithDecimal(availableBorrowed, decimals)}
          </p>
        </div>
      </div>
    </div>
  );
}
