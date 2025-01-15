import './App.css';
import {SearchOne} from "./pages/searchOne/SearchOne.jsx";
import {SearchAll} from "./pages/searchAll/SearchAll.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Main} from "./pages/main/Main.jsx";


function App() {
    return (
        <div className="App w-full">
            <Router>
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path="/searchone" element={<SearchOne/>} />
                    <Route path="/searchall" element={<SearchAll />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;