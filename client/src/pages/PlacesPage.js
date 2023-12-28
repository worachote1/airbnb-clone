import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import Perks from '../components/Perks'
import axios from 'axios'
import Swal from 'sweetalert2';
import PhotoUploader from '../components/PhotoUploader';
import AccountNav from '../components/AccountNav';

export default function PlacesPage() {
    const { action } = useParams()
    const [places, setPlaces] = useState([])

    const getAllPlacesByUser = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/places/user`, {
            withCredentials: true
        })
        console.log(data)
        setPlaces([...data])
    }

    useEffect(() => {
        getAllPlacesByUser()
    }, [])

    return (
        <div>
            <AccountNav />
            {
                action !== "new" && (
                    <div>
                        <div className='text-center'>
                            <Link
                                to={"/account/places/new"}
                                className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <div>
                                    Add new places
                                </div>
                            </Link>
                        </div>
                        <div className='mt-4'>
                            {places.length > 0 && places.map(item => (
                                <Link
                                    to={`/account/places/${item._id}`}
                                    className='flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl'>
                                    <div className='w-32 h-32 bg-blue-300 shrink-0'>
                                        {item.photos.length > 0 && (
                                            <img className='w-full h-full object-cover' src={`http://localhost:5000/uploads/${item.photos[0]}`} />
                                        )}
                                    </div>
                                    <div className=''>
                                        <h2 className='text-xl'> {item.title} </h2>
                                        <p className='text-sm mt-2'>{item.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            {/* add place form */}
            {action === "new" && (
                <div>
                    prn44
                </div>
            )}
        </div>
    )
}
