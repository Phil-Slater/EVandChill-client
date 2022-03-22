import React from "react";
import { Link } from "react-router-dom";

import logoSm from "./evandchill-lo.png";
import "./Header.css";
import MenuIcon from "./MenuIcon";
import SearchBox from "./SearchBox";

const Header = () => {
    return (
        <header className="header">
            <Link to="/">
                <img src={logoSm} alt="EV and Chill logo" />
            </Link>
            <SearchBox />
            <MenuIcon />
        </header>
    );
};

export default Header;
