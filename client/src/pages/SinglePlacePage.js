import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../components/BookingWidget'

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

    if (showAllPhotos) {
        return (
            <div className='absolute inset-0 bg-black text-white h-screen'>
                <div className=' p-8 grid bg-black gap-4'>
                    <div className=''>
                        <h2 className='text-3xl'>Photos of {place.title}</h2>
                        <button
                            onClick={() => setShowAllPhotos(false)}
                            className='fixed flex right-12 top-8 gap-1 py-2 px-4 rounded-2xl bg-white text-black shadow shadow-black'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            Close photos
                        </button>
                    </div>
                    {/* w-4/12 mx-auto grid gap-2 */}
                    <div className=' mx-auto grid gap-2'>
                        {place?.photos?.length > 0 && place.photos.map(item => (
                            <div className=''>
                                <img className='aspect-square object-cover mx-auto' src={`http://localhost:5000/uploads/${item}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        )
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

                <div className='relative'>
                    <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden'>
                        <div className=''>
                            {place?.photos[0] && (
                                <div className=''>
                                    {/* className='aspect-square object-cover' */}
                                    <img 
                                    onClick={() => setShowAllPhotos(true)}
                                    className='aspect-square object-cover cursor-pointer' src={`http://localhost:5000/uploads/${place?.photos[0]}`} />
                                </div>
                            )}
                        </div>
                        <div className='grid '>
                            {place?.photos[1] && (
                                <img 
                                onClick={() => setShowAllPhotos(true)}
                                className='aspect-square object-cover cursor-pointer' src={`http://localhost:5000/uploads/${place?.photos[1]}`} />
                            )}
                            <div className='overflow-hidden'>
                                {place?.photos[2] && (
                                    <img 
                                    onClick={() => setShowAllPhotos(true)}
                                    className='aspect-square object-cover relative top-2 cursor-pointer' src={`http://localhost:5000/uploads/${place?.photos[2]}`} />
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAllPhotos(true)}
                        className='flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                        </svg>

                        Show more
                    </button>
                </div>
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
