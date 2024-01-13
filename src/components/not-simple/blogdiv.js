'use client';

import { Children } from "react"

export default function BlogDiv(props) {
    return (
        <>
            <div style={{position: 'absolute', width:'100%', top:'0'}}>
                <div className="grid px-4 pt-4 z-0">
                    <img className="object-cover h-72 w-full shadow-lg col-span-full row-span-full rounded-md" src={props.image}/>
                    <div className="col-span-full row-span-full z-10 flex justify-end items-center">
                        <div className="bg-blue-400 w-1/2 h-20 mr-8 rounded-lg shadow-lg flex justify-center items-center">
                            <span className="text-white text-3xl">{props.breadcrump}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 md:px-12 w-full z-10 mt-56 relative mb-24">
                <div className="bg-white text-slate-800 w-full rounded-md p-6 text-justify">
                    {
                        Children.map( props.children, child => {
                            return (
                                <div className="flex items-center">
                                    {child}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}