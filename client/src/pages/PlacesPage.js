import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import Perks from '../components/Perks'
import axios from 'axios'
import Swal from 'sweetalert2';
import PhotoUploader from '../components/PhotoUploader';

export default function PlacesPage() {
    const { action } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState("")
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [maxGuests, setMaxGuest] = useState(1)
    const [redirect, setRedirect] = useState("")

    const [places, setPlaces] = useState([])

    const addNewPlace = async (e) => {
        e.preventDefault()
        try {
            const placeData = { title, address, photos: [...addedPhotos], description, perks, extraInfo, checkIn, checkOut, maxGuests }
            const { data } = await axios.post(`${process.env.REACT_APP_API}/places`, placeData, {
                withCredentials: true
            })
            console.log(data)
            // Reset state variables to their initial values or empty strings
            setTitle('');
            setAddress('');
            setAddedPhotos([]);
            setDescription('');
            setPerks([]);
            setExtraInfo('');
            setCheckIn('');
            setCheckOut('');
            setMaxGuest(1);
            navigate("/account/places")
        }
        catch (err) {
            console.log(err)
        }
    }

    const getAllPlaces = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/places`, {
            withCredentials: true
        })
        console.log(data)
        setPlaces([...data])
    }

    useEffect(() => {
        getAllPlaces()
    }, [])

    return (
        <div>
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
                                to = {`/account/places/${item._id}`}
                                className='flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl'>
                                    <div className='w-32 h-32 bg-blue-300 shrink-0'>
                                        {item.photos.length > 0 && (
                                            <img className='w-full h-full ' src={`http://localhost:5000/uploads/${item.photos[0]}`} />
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
                    <form onSubmit={addNewPlace}>
                        <h2 className='text-2xl mt-4'>Title</h2>
                        <p className='text-gray-500 text-sm'>title for your place.</p>
                        <input type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='title, for example: The finest condo,bedroom partition 35 sq m, high floor, beautiful view' />
                        <h2 className='text-2xl mt-4'>Address</h2>
                        <p className='text-gray-500 text-sm'>address to this place.</p>
                        <input type='text'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='address' />
                        <h2 className='text-2xl mt-4'>Photos</h2>
                        <p className='text-gray-500 text-sm'>Provide sample images of your place.</p>

                        {/* photo uploader component */}
                        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                        <h2 className='text-2xl mt-4'>Description</h2>
                        <p className='text-gray-500 text-sm'>description of the place</p>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                        {/* perk component */}
                        <Perks selected={perks} onChange={setPerks} />

                        <h2 className='text-2xl mt-4'>Extra info</h2>
                        <p className='text-gray-500 text-sm'>Such as resident rules, including other details.</p>
                        <textarea value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />
                        <h2 className='text-2xl mt-4'>Check in&out times</h2>
                        <p className='text-gray-500 text-sm'>add check in and out times, remember to have some time window for cleaning the room between guest</p>
                        <div className='grid gap-2 sm:grid-cols-3'>
                            <div>
                                <h3 className='mt-2 -mb-2'>Check in time</h3>
                                <input type='text' value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    placeholder='14' />
                            </div>
                            <div>
                                <h3 className='mt-2 -mb-2'>Check out time</h3>
                                <input type='text' value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    placeholder='11' />
                            </div>
                            <div>
                                <h3 className='mt-2 -mb-2'>Max number of guests</h3>
                                <input type='number' value={maxGuests}
                                    onChange={(e) => setMaxGuest(e.target.value)} />
                            </div>
                        </div>
                        <button className='primary my-4'>Save</button>
                    </form>
                </div>
            )}
        </div>
    )
}
