import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Home/HomePage";

function App() {
    return (
        <div className="App">
            <div className="app-container">
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
