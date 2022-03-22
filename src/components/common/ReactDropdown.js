import React from "react";
import { useState } from "react";

import "./ReactDropdown.css";

const ReactDropdown = ({ onChange, options, defaultText }) => {
    const defaultOption = {
        value: null,
        text: defaultText ? defaultText : "Select an option below",
        icon: "fa-solid fa-square-check",
    };
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const [opened, setOpened] = useState(false);

    const handleOpen = () => {
        setOpened(!opened);
    };

    const handleChange = (value, text, icon) => {
        const e = { target: value };
        onChange(e);
        setSelectedOption({ value, text, icon });
        setOpened(false);
    };

    const optionItems = options.map((option) => (
        <div
            key={option.value}
            className="react-dd-option"
            onClick={() => handleChange(option.value, option.text, option.icon)}
        >
            {option.icon && <i className={option.icon}></i>}
            <span>{option.text}</span>
        </div>
    ));

    return (
        <div className={`react-dd ${opened ? "active" : ""}`}>
            <div className="react-dd-selected" onClick={handleOpen}>
                <p>
                    {selectedOption.icon && (
                        <i className={selectedOption.icon}></i>
                    )}
                    <span>{selectedOption.text}</span>
                    <i className="fa-solid fa-caret-down"></i>
                </p>
            </div>
            {opened && (
                <div className="react-dd-container">
                    <div className="react-dd-options">{optionItems}</div>
                </div>
            )}
        </div>
    );
};

export default ReactDropdown;
