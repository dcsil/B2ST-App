import './App.css';

import {BrowserRouter,Routes,Route} from "react-router-dom";
import RestaurantLanding from './components/RestaurantLanding';


export default function App() {
  return (
    <div>

      <BrowserRouter>
      <Routes>
        <Route path="/" element = {<RestaurantLanding/>}></Route>
        
        
      </Routes>
      </BrowserRouter>


    </div>
    
  );
}
