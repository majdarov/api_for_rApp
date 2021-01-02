import React from "react";
import "./App.css";
import "./css/fontawesome.css";
import "./css/solid.css";
import "./css/regular.css";
import "./css/brands.css";
import { Route } from "react-router-dom";
import Game from "./components/Game/Game";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import MuzikContainer from "./components/Muzik/MuzikContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import CommodityContainer from "./components/Commodity/CommodityContainer";
import ImpExcel from "./components/ImpExcel/ImpExcel";
import Wrapper from "./components/Example/Wrapper";
import IdbTest from "./components/IdbTest/IdbTest";
import Main from "./components/Main/Main";

const App = () => {

  return (
    <div className="app">
      <HeaderContainer />
      <NavbarContainer />
      <div className="app-content">
        <Route exact path="/" component={Main} />
        <Route path="/example" component={Wrapper} />
        <Route path="/muzik" component={MuzikContainer} />
        <Route path="/commodity" component={CommodityContainer} />
        <Route path="/game" component={Game} />
        <Route path="/table" component={ImpExcel} />
        <Route path="/test" component={IdbTest} />
      </div>
    </div>
  );
};

export default App;
