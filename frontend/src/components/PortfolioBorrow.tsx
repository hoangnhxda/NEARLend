import PortfolioBorrowItem from "./PortfolioBorrowItem";

export default function PortfolioBorrow({
  borrowed,
  supplied,
}: any) {
  return (
    <div>
      {borrowed && borrowed.length > 0 ? (
        borrowed.map((item: any, idx: number) =>
          item ? (
            <PortfolioBorrowItem
              key={idx}
              borrowed={item}
              supplied={supplied}
            />
          ) : null
        )
      ) : (
        <div className="empty-account-line"></div>
      )}
    </div>
  );
}
