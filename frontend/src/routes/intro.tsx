import imgProtocol from "../images/protocol.png";
import imgPoolmoney from "../images/pool-money.jpg";
import crypto1 from "../images/crypto_01.png";
import crypto2 from "../images/crypto_02.png";
import crypto3 from "../images/crypto_03.png";
import crypto4 from "../images/crypto_04.png";
import crypto5 from "../images/crypto_05.png";
import crypto6 from "../images/crypto_07.png";
import planet1 from "../images/planet-1.png";
import planet2 from "../images/planet-2.png";
import planet3 from "../images/planet-3.png";
import planet4 from "../images/planet-4.png";

export default function Intro() {
  return (
    <main className="introduce-page">
      <div className="head">
        <h2>Let The World Be Transparent</h2>
      </div>

      <div className="section-2">
        <div className="wrapper">
          <h3 className="title">DeFi on NEARLend</h3>
          <div className="flex">
            <p className="img">
              <img src={crypto1} width="100%" height="100%" alt="Crypto 01" />
            </p>
            <p className="content">
              Defi, the acronym for Decentralized Finance, is now one of the
              fastest-growing sectors in the blockchain and cryptocurrency
              market.
              <br />
              <br />
              As we have already familiar with, the primary services in the
              financial industry are lending and borrowing of crypto assets,
              which are based on the concept of credit and collateralization.
            </p>
          </div>
        </div>
      </div>
      <div className="section-2 section-3">
        <div className="wrapper">
          <h3 className="title">What is NEARLend</h3>
          <div className="flex">
            <p className="img">
              <img src={crypto2} width="100%" height="100%" alt="Crypto 02" />
            </p>
            <p className="content">
              Nearlend – the financial hub on Near Protocol, adopted a dynamic
              interest rate model and created more capital-efficient risk
              management pools, allowing a broad selection of collateral types
              to be fully utilized in a safe way.
            </p>
          </div>
          <div className="last">
            <p>
              Defi is a very new field, and there is a lot of knowledge that
              needs to be updated to build a test-net for Nearlend.
            </p>
            <p>
              Researching a new governance model to ensure the long-term
              development of Nearlend.
            </p>
            <p>
              And the biggest challenge is the consensus of the founding members
              of Nearlend
            </p>
          </div>
        </div>
      </div>

      {/* RoadMap 2 */}
      <div className="roadmap">
        <div className="container position-relative section-bot">
          <h3 className="title tac fz34 mb-44 bold">ROAD MAP</h3>
          <div className="wrap-line position-relative">
            <div className="wrap">
              <p className="planet">
                <img alt="Planet" src={planet1} width={40} height={40} />
              </p>
              <div className="phase left">
                <h4>Phase 1</h4>
                <h5 className="bold">Q1/2022</h5>
                <div className="content color-gray">
                  <p>Launching testnet</p>
                </div>
              </div>
            </div>
            <div className="wrap">
              <p className="planet">
                <img alt="Planet" src={planet2} width={40} height={40} />
              </p>
              <div className="phase right">
                <h4>Phase 2</h4>
                <h5 className="bold">Q2-Q3/2022</h5>
                <div className="content color-gray">
                  <p>Tokenomic release &amp; seed funding</p>
                </div>
              </div>
            </div>
            <div className="wrap">
              <p className="planet">
                <img alt="Planet" src={planet3} width={40} height={40} />
              </p>
              <div className="phase left">
                <h4>Phase 3</h4>
                <h5 className="bold">Q4/2022</h5>
                <div className="content color-gray">
                  <p>Launching mainnet</p>
                </div>
              </div>
            </div>
            {/* <div className="wrap">
              <p className="planet">
                <img alt="Planet" src={planet4} width={40} height={40} />
              </p>
              <div className="phase right">
                <h4>Phase 4</h4>
                <h5 className="bold">Title</h5>
                <div className="content color-gray">
                  <p>
                    • Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium.
                    <br />
                    • ed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, <br />• ed ut
                    perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque lau
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* end RoadMap 2 */}
    </main>
  );
}
