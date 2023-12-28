import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function SinglePlacePage() {
    const { id } = useParams()
    const [place, setPlace] = useState(null)

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
        <div className='mt-4 bg-gray-100 -mx-8 px-8 py-8'>
            <div className='prn-test-layout 2xl:w-3/5 2xl:mx-auto'>
                <h1 className='text-2xl '>{place.title}</h1>
                <a className='my-2 block font-semibold underline' target='_blank' href={`https://maps.google.com/?q=${place.address}`}>{place.address}</a>
                <div className='grid gap-2 grid-cols-[2fr_1fr]'>
                    <div className=''>
                        {place?.photos[0] && (
                            <div className=''>
                                {/* className='aspect-square object-cover' */}
                                <img className='aspect-square object-cover' src={`http://localhost:5000/uploads/${place?.photos[0]}`} />
                            </div>
                        )}
                    </div>
                    <div className='grid '>
                        {place?.photos[1] && (
                            <img className='aspect-square object-cover' src={`http://localhost:5000/uploads/${place?.photos[1]}`} />
                        )}
                        <div className='overflow-hidden '>
                            {place?.photos[2] && (
                                <img className='aspect-square object-cover relative top-2' src={`http://localhost:5000/uploads/${place?.photos[2]}`} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
