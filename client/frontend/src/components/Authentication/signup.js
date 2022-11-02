import "./signup.css"
import {Link} from "react-router-dom";
import React, { useState } from 'react';
const print = console.log
const SignUp = () => {
  const [name, setName] = useState("")
  const [restaurant, setRestaurant] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordShown, setPasswordShown] = useState(false)
  const [confirm_p, setConfirm_p] = useState("")
  const [confirm_pShown, setConfirm_PShown] = useState(false)
  

  


    return (
      <div>
        <div className="signup_container">
          <h1>Create Account</h1>
          

          <input type="text" placeholder="Name" onChange={(e) => {setName(e.target.value)}}/>
          <input type="text" placeholder="Restaurant" onChange={(e) => {setRestaurant(e.target.value)}}/>
          <input type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type={passwordShown? "text":"password"} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
          <button onClick={(e)=>{setPasswordShown(! passwordShown)}}>{!passwordShown? "Show Password" :"Hide Password"}</button>
          <input type={confirm_pShown? "text":"password"} placeholder="Confirm Password" onChange={(e)=>{setConfirm_p(e.target.value)}}/>
          <button onClick={(e)=>{setConfirm_PShown(! confirm_pShown)}}>{!confirm_pShown? "Show Confimation" :"Hide Confimation"}</button>
          <button id="sign_up_button">Sign Up</button>
          <div>
            Already a member?  <Link to="/signin"><button>Sign in</button></Link>   
          </div>
        </div>
        <div className="current_state_container">
          <h2>
            Current State

          </h2>
          <div>Name: {name}</div>
          <div>Restaurant: {restaurant}</div>
          <div>Email: {email}</div>
          <div>Does email contains "@"? {email.includes("@")?    "---Yes, Valid Email": "---No, Invalid Email"}</div>
          <div>Passwords are matching: {password === confirm_p? "True": "False"}</div>
          <div>Password contains at least one number: {/\d/.test(password)? "True": "False"}</div>
          <div>Password contains at least one uppercase letter: {/[A-Z]/.test(password)? "True": "False"}</div>
        </div>

        


        <div>
        <Link to="/">Back to main page</Link>
        </div>
      </div>
    );
  }

export default SignUp