import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CampaignBoard from "./pages/campaign/CampaignBoard";
import { useAuthContext } from "./hooks/useAuthContext";
import Plan from "./pages/Plan";
import Revenue from "./pages/dashboard/Revenue";
import Error404 from "./pages/Error404";

const ProtectedRoute = ({ isAllowed, redirectPath, children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route
          element={
            <ProtectedRoute isAllowed={!user} redirectPath="/dashboard" />
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!user} redirectPath="/" />}>
          <Route exact path="/dashboard/campaign" element={<CampaignBoard />} />
          <Route
            exact
            path="/dashboard/plans"
            element={user ? <Plan></Plan> : <Home></Home>}
          ></Route>
          <Route exact path="/dashboard" element={<Revenue />} />
          <Route exact path="/profile" element={<></>} />
        </Route>
        <Route exact path="/page-not-found" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/page-not-found" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
