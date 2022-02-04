import bitcoin from "../images/token/bitcoin.png";
import nft_circle from "../images/nft_circle.jpeg";
import nft_car from "../images/nft_car.jpeg";
import nft_city from "../images/nft_city.jpeg";
import nft_samurai from "../images/nft_samurai.jpeg";
import nft_flow from "../images/nft_flow.jpeg";
import nft_hand from "../images/nft_hand.jpeg";

import { HeartFilled, CheckCircleFilled } from "@ant-design/icons";
import { Carousel } from "antd";
import { Link } from "react-router-dom";

const dataTemp = [
  {
    asset: nft_circle,
    name: "Crazy Lizard Army #9029",
    price: 0.5,
    token: "bitcoin",
    tokenImg: bitcoin,
    creator: "Lizardle",
    owner: "Batman",
    type: "image",
    liked: 20,
    isCreatorVerified: false,
    desc: "Our vision is to create a metaverse guild that spans multiple games and communities. Badass Ape Guild is not just a PFP project. Each Badass Ape doubles as a guild membership card. Badass Ape Guild's footprints will be all over the metaverse, and you are the founders of Badass Ape Guild. Badass Ape Guild contains a total of 3333 Genesis NFTs.",
  },
  {
    asset: nft_samurai,
    name: "Samurai #9666",
    price: 0.5,
    token: "bitcoin",
    tokenImg: bitcoin,
    creator: "Author Pod",
    owner: "Yaa",
    type: "image",
    liked: 20,
    isCreatorVerified: false,
    desc: "Our vision is to create a metaverse guild that spans multiple games and communities. Badass Ape Guild is not just a PFP project. Each Badass Ape doubles as a guild membership card. Badass Ape Guild's footprints will be all over the metaverse, and you are the founders of Badass Ape Guild. Badass Ape Guild contains a total of 3333 Genesis NFTs.",
  },
  {
    asset:
      "https://public.nftstatic.com/static/nft/zipped/38be5d8e2eac425cb87e714380cc91f1_zipped.gif",
    name: "Evil 13 #9029",
    price: 0.5,
    token: "bitcoin",
    tokenImg: bitcoin,
    creator: "Ghost Market",
    owner: "Ghost Market",
    type: "gif",
    liked: 20,
    isCreatorVerified: false,
    desc: "Our vision is to create a metaverse guild that spans multiple games and communities. Badass Ape Guild is not just a PFP project. Each Badass Ape doubles as a guild membership card. Badass Ape Guild's footprints will be all over the metaverse, and you are the founders of Badass Ape Guild. Badass Ape Guild contains a total of 3333 Genesis NFTs.",
  },
  {
    asset: nft_hand,
    name: "Diamond Hand #9998",
    price: 0.5,
    token: "bitcoin",
    tokenImg: bitcoin,
    creator: "HooHoo",
    owner: "Lalie",
    type: "image",
    liked: 20,
    isCreatorVerified: false,
    desc: "Our vision is to create a metaverse guild that spans multiple games and communities. Badass Ape Guild is not just a PFP project. Each Badass Ape doubles as a guild membership card. Badass Ape Guild's footprints will be all over the metaverse, and you are the founders of Badass Ape Guild. Badass Ape Guild contains a total of 3333 Genesis NFTs.",
  },
  {
    asset:
      "https://media2.giphy.com/media/gNzDiRiZS3SXS/giphy.gif?cid=dda24d50dhf6fc87axeagu3wxh2r99uftqrqf1wmooauz84s&rid=giphy.gif",
    name: "NEO #844",
    price: 0.5,
    token: "bitcoin",
    tokenImg: bitcoin,
    creator: "Guuroo",
    owner: "Lalie",
    type: "gif",
    liked: 20,
    isCreatorVerified: false,
    desc: "Our vision is to create a metaverse guild that spans multiple games and communities. Badass Ape Guild is not just a PFP project. Each Badass Ape doubles as a guild membership card. Badass Ape Guild's footprints will be all over the metaverse, and you are the founders of Badass Ape Guild. Badass Ape Guild contains a total of 3333 Genesis NFTs.",
  },
  {
    asset: nft_flow,
    name: "Digital Flower #842",
    price: 0.5,
    token: "bitcoin",
    tokenImg: bitcoin,
    creator: "Batman",
    owner: "CatWoman",
    type: "image",
    liked: 20,
    isCreatorVerified: true,
    desc: "Our vision is to create a metaverse guild that spans multiple games and communities. Badass Ape Guild is not just a PFP project. Each Badass Ape doubles as a guild membership card. Badass Ape Guild's footprints will be all over the metaverse, and you are the founders of Badass Ape Guild. Badass Ape Guild contains a total of 3333 Genesis NFTs.",
  },
  {
    asset:
      "https://storage.opensea.io/files/75f0fe112ecd1e6242c373b723889e42.mp4#t=0.001",
    name: "Never Forever Sydney #844",
    price: 0.5,
    token: "bitcoin",
    tokenImg: bitcoin,
    creator: "Flight_Facilities",
    owner: "Flight_Facilities",
    type: "video",
    liked: 20,
    isCreatorVerified: true,
    desc: "Our vision is to create a metaverse guild that spans multiple games and communities. Badass Ape Guild is not just a PFP project. Each Badass Ape doubles as a guild membership card. Badass Ape Guild's footprints will be all over the metaverse, and you are the founders of Badass Ape Guild. Badass Ape Guild contains a total of 3333 Genesis NFTs.",
  },
];

