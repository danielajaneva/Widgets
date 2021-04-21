import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Accordion
      </Link>
      <Link to="/search" className="item">
        Search
      </Link>
      <Link to="/colors" className="item">
        Colors
      </Link>
      <Link to="/translate" className="item">
        Translate
      </Link>
    </div>
  );
}

export default Header;
