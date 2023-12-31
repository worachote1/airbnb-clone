import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PhotoUploader from '../components/PhotoUploader'
import Perks from '../components/Perks'
import AccountNav from '../components/AccountNav'
import Swal from 'sweetalert2';

export default function PlacesFormPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState("")
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [maxGuests, setMaxGuests] = useState(1)
    const [price, setPrice] = useState(100)
    const [redirect, setRedirect] = useState("")


    const alertPlaceSuccess = () => {
        Swal.fire({
            title: (id) ? "Update completed" : "Successfully created place",
            text: "",
            icon: "success"
        });
    }

    const alertPlaceFail = (errData) => {
        Swal.fire({
            title: (id) ? "Failed to update" : "Creation not completed",
            text: errData,
            icon: "error"
        });
    }

    const savePlace = async (e) => {
        e.preventDefault()

        try {
            if (id) {
                //update place
                const placeData = { title, address, photos: [...addedPhotos], description, perks, extraInfo, checkIn, checkOut, maxGuests, price }
                const { data } = await axios.put(`${process.env.REACT_APP_API}/places/${id}`, placeData, {
                    withCredentials: true
                })
                console.log(data)
                // Reset state variables to updated value
                setTitle(data.title);
                setAddress(data.address);
                setAddedPhotos(data.photos);
                setDescription(data.description);
                setPerks(data.perks);
                setExtraInfo(data.extraInfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setMaxGuests(data.maxGuests);
                setPrice(data.price)
                alertPlaceSuccess()
                navigate("/account/places")
            }

            else {
                // create place
                const placeData = { title, address, photos: [...addedPhotos], description, perks, extraInfo, checkIn, checkOut, maxGuests, price }
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
                setMaxGuests(1);
                setPrice(100)
                alertPlaceSuccess()
                navigate("/account/places")
            }
        }

        catch (err) {
            console.log(err)
            alertPlaceFail(err.response.data.message)
        }
    }

    const getPlaceById = async (id) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/places/${id}`)
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
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

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
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
                <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-4'>
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
                            onChange={(e) => setMaxGuests(e.target.value)} />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-2'>Price per night</h3>
                        <input type='number' value={price}
                            onChange={(e) => setPrice(e.target.value)} />
                    </div>
                </div>
                <button className='primary my-4'>Save</button>
            </form>
        </div>
    )
}
