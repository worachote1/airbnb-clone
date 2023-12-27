import React, { useContext, useState } from 'react'
import AccountNav from '../components/AccountNav';
import axios from "axios";
import { Navigate, useParams } from 'react-router-dom';
import { userContext } from '../UserContext';
import PlacesPage from './PlacesPage';

export default function ProfilePage() {

    const { ready, user, setUser } = useContext(userContext)
    const [redirect, setRedirect] = useState(null)
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    const logout = async () => {
        await axios.post(`${process.env.REACT_APP_API}/auth/logout`, {}, {
            withCredentials: true
        })
        setRedirect("/")
        setUser(null)
    }

    if (!ready) {
        return "Loading..."
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )
}
