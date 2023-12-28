import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function IndexPage() {
    const [places, setPlaces] = useState([])

    const getAllPlaces = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/places`)
        setPlaces(data)
    }

    useEffect(() => {
        getAllPlaces()
    }, [])

    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {
                places.length > 0 && places.map(item => (
                    <Link to={`/places/${item._id}`}>
                        <div className='bg-gray-500 mb-2 rounded-2xl flex'>
                            {item.photos[0] && (
                                // rounded-2xl object-cover aspect-square flex-grow
                                <img className='rounded-2xl object-cover aspect-square flex-grow' src={`http://localhost:5000/uploads/${item.photos[0]}`} />
                            )}
                        </div>
                        <h2 className="font-bold">{item.address}</h2>
                        <h3 className="text-sm text-gray-500">{item.title}</h3>
                        <div className="mt-1">
                            <span className="font-bold">${item.price}</span> per night
                        </div> 
                    </Link>
                ))
            }
        </div>

        // <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 bg-red-500">
        //     {places.length > 0 && places.map(item => (
        //         <Link to={'/place/' + item._id}>
        //             <div className="bg-gray-500 mb-2 rounded-2xl flex">
        //                 {item.photos?.[0] && (
        //                     <img className="rounded-2xl object-cover aspect-square" src={`http://localhost:5000/uploads/${item.photos[0]}`} alt="" />
        //                 )}
        //             </div>
        //             <h2 className="font-bold">{item.address}</h2>
        //             <h3 className="text-sm text-gray-500">{item.title}</h3>
        //             {/* <div className="mt-1">
        //                 <span className="font-bold">${place.price}</span> per night
        //             </div> */}
        //         </Link>
        //     ))}
        // </div>

    )
}
