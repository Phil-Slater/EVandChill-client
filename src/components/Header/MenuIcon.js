import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../store/actions/actionCreators";

const MenuIcon = () => {
    const dispatch = useDispatch();

    const [active, setActive] = useState(false);
    const [transition, setTransition] = useState(false);

    const handleMenuClick = () => {
        if (!transition) {
            setTransition(true);
            dispatch(toggleMenu());
            setTimeout(() => {
                setActive(!active);
                setTransition(false);
            }, 250);
        }
    };

    return (
        <div
            className={`menu-button ${transition ? "transition" : ""}`}
            onClick={handleMenuClick}
        >
            <i className={`fa-solid fa-${active ? "x" : "bars"}`}></i>
        </div>
    );
};

export default MenuIcon;
