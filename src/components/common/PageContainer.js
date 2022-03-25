import React from "react";

import "./PageContainer.css";

const PageContainer = ({ forwardedRef, children }) => {
    return (
        <div className="page-container" ref={forwardedRef}>
            {children}
        </div>
    );
};

export default PageContainer;
