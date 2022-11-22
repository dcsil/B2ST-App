import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pricing from './pages/Pricing';
import Dashboard from "./pages/dashboard/Dashboard";
import SMSBoard from "./pages/smsboard/SMSBoard";
import { useAuthContext } from "./hooks/useAuthContext"
function App() {
  const {user} = useAuthContext()


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user? <Dashboard></Dashboard>: <Home></Home>} />
        <Route path="/login" element={user? <Navigate to="/"></Navigate> : <Login></Login>} />
        <Route path="/register" element={user? <Navigate to="/"></Navigate>: <Register></Register>} />
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/dashboard" element={user? <Dashboard></Dashboard>: <Navigate to="/"></Navigate>}/>
        <Route path="/dashboard/sms" element={user? <SMSBoard/> : <Navigate to="/"></Navigate>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
