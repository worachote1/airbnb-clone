import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from '../components/Perks'
import axios from 'axios'
import Swal from 'sweetalert2';

export default function PlacesPage() {
    const { action } = useParams()
    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [addedPhotos, setAddedPhotos] = useState([])
    const [photoLink, setPhotoLink] = useState("")
    const [description, setDescription] = useState("")
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [maxGuests, setMaxGuest] = useState(1)

    const alertUploadFail = (errData) => {
        Swal.fire({
            title: errData,
            text: "Please try again",
            icon: "error"
        });
    }

    const addPhotoByLink = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/upload/by-link`, {
                link: photoLink
            })
            setAddedPhotos(prev => {
                return [...prev, data]
            })
            setPhotoLink("")
        } catch (err) {
            console.log(err)
            alertUploadFail(err.response.data.message)
        }
    }

    const uploadPhoto = async(e) => {
        e.preventDefault()
        try{
            const files = [...e.target.files]
            const data = new FormData()
            console.log(data)
            for(let i=0; i<files.length; i++){
                data.append('photos',files[i])
            }
            console.log(data)
            const resUpload = await axios.post(`${process.env.REACT_APP_API}/upload`,data,{
                headers : {"Content-type" : "multipart/form-data"}
            })
            console.log(resUpload.data)
            setAddedPhotos(prev => {
                return [...prev, resUpload.data]
            })
        }catch(err){
            console.log(err)
            alertUploadFail(err.response.data.message)
        }
    }

    return (
        <div>
            {
                action !== "new" && (
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
                )}
            {action === "new" && (
                <div>
                    <form encType='multipart/form-data'>
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
                        <div className='flex gap-2'>
                            <input type='text'
                                value={photoLink}
                                onChange={(e) => setPhotoLink(e.target.value)}
                                placeholder={"Add photo using a link "} />
                            <button className='bg-gray-200 px-4 rounded-2xl '
                                onClick={addPhotoByLink}
                            >Add&nbsp;photo</button>
                        </div>

                        <div className='mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            {addedPhotos.length > 0 && addedPhotos.map(item => (
                                <div>
                                    <img src={`http://localhost:5000/uploads/${item}`} className='rounded-2xl' />
                                </div>
                            ))}
                            <label className='cursor-pointer flex gap-1 items-center justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
                                <input type='file' multiple className='hidden' onChange={uploadPhoto} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>
                                Upload
                            </label>
                        </div>
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
