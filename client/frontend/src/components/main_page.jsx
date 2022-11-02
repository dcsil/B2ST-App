import {Link} from "react-router-dom";


export default function MainPage() {
    return (
      <div>
        <h2>This is the main page of b2st. </h2>
        <Link to="/signup"> Sign Up </Link>
        <br></br>
        <Link to="/signin">Sign In</Link>
      </div>
    );
  }