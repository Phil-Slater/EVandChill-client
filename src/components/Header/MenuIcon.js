import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../store/actions/actionCreators";

const MenuIcon = () => {
    const dispatch = useDispatch();
    const isMenuActive = useSelector((state) => state.display.isMenuActive);

    const [active, setActive] = useState(false);
    const [transition, setTransition] = useState(false);

    const initiateTransition = () => {
        setTransition(true);
        setTimeout(() => {
            setActive(!active);
            setTransition(false);
        }, 250);
    };

    const handleMenuClick = () => {
        if (!transition) {
            initiateTransition();
            dispatch(toggleMenu());
        }
    };

    if (isMenuActive !== active && !transition) {
        initiateTransition();
    }

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
