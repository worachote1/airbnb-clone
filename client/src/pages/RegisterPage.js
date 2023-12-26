import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const alertRegisterSuccess = () => {
    Swal.fire({
      title: "Registration Successful",
      text: "Now you can log in",
      icon: "success"
    });
  }

  const alertRegisterFail = (errData) => {
    Swal.fire({
      title: "Registration failed",
      text: errData,
      icon: "error"
    });
  }

  const registerUser = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.REACT_APP_API}/auth/register`, {
        name, email, password
      })
      alertRegisterSuccess()
    }
    catch (err) {
      alertRegisterFail(err.response.data.message)
    }
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto ' onSubmit={registerUser}>
          <input type='text' placeholder='John Doe'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input type='email' placeholder={'test@email.com'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type='password' placeholder={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='primary'>Register</button>
          <div className='text-center py-2 text-gray-500'>
            Already a member?
            <Link className='underline text-black' to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
