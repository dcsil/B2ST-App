import "./get_psword.css"
import {Link} from "react-router-dom";
import React, { useState } from 'react';


const GetPassword = () => {
    const [email, setEmail] = useState("")


    return (
        <div>
            <h1>Current Email: {email}</h1>
            <h1>Please enter your email you signed in for b2st</h1>
            <input type="text" onChange={(e) => {setEmail(e.target.value)}} />

            <div>
            <Link to="/signin"><button>Back to Sign In</button></Link>   
            </div>
            <button>Get Password!</button>

        </div>
    )
}

export default GetPassword