import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const userContext = createContext({});

export const UserContextProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [ready,setReady] = useState(false)

    useEffect(()=>{
        if(!user){
             axios.get(`${process.env.REACT_APP_API}/auth/profile`,{ 
                withCredentials: true
            }).then(({data}) => {
                setUser(data)
                setReady(true)
            })
        }
    },[])
    return (
        <userContext.Provider value={{user, setUser, ready}}>
            {children}
        </userContext.Provider>
    )
}