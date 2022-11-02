
import './App.css';

import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import MainPage from './components/main_page';
import SignUp from './components/Authentication/signup';
import SignIn from "./components/Authentication/signin"

import GetPassword from "./components/Authentication/get_psword"


export default function App() {
  return (
    <div>

      <BrowserRouter>
      <Routes>
        <Route path="/" element = {<MainPage/>}></Route>
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element = {<SignIn />}></Route>\
        <Route path="get_password" element = {<GetPassword />}></Route>
        
        
      </Routes>
      </BrowserRouter>


    </div>
    
  );
}



