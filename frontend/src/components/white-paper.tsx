import white_paper_pdf from "../images/nearlend-whitepaper.pdf";
export default function NftDetail() {
  return (
    <main className="white-paper">
      <iframe
        style={{
          position: "relative",
          zIndex: 9999,
          width: "100%",
          height: "100vh",
          border: "none",
        }}
        src={white_paper_pdf}
        title="White Paper"
      />
    </main>
  );
}
