import crypto1 from "../images/crypto_01.png";
import crypto4 from "../images/crypto_04.png";
import crypto5 from "../images/crypto_05.png";
import planet from "../images/planet-3.png";
import cryptoNft from "../images/crypto-nft.png";
import cryptoNftLend from "../images/crypto-nft-lend.png";
import crossChain from "../images/cross-chain.png";
import daoGOV from "../images/dao.png";
import logo from "../images/nearlend-content.png";
import telegram from "../images/telegram.png";
import twitter from "../images/twitter.png";
import discord from "../images/discord.png";
import PieChart from "../components/PieChart";

export default function Intro() {
  return (
    <main className="introduce-page">
      <div className="head">
        <h2>
          <img
            className="logo"
            alt="Nearlend"
            src={logo}
            width={540}
            height={540}
          />
        </h2>
      </div>

      <div className="section-top section-2">
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
              <h5 className="label">Transparency, Security &amp; Privacy </h5>
              <p className="content">
                Nearlend adheres to the fundamental design principles of
                blockchain and believes that these elements are the foundation
                for its long-term growth of marketplace.
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
              <h5 className="label">NFT for Rent &amp; Auctions</h5>
              <p className="content">
                NFT for rent and (or) NFTs will be listed on Nearlend in auction
                format.
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
              <h5 className="label">Community First</h5>
              <p className="content">
                Protocol's fees will be partially share for liquidity providers.
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
        </div>
      </div>

      {/* RoadMap 2 */}
      <div className="roadmap">
        <div className="container position-relative section-bot">
          <h3 className="title tac fz34 mb-44 bold">The Roadmap</h3>
          <div className="wrap-line position-relative">
            <div className="wrap">
              <p className="planet grayscale">
                <img alt="Planet" src={planet} width={40} height={40} />
              </p>
              <div className="phase left">
                <h4>Phase 1</h4>
                <h5 className="bold">Q2/2022</h5>
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
                <h5 className="bold">Q3/2022</h5>
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
                <h5 className="bold">Q4/2022</h5>
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
                <h5 className="bold">Q1/2023</h5>
                <div className="content color-gray">
                  <p>Mainnet Launch</p>
                </div>
              </div>
            </div>
            {/* <div className="wrap">
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
            </div> */}
          </div>
        </div>
      </div>
      {/* end RoadMap 2 */}

      <div className="section-2 tokenomic">
        <div className="wrapper">
          <h3 className="title">NEL Token Distribution</h3>
          <h3 className="tac">Total Supply ??? 1.000.000.000</h3>
          <PieChart />
        </div>
      </div>

      <div className="social-media">
        <div className="container">
          <h3 className="title">Join Our Community</h3>
          <div className="list-social">
            <a
              className="link"
              href="https://twitter.com/NEARLend"
              target="_blank"
              rel="noreferrer"
            >
              <img alt="Twitter" src={twitter} />
            </a>
            <a
              className="link"
              href="https://discord.gg/pXvHhT9rwM"
              target="_blank"
              rel="noreferrer"
            >
              <img alt="Dicord" src={discord} />
            </a>
            <a
              className="link"
              href="https://t.me/+gYhnDfknkRdhMjQ1"
              target="_blank"
              rel="noreferrer"
            >
              <img alt="Telegram" src={telegram} />
            </a>
          </div>
        </div>
      </div>

      <footer>
        "Inspired by the ideas of DeFi, Web3 and DAO, a small group of young
        developers from Vietnam decided to jointly develop Nearlend - Dapp for
        lending and borrowing assets in Near Protocol."
      </footer>
    </main>
  );
}
