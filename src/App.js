import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Home/HomePage";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </div>
    );
}

export default App;
