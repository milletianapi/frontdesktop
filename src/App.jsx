import './App.css';
import {SearchOne} from "./pages/searchOne/SearchOne.jsx";
import {SearchAll} from "./pages/searchAll/SearchAll.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";



function App() {
    return (
        <div className="App w-full">
            <Router>
                <Routes>
                    <Route path="test/*" element={<SearchOne/>} />
                    <Route path="test/searchall/*" element={<SearchAll />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;