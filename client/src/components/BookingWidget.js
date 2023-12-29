import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from "date-fns";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../UserContext';

export default function BookingWidget({ place }) {
    const {user} = useContext(userContext)
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [numbrOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate();

    const bookThisPlace = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/bookings`, {
                checkIn, checkOut, numbrOfGuests, phone, name, place: place._id, price: numberOfDate * place.price
            }, {
                withCredentials: true
            }) 
            console.log(data)
            navigate(`/account/bookings/${data._id}`)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        if(user){
            setName(user.name)
        }
    },[user])

    let numberOfDate = 0;
    if (checkIn && checkOut) {
        numberOfDate = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }
    return (
        <div className='bg-white shadow p-4 rounded-2xl'>
            <div className='text-2xl text-center'>
                Price: {place.price} / per night
            </div>
            <div className='border rounded-2xl mt-4'>
                <div className='flex'>
                    <div className='py-3 px-4 '>
                        <label>Check in:</label>
                        <input type='date' value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                    </div>
                    <div className='py-3 px-4 border-t'>
                        <label>Check out:</label>
                        <input type='date' value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                    </div>
                </div>
                <div className='py-3 px-4 border-t'>
                    <label>Number of guests:</label>
                    <input type='number' value={numbrOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} />
                </div>
                {numberOfDate > 0 && (
                    <div className='py-3 px-4 border-t'>
                        <label>Your name:</label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        <label>Phone number:</label>
                        <input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                )}
            </div>
            <button onClick={bookThisPlace} className='primary mt-4'>
                Book this place
                {numberOfDate > 0 && (
                    <span>{numberOfDate * place.price}</span>
                )}
            </button>
        </div>
    )
}
