import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const userContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)

    const getCurUserData = async () => {
        try {
            if (!user) {
                const { data } = await axios.get(`${process.env.REACT_APP_API}/auth/profile`, {
                    withCredentials: true
                })
                setUser(data)
                setReady(true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCurUserData()
    }, [])
    
    return (
        <userContext.Provider value={{ user, setUser, ready }}>
            {children}
        </userContext.Provider>
    )
}