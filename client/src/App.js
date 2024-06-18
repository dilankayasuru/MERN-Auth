import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Messages from "./Components/Messages";
import Admin from "./Components/Admin";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/message" element={<Messages/>}/>
                        <Route path="/admin" element={<Admin/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
