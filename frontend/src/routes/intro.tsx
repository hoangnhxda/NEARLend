import crypto1 from "../images/crypto_01.png";
import crypto4 from "../images/crypto_04.png";
import crypto5 from "../images/crypto_05.png";
import planet from "../images/planet-3.png";
import cryptoNft from "../images/crypto-nft.png";
import cryptoNftLend from "../images/crypto-nft-lend.png";
import crossChain from "../images/cross-chain.png";
import daoGOV from "../images/dao.png";
import logo from '../images/nearlend.png';

export default function Intro() {
  return (
    <main className="introduce-page">
      <div className="head">
        
        <h2><img className="logo" alt="Nearlend" src={logo} width={45} height={45} />Let The World Be Transparent</h2>
      </div>

      <div className="section-2">
        <div className="wrapper">
          <h3 className="title">
            Nearlend
            <br />
            Dapps for Lending &amp; Borrowing Crypto Asset{" "}
          </h3>
          <div className="flex">
            <p className="img">
              <img src={crypto1} width="100%" height="100%" alt="Crypto 01" />
            </p>
            <p className="content">
              Nearlend is a Near Protocol-based, open-source money market
              protocol aimed at establishing liquidity pools whose interest
              rates are determined by an algorithm based on supply and demand.
              <br />
              <br />
              In essence, Nearlend bridges the gaps between lenders who wish to
              accrue interest from idle funds and borrowers who want to borrow
              tokens to funding for productive or investment use.
            </p>
          </div>
        </div>
      </div>
      <div className="section-2">
        <div className="wrapper">
          <h3 className="title">Why Nearlend?</h3>

          <div className="flex-side">
            <div className="flex-side__side left">
              <p className="img">
                <img src={crypto5} width="100%" height="100%" alt="Crypto 02" />
              </p>
              <h5 className="label">Transparency, Security & Privacy </h5>
              <p className="content">
                Nearlend – the financial hub on Near Protocol, adopted a dynamic
                interest rate model and created more capital-efficient risk
                management pools, allowing a broad selection of collateral types
                to be fully utilized in a safe way.
              </p>
            </div>
            <div className="flex-side__side right">
              <p className="img">
                <img src={crypto4} width="100%" height="100%" alt="Crypto 02" />
              </p>
              <h5 className="label">Liquidity Mining</h5>
              <p className="content">
                Earn <strong>NEL</strong> token as rewards by using services &
                liquidity staking.
              </p>
            </div>
          </div>

          <div className="flex-side">
            <div className="flex-side__side left">
              <p className="img">
                <img
                  src={cryptoNft}
                  width="100%"
                  height="100%"
                  alt="Crypto 02"
                />
              </p>
              <h5 className="label">NFT for Rent</h5>
              <p className="content">
                Transfer NFT’s commercial rights and receive recurring rental
                fees.
              </p>
            </div>
            <div className="flex-side__side right">
              <p className="img">
                <img
                  src={cryptoNftLend}
                  width="100%"
                  height="100%"
                  alt="Crypto 02"
                />
              </p>
              <h5 className="label">NFT Lending</h5>
              <p className="content">
                Put your NFT assets up as collateral for a loan, or offer loans
                to other users on their non-fungible tokens.
              </p>
            </div>
          </div>

          <div className="flex-side">
            <div className="flex-side__side left">
              <p className="img">
                <img
                  src={crossChain}
                  width="100%"
                  height="100%"
                  alt="Crypto 02"
                />
              </p>
              <h5 className="label">Cross-Chain Compatibility</h5>
              <p className="content">
                In a world where businesses rely on ever-increasing levels of
                collaboration and interaction, it is easy to understand why
                blockchain cross-chain compatibility is not only desirable but
                important.
              </p>
            </div>
            <div className="flex-side__side right">
              <p className="img">
                <img src={daoGOV} width="100%" height="100%" alt="Crypto 02" />
              </p>
              <h5 className="label">DAO Governance</h5>
              <p className="content">
                Decentralized autonomous organizations (DAO) are referred to as
                the next generation of organizational structure, where a
                community of like-minded people is working together towards a
                common interest, without a central authority figure leading the
                way.
              </p>
            </div>
          </div>

          {/* <div className="last">
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
          </div> */}
        </div>
      </div>

      {/* RoadMap 2 */}
      <div className="roadmap">
        <div className="container position-relative section-bot">
          <h3 className="title tac fz34 mb-44 bold">ROAD MAP</h3>
          <div className="wrap-line position-relative">
            <div className="wrap">
              <p className="planet grayscale">
                <img alt="Planet" src={planet} width={40} height={40} />
              </p>
              <div className="phase left">
                <h4>Phase 1</h4>
                <h5 className="bold">Q1/2022</h5>
                <div className="content color-gray">
                  <p>Testnet Launch</p>
                </div>
              </div>
            </div>
            <div className="wrap">
              <p className="planet grayscale">
                <img alt="Planet" src={planet} width={40} height={40} />
              </p>
              <div className="phase right">
                <h4>Phase 2</h4>
                <h5 className="bold">Q2/2022</h5>
                <div className="content color-gray">
                  <p>Tokenomic issuance &amp; Seed funding</p>
                </div>
              </div>
            </div>
            <div className="wrap">
              <p className="planet grayscale">
                <img alt="Planet" src={planet} width={40} height={40} />
              </p>
              <div className="phase left">
                <h4>Phase 3</h4>
                <h5 className="bold">Q3/2022</h5>
                <div className="content color-gray">
                  <p>Price Feeds Integration &amp; Security Audit</p>
                </div>
              </div>
            </div>
            <div className="wrap">
              <p className="planet grayscale">
                <img alt="Planet" src={planet} width={40} height={40} />
              </p>
              <div className="phase right">
                <h4>Phase 4</h4>
                <h5 className="bold">Q4/2022</h5>
                <div className="content color-gray">
                  <p>Mainnet Launch</p>
                </div>
              </div>
            </div>
            <div className="wrap">
              <p className="planet grayscale">
                <img alt="Planet" src={planet} width={40} height={40} />
              </p>
              <div className="phase left">
                <h4>Phase 4</h4>
                <h5 className="bold">Q1/2023</h5>
                <div className="content color-gray">
                  <p>Cross-chain integrations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end RoadMap 2 */}

      <footer>
        "a small group of young developers from Vietnam decided to gather and
        jointly develop Nearlend - Dapp that provides lending and borrowing
        services on Near Protocol."
      </footer>
    </main>
  );
}
