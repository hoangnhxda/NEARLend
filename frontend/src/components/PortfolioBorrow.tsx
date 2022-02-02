import PortfolioBorrowItem from "./PortfolioBorrowItem";

export default function PortfolioBorrow({
  items,
  supplies,
  handleToggle,
}: any) {
  const _handleToggle = (e: any) => {
    handleToggle(e);
  };

  return (
    <div>
      {items && items.length > 0 ? (
        items.map((item: any, idx: number) =>
          item ? (
            <PortfolioBorrowItem
              key={idx}
              data={item}
              handleToggle={_handleToggle}
              supplies={supplies}
            />
          ) : null
        )
      ) : (
        <div className="empty-account-line"></div>
      )}
    </div>
  );
}
