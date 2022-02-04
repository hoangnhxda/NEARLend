import { fomatBalanceWithDecimal } from "../utils";
import { tokenFomat } from "../utils/token";
import { DownOutlined } from "@ant-design/icons";

export default function PortfolioDepositItem({
  data,
  borrowed,
  handleToggle,
}: any) {
  const decimals = tokenFomat[data.token_id].decimals;
  const icon = tokenFomat[data.token_id].icon;
  const symbol = tokenFomat[data.token_id].symbol;
  const depositedBalance = data.balance;
  const borrow = borrowed.find((f: any) => f.token_id === data.token_id);
  const borrowedBalance = borrow.balance;
  const available = +depositedBalance - +borrowedBalance;

  const _handleToggle = (e: any) => {
    handleToggle(e);
  };

  return (
    <div onClick={_handleToggle} className="wrap-info">
      <div className="label label__token">
        <p className="arrow-down">
          <DownOutlined />
        </p>
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
      </div>
      <div className="label label__token__detail">
        <div className="token__detail__row">
          <p className="title">Deposited:</p>
          <p className="label__token-mini">
            {fomatBalanceWithDecimal(depositedBalance, decimals)}
          </p>
        </div>

        <div className="token__detail__row">
          <p className="title">Available:</p>
          <p className="label__token-mini">
            {fomatBalanceWithDecimal(available, decimals)}
          </p>
        </div>

        <div className="token__detail__row">
          <p className="title">Earned:</p>
          <p className="label__token-mini">
            {fomatBalanceWithDecimal(0, decimals)}
          </p>
        </div>
      </div>
    </div>
  );
}
