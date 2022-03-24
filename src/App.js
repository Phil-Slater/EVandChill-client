import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"

function App() {
    return (
        <div className="App">
            <div className="app-container">
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="register" element={<Register/>} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
