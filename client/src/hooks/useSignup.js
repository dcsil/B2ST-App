import { useState } from "react";
import {useAuthContext} from "./useAuthContext"
import { handleAuthContext } from "./requests/communication";
const api_url = process.env.NODE_ENV === "production" ? process.env.REACT_APP_HEROKU_HOST : process.env.REACT_APP_API_URL;

export const useSignup = ()=>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)    
    const {dispatch} = useAuthContext()
    const signup = async(firstname, lastname, email, password) =>{
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${api_url}/user/signup`, { //localhost:4000 is included in package.json
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({firstname, lastname, email, password})
        })
        handleAuthContext(setIsLoading, setError, dispatch, response, "LOGIN")
    }
    return {signup, isLoading, error}
}