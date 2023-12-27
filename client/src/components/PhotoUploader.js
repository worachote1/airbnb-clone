import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2';

export default function PhotoUploader({addedPhotos,onChange}) {
    const [photoLink, setPhotoLink] = useState("")

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
            onChange(prev => {
                return [...prev, data]
            })
            setPhotoLink("")
        } catch (err) {
            console.log(err)
            alertUploadFail(err.response.data.message)
        }
    }

    const uploadPhoto = async (e) => {
        e.preventDefault()
        try {
            const files = e.target.files
            const data = new FormData()
            for (let i = 0; i < files.length; i++) {
                data.append('photos', files[i])
            }
            console.log(data)
            const resUpload = await axios.post(`${process.env.REACT_APP_API}/upload`, data)
            const filesName_arr = []
            for (let i = 0; i < resUpload.data.length; i++) {
                filesName_arr.push(resUpload.data[i].filename)
            }
            onChange(prev => {
                return [...prev, ...filesName_arr]
            })
        } catch (err) {
            console.log(err)
            alertUploadFail(err.response.data.message)
        }
    }

    return (
        <div>
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
                    <div className='h-32 flex'>
                        <img className='rounded-2xl w-full object-cover' src={`http://localhost:5000/uploads/${item}`} />
                    </div>
                ))}
                <label className=' cursor-pointer flex gap-1 items-center justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
                    <input type='file' accept=".jpg,.jpeg,.png" multiple className='hidden' onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>
                    Upload
                </label>
            </div>
        </div>
    )
}
