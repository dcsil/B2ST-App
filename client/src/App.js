import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pricing from './pages/Pricing';
import Dashboard from "./pages/dashboard/Dashboard";
import SMSBoard from "./pages/smsboard/SMSBoard";
import Profile from "./pages/dashboard/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/dashboard/sms" element={<SMSBoard/>} />
        <Route path="/dashboard/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
