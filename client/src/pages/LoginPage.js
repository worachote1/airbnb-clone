import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios';

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const alertLoginSuccess = () => {
        Swal.fire({
          title: "Login Successful",
          text: "xxx",
          icon: "success"
        });
      }

    const alertLoginFail = () => {
        Swal.fire({
          title: "Login failed",
          text: "Please try again later",
          icon: "error"
        });
      }
    
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post(`${process.env.REACT_APP_API}/auth/login`,{email,password}) 
            alertLoginSuccess()
        }catch(err)
        {
            alertLoginFail()
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
