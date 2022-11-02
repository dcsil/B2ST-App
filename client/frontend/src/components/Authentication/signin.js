import {Link} from "react-router-dom";
import React, { useState } from 'react';
import "./signin.css"
const SignIn = () =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordShown, setPasswordShown] = useState(false)

    return (
        <div>
            <div className="signin_container">
                <h1>Sign In</h1>
                <input type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type={passwordShown? "text":"password"} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <button onClick={(e)=>{setPasswordShown(! passwordShown)}}>{!passwordShown? "Show Password" :"Hide Password"}</button>
                <div>
                    Don't have an account?  <Link to="/signup"><button>Sign up</button></Link>   
                </div>
                <div>
                     <Link to="/get_password"><button>Forget your password?</button></Link>   
                </div>

            </div>



        <div>
            <Link to="/">Back to main page</Link>
        </div>
        </div>
    )
}

export default SignIn