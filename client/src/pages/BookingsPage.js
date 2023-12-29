import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AccountNav from '../components/AccountNav'
import axios from 'axios'

export default function BookingsPage() {
    const [bookings, setBookings] = useState([])

    const getBookingDataByCurUser = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/bookings`, {
                withCredentials: true
            })
            setBookings(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getBookingDataByCurUser()
    }, [])

    return (
        <div>
            <AccountNav />
            <div>
                {bookings.length > 0 && bookings.map((item) =>
                (<div>
                    {item.checkIn} -{'>'} {item.checkOut}
                </div>)
                )}

            </div>
        </div>
    )
}
