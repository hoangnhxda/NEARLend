import PortfolioDepositItem from "./PortfolioDepositItem";

export default function PortfolioDeposit({ items, handleToggle }: any) {
  const _handleToggle = (e: any) => {
    handleToggle(e);
  };

  return (
    <div>
      {items && items.length > 0 ? (
        items.map((item: any, idx: number) =>
          item ? (
            <PortfolioDepositItem
              key={idx}
              data={item}
              handleToggle={_handleToggle}
            />
          ) : null
        )
      ) : (
        <div className="empty-account-line"></div>
      )}
    </div>
  );
}
