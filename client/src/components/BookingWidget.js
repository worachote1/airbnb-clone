import React, { useState } from 'react'
import { differenceInCalendarDays } from "date-fns";

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [numbrOfGuests, setNumberOfGuests] = useState(1)
    const [name,setName] = useState('')
    const [mobile,setMobile] = useState('')
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
                        <input type='tel' value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </div>
                )}
            </div>
            <button className='primary mt-4'>
                Book this place
                {numberOfDate > 0 && (
                    <span>{numberOfDate * place.price}</span>
                )}
            </button>
        </div>
    )
}
