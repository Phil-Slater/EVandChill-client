import React, { useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Header from "./components/Header/Header";
import HomePage from "./components/Home/HomePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Sidebar from "./components/Sidebar/Sidebar";
import Profile from "./components/Profile/Profile";

import { clearErrors, toggleMenu } from "./store/actions/actionCreators";
import PageContainer from "./components/common/PageContainer";

import "./App.css";
function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const nodeRef = useRef(null);
    const displayBranch = useSelector((state) => state.display);
    const { isMenuActive, errors } = displayBranch;

    const detectMenuActive = (e) => {
        if (isMenuActive && !e.target.classList.contains("sidebar-menu"))
            dispatch(toggleMenu());
    };

    const resetErrors = () => {
        dispatch(clearErrors());
    };

    const errorItems = errors.map((error, i) => (
        <h3 className="app-error" key={i}>
            {error}
        </h3>
    ));

    return (
        <div className="App" onClick={detectMenuActive}>
            <div className="app-container">
                <Header />
                {errorItems}
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={location.pathname}
                        classNames="page-transition"
                        timeout={400}
                        nodeRef={nodeRef}
                        onExit={resetErrors}
                    >
                        <PageContainer forwardedRef={nodeRef}>
                            <Routes location={location}>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route
                                    path="/users/:id/profile"
                                    element={<Profile />}
                                />
                            </Routes>
                        </PageContainer>
                    </CSSTransition>
                </SwitchTransition>
            </div>
            <Sidebar />
        </div>
    );
}

export default App;
