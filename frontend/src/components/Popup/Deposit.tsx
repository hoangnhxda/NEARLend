import { useEffect } from "react";
import iconShib from "../../images/icon-shib.png";
import iconClose from "../../images/icon-close.png";
import { InputNumber, Slider } from "antd";

type Props = {
  setTurnOff: Function;
};
const Deposit = ({ setTurnOff }: Props) => {
  const marks = {
    0: "0%",
    25: "25%",
    50: "50%",
    75: "75%",
    100: "100%",
  };

  // should debounce
  function formatter(value: any) {
    // console.log(value)
    return `${value.toString()}%`;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const htmlEle = window.document.getElementsByTagName("html")[0];
      htmlEle.classList.add("popup-open");
    }
    return () => {
      const htmlEle = window.document.getElementsByTagName("html")[0];
      htmlEle.classList.remove("popup-open");
    };
  }, []);

  return (
    <div className="wrap-popup">
      <div className="popup">
        <p className="icon-close" onClick={() => setTurnOff()}>
          <img alt="icon-close" src={iconClose} width={12} height={12} />
        </p>
        <div className="Ocean">
          <svg className="Wave" viewBox="0 0 12960 1120">
            <path d="M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z">
              <animate
                dur="5s"
                repeatCount="indefinite"
                attributeName="d"
                values="
              M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z;
              M9720,0C8100,0,8100,319,6480,319S4860,0,3240,0,1620,320,0,320v800H12960V320C11340,320,11340,0,9720,0Z;
              M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z
            "
              />
            </path>
          </svg>
        </div>
        <h4 className="title">DEPOSIT</h4>
        <p className="icon">
          <img
            className="icon"
            src={iconShib}
            width={54}
            height={54}
            alt="Logo"
          />
        </p>
        <p className="icon-name">Shiba</p>
        <p className="value-percent">0.03%</p>
        <div className="bg-white position-relative wrap-white">
          <div className="info bg-white pad-side-14">
            <p>Available: 99.9785 SHIB ($0.00)</p>
            <p className="tar">1 SHIB = $16.9718</p>
          </div>
          <div className="pad-side-14">
            <InputNumber
              className="input-number"
              defaultValue={1000}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              // parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              // onChange={onChange}
            />
          </div>
          <div
            id="slider-range"
            className="position-relative slider-range bg-white"
          >
            <Slider
              marks={marks}
              step={1}
              tipFormatter={formatter}
              getTooltipPopupContainer={(): any =>
                document?.getElementById("slider-range")
              }
            />
          </div>

          <p className="position-relative total bg-white">
            Total Supply = $831.44
          </p>
          <p className="position-relative rates-title fwb bg-white pad-side-14">
            Supply Rates
          </p>
          <div className="position-relative flex bg-white pad-side-14">
            <div className="left">Deposit APY</div>
            <div className="right fwb">0.028533093636258104</div>
          </div>
          <div className="position-relative flex bg-white pad-side-14">
            <div className="left">Collateral Factor</div>
            <div className="right fwb">60%</div>
          </div>
          <div className="position-relative flex bg-white pad-side-14">
            <div className="left">Use as Collateral</div>
            <div className="right fwb">
              <label className="switch">
                <input className="input-slider" type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          <button className="position-relative btn">DEPOSIT</button>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
