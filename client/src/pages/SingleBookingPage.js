import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaceGallery from '../components/PlaceGallery'
import { differenceInCalendarDays, format } from 'date-fns'
import { formatNumberInput } from '../util/formatUtil'

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
        <div className='my-8 '>
            <div className='prn-test-layout 2xl:w-3/5 2xl:mx-auto '>
                <h1 className='text-3xl '>{booking.place.title}</h1>
                <a className='flex gap-1 my-3  font-semibold underline' target='_blank' href={`https://maps.google.com/?q=${booking.place.address}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    {booking.place.address}
                </a>
                <div className='bg-gray-200 p-6 my-6 rounded-2xl flex justify-between items-center'>
                    <div>
                        <h2 className='text-2xl mb-4'> Your booking information: </h2>
                        {/* booking data */}
                        <div className='flex items-center gap-1 mb-2 mt-2 text-gray-500 '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                            {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} days
                            <div className='flex gap-1 items-center ml-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                                {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
                                &rarr;
                            </div>
                            <div className='flex gap-1 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                                {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                            </div>
                        </div>
                    </div>
                    <div className='bg-primary p-6 text-white rounded-2xl'>
                        <div> Total price</div>
                        <div className='text-3xl'> ${formatNumberInput(booking.price)} </div>
                    </div>
                </div>
                {/* PlaceGallery Component */}
                <PlaceGallery place={booking.place} />
            </div>
        </div>
    )
}
