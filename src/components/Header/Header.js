import React from "react";
import { Link } from "react-router-dom";

import logoSm from "./evandchill-lo.png";

const Header = () => {
    return (
        <header className="header">
            <Link to="/">
                <img src={logoSm} alt="EV and Chill logo" />
            </Link>
        </header>
    );
};

export default Header;
