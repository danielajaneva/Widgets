import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Accordions from "./components/Accordions";
import Search from "./components/Search";
import Colors from "./components/Colors";
import Translate from "./components/Translate";
import Header from "./components/Header";

function App() {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Header />

          <Route path="/" exact component={Accordions} />
          <Route path="/search" component={Search} />
          <Route path="/colors" component={Colors} />
          <Route path="/translate" component={Translate} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
