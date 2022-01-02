import { Outlet, Link, useLocation } from "react-router-dom";
import Home from "./routes/home";
import Header from "./components/header";

export default function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      <div className="waveWrapper waveAnimation">
        <div className="waveWrapperInner bgTop">
          {/* <div
            className="wave waveTop"
            style={{backgroundImage: `url('http://front-end-noobs.com/jecko/img/wave-top.png')`}}
          ></div> */}
        </div>
        <div className="waveWrapperInner bgMiddle">
          <div
            className="wave waveMiddle"
            style={{backgroundImage: `url('http://front-end-noobs.com/jecko/img/wave-mid.png')`}}
          ></div>
        </div>
        <div className="waveWrapperInner bgBottom">
          <div
            className="wave waveBottom"
            style={{backgroundImage: `url('http://front-end-noobs.com/jecko/img/wave-bot.png')`}}
          ></div>
        </div>
      </div>

      <Header />
      {pathname && pathname.toString() === "/" ? <Home /> : <Outlet />}
    </div>
  );
}
