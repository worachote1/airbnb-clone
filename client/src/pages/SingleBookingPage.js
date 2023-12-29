import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function SingleBookingPage() {
    const { id } = useParams()
    const [booking, setBooking] = useState(null)
    const [errCheck, setErrorCheck] = useState(null)

    const getBookingIdById = async (id) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/bookings/${id}`, {
                withCredentials: true
            })
            setBooking(data)
            console.log(data)
        } catch (err) {
            console.log(err)
            setErrorCheck({ ...err.response.data })
        }
    }

    useEffect(() => {
        if (id) {
            getBookingIdById(id)
        }
    }, [id])


    if (errCheck) {
        return (
            <div>
                {errCheck.message}
            </div>)
    }

    if (!booking) {
        return (
            <div>
                Loading...
            </div>)
    }

    return (
        <div>
            SingleBookingPage
        </div>
    )
}
