import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pricing from './pages/Pricing';
import Dashboard from "./pages/dashboard/Dashboard";
import SMSBoard from "./pages/smsboard/SMSBoard";
import { useAuthContext } from "./hooks/useAuthContext"

import Plan from "./pages/Plan"


import Campaigns from './pages/campaigns/Campaigns';
import PromotionForecasting from './pages/campaigns/PromotionForcasting';

const ProtectedRoute = ({isAllowed, redirectPath, children}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace/>
  }
  return children ? children : <Outlet/>;
};


function App() {
  const {user} = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>

        <Route index element={<Home/>} />
        <Route element={<ProtectedRoute isAllowed={!user} redirectPath='/dashboard'/>}>
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="pricing" element={<Pricing/>}/>
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!user} redirectPath='/'/>}>
          <Route exact path="dashboard" element={<Dashboard/>}/>
          <Route exact path="dashboard/sms" element={<SMSBoard/>} />
          <Route exact path="dashboard/campaigns" element={<Campaigns/>} />
          <Route exact path="profile" element={<></>} />
          <Route exact path="dashboard/campaigns/forecasting" element={<PromotionForecasting/>} />
          <Route path="/dashboard/plans" element = {user? <Plan></Plan>: <Home></Home>}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
