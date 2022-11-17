import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pricing from './pages/Pricing';
import Dashboard from "./pages/dashboard/Dashboard";
import Retrieve from "./pages/Retrieve"
import Verification from "./pages/CodeVer"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/retrieve" element={<Retrieve/>}/>
        <Route path="/verification" element={<Verification/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
