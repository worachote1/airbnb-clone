import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../components/BookingWidget'
import PlaceGallery from '../components/PlaceGallery'

export default function SinglePlacePage() {
    const { id } = useParams()
    const [place, setPlace] = useState(null)
    const [showAllPhotos, setShowAllPhotos] = useState(false)

    const getPlaceById = async (id) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/places/${id}`)
            setPlace(data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (!id) {
            return;
        }
        getPlaceById(id)
    }, [id])

    if (!place) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8 '>
            <div className='prn-test-layout 2xl:w-3/5 2xl:mx-auto '>
                <h1 className='text-2xl '>{place.title}</h1>
                <a className='flex gap-1 my-3  font-semibold underline' target='_blank' href={`https://maps.google.com/?q=${place.address}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                    {place.address}
                </a>

                {/* Place Gallery */}
                <PlaceGallery place={place}/>

                <div className='grid gap-8 mt-8 mb-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
                    <div className=''>
                        <div className='my-4'>
                            <h2 className='font-semibold text-2xl'>Description</h2>
                            {place.description}
                        </div>
                        Check-in: {place.checkIn} <br />
                        Check-out: {place.checkOut} <br />
                        Max number of guests: {place.maxGuests}
                    </div>
                    <div>
                        <BookingWidget place={place} />
                    </div>
                </div>
                <div className='bg-white px-8 py-8 border-t'>
                    <div>
                        <h2 className='font-semibold text-2xl'>Extra info</h2>
                    </div>
                    <div className='mt-2 mb-4 text-sm text-gray-700 leading-5'>
                        {place.extraInfo}
                    </div>
                </div>
            </div>
        </div>
    )
}
