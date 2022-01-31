/* eslint-disable jsx-a11y/iframe-has-title */
import { fomatBalance } from "../utils";
import { tokenFomat } from "../utils/token";

function TokenList({ tokenList, _openPopupDeposit, _openPopupBorrow }: any) {
  const openPopupDeposit = (e: any, item: any) => {
    _openPopupDeposit(e, item);
  };

  const openPopupBorrow = (e: any, item: any) => {
    _openPopupBorrow(e, item);
  };

  return (
    <>
      {tokenList && tokenList.length > 0
        ? tokenList.map((item: any, idx: number) => {
            const { tokenId } = item;
            const icon = tokenFomat[tokenId.toString()]?.icon;
            const tokenSymbol = tokenFomat[tokenId.toString()]?.symbol;
            const supplied: any = fomatBalance(
              item?.supplied.balance,
              item.config.extra_decimals
            );
            const borrowed: any = fomatBalance(
              item?.borrowed.balance,
              item.config.extra_decimals
            );

            return (
              <div key={idx} className="wrap-pool">
                <div className="mini asset market-flex">
                  <img
                    className="icon"
                    src={icon}
                    width={30}
                    height={30}
                    alt="Logo"
                  />
                  <div>
                    <p className="top coin color-white fwb">{tokenSymbol}</p>
                    <p className="color-space-gray">$23</p>
                  </div>
                </div>
                <div className="mini deposit">
                  <p className="top color-white fwb">{supplied}</p>
                  <p className="color-space-gray">${supplied * 23}</p>
                </div>
                <div className="mini deposit">
                  <p className="top color-white fwb">{borrowed}</p>
                  <p className="color-space-gray">${borrowed * 23}</p>
                </div>
                <div
                  onClick={(e) => openPopupDeposit(e, item)}
                  className="action mini color-white"
                >
                  <div className="market-flex apy">
                    <p>7.29% +</p>
                    <p className="icon-apy">
                      <img src={icon} width={18} height={18} alt="Logo" />
                    </p>
                  </div>
                  <button>Deposit</button>
                </div>
                <div
                  onClick={(e) => openPopupBorrow(e, item)}
                  className="action mini color-white"
                >
                  <div className="market-flex apy">
                    <p>7.29% +</p>
                    <p className="icon-apy ">
                      <img src={icon} width={18} height={18} alt="Logo" />
                    </p>
                  </div>
                  <button>Borrow</button>
                </div>
              </div>
            );
          })
        : null}
    </>
  );
}

export default TokenList;