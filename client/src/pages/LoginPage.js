import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios';
import { userContext } from '../UserContext';

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const { setUser } = useContext(userContext)
    const alertLoginSuccess = () => {
        Swal.fire({
            title: "Login Successful",
            text: "",
            icon: "success"
        });
    }

    const alertLoginFail = (errData) => {
        Swal.fire({
            title: "Login failed",
            text: errData,
            icon: "error"
        });
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const logInUser = await axios.post(`${process.env.REACT_APP_API}/auth/login`, { email, password }, {
                withCredentials: true
            })
            setUser(logInUser.data)
            alertLoginSuccess()
            navigate('/')
        } catch (err) {
            console.log(err)
            alertLoginFail(err.response.data.message)
        }
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
                    <input type='email' placeholder={'test@email.com'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type='password' placeholder={'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='login primary'>Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        Don't have an account yet?
                        <Link className='underline text-black' to={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
