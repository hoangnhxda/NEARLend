import PortfolioDepositItem from "./PortfolioDepositItem";

export default function PortfolioDeposit({ supplied, borrowed }: any) {
  return (
    <div>
      {supplied && supplied.length > 0 ? (
        supplied.map((item: any, idx: number) =>
          item ? (
            <PortfolioDepositItem
              key={idx}
              supplied={item}
              borrowed={borrowed}
            />
          ) : null
        )
      ) : (
        <div className="empty-account-line"></div>
      )}
    </div>
  );
}
