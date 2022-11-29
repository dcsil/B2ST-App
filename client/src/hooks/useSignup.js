import { useState } from "react";
import {useAuthContext} from "./useAuthContext"

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
        const json = await response.json()

        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        else{
            // save the user to local storage
            localStorage.setItem("user", JSON.stringify(json))

            //update auth context
            dispatch({type: "LOGIN", payload: json})
            setIsLoading(false)
        }

    }
    return {signup, isLoading, error}
}