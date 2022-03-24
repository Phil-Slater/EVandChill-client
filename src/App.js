import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "./store/actions/actionCreators";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useRef } from "react";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const nodeRef = useRef(null);
    const isMenuActive = useSelector((state) => state.display.isMenuActive);

    const detectMenuActive = (e) => {
        if (isMenuActive && !e.target.classList.contains("sidebar-menu"))
            dispatch(toggleMenu());
    };

    return (
        <div className="App" onClick={detectMenuActive}>
            <div className="app-container">
                <Header />
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={location.pathname}
                        classNames="page-transition"
                        timeout={400}
                        nodeRef={nodeRef}
                    >
                        <Routes location={location}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </CSSTransition>
                </SwitchTransition>
            </div>
            <Sidebar />
        </div>
    );
}

export default App;