export default function Marketplace() {
  return (
    <main className="marketplace">
      <Carousel autoplay>
        <div>
          <div
            className="single-slide"
            style={{
              background: `url(${nft_circle}) no-repeat center 70% / cover`,
            }}
          ></div>
        </div>
        <div>
          <div
            className="single-slide single-slide-2"
            style={{
              background: `url(${nft_city}) no-repeat center 70% / cover`,
            }}
          ></div>
        </div>
        <div>
          <div
            className="single-slide single-slide-3"
            style={{
              background: `url(${nft_car}) no-repeat center 70% / cover`,
            }}
          ></div>
        </div>
      </Carousel>
      <div className="list-card">
        <div className="container">
          <div className="wrap-card">
            {dataTemp.map((item: any, idx: number) => {
              return (
                <Link
                  key={idx}
                  state={item}
                  to={{
                    pathname: "/nft-detail",
                  }}
                >
                  <div className="card">
                    <div className="wrap-img">
                      <div className="like">
                        {item.liked} <HeartFilled />
                      </div>
                      <div className="img">
                        {item.type === "video" ? (
                          <video
                            className="video-background"
                            autoPlay={true}
                            loop
                            muted
                            playsInline
                            controls
                            src={item.asset}
                          ></video>
                        ) : (
                          <img
                            src={item.asset}
                            alt={item.asset}
                            width="198"
                            height="198"
                          />
                        )}
                      </div>
                    </div>
                    <h3 className="card-name">{item.name}</h3>
                    <div className="card-price">
                      <div className="left price-text">
                        <p>Price</p>
                      </div>
                      <div className="right">
                        <div className="price">
                          <p className="icon-token">
                            <img
                              src={item.tokenImg}
                              alt={item.token}
                              width={24}
                              height={24}
                            />
                          </p>
                          <p className="price-token">
                            {item.price} {item.token}
                          </p>
                        </div>
                        <p className="price-usd">
                          <span style={{ fontSize: 25 }}>&#8771;</span>150k usd
                        </p>
                      </div>
                    </div>
                    <div className="card-price">
                      <div className="left">
                        <p>Creator</p>
                      </div>
                      <div className="right">
                        <p className="price">
                          {item.isCreatorVerified ? (
                            <span className="creator-verified">
                              <CheckCircleFilled />
                            </span>
                          ) : null}
                          {item.creator}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
