/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import white_paper_pdf from "../images/nearlend-whitepaper.pdf";
import { useLocation, useNavigate } from "react-router-dom";
export default function NftDetail() {
  let navigate: any = useNavigate();
  const _goBack = () => {
    navigate(-1);
  };
  return (
    <main
      className="white-paper"
      style={{
        position: "relative",
        zIndex: 9999,
        minHeight: "100vh",
        height: "200vh",
        maxHeight: "999999999999999px",
        backgroundColor: '#fff',
      }}
    >
      <object
        style={{
          position: "relative",
          zIndex: 9999,
          width: "100%",
          minHeight: "100vh",
          height: "200vh",
          maxHeight: "999999999999999px",
          border: "none",
        }}
        data={white_paper_pdf}
        type="application/pdf"
      >
        <p className="pdf-not-work">
          Your web browser doesn't have a PDF plugin. Instead you can{" "}
          <Link to={white_paper_pdf} target="_blank" download>
            click here to download the PDF file.
          </Link>
          <br/>
          <br/>
          <p><a onClick={_goBack}>{`Go back`}</a></p>
        </p>
      </object>
    </main>
  );
}
