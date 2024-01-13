'use client';
import SideBarItem from "./sidebaritem"
import Link from "next/link";
import { usePathname  } from "next/navigation";
import { useEffect, useState } from "react"

export default function SideBar(props){
    const SideBarItems = [
        {
            id:1,
            parentId: 1,
            value:"Harmonogram",
            href: "/sport-section/schedule",
            isDropDown:0 
        }, 
        {
            id:2,
            parentId: 1,
            value:"Zapisy",
            href:"/sport-section/records",
            isDropDown:0 
        }, 
        // {
        //     id:3,
        //     parentId: 1,
        //     value:"Nabór i Szkolenie",
        //     href:"media",
        //     isDropDown:0
        // }, 
        {
            id:4,
            parentId: 1,
            value:"Składki",
            href:"/sport-section/dues",
            isDropDown:0
        }, 
        // {
        //     id:5,
        //     parentId: 1,
        //     value:"Licencja",
        //     href:"kontakt",
        //     isDropDown:0
        // }, 
        // {
        //     id:6,
        //     parentId: 1,
        //     value:"Najlepsze czasy",
        //     href:"poczta",
        //     isDropDown:0
        // },
        // {
        //     id:7,
        //     parentId: 1,
        //     value:"Kadra zawodników",
        //     href:"poczta",
        //     isDropDown:0
        // },
        // {
        //     id:8,
        //     parentId: 1,
        //     value:"Kadra trenerska",
        //     href:"kontakt",
        //     isDropDown:0
        // }, 
        // {
        //     id:9,
        //     parentId: 1,
        //     value:"Testy sprawności",
        //     href:"poczta",
        //     isDropDown:0
        // },
        // {
        //     id:10,
        //     parentId: 1,
        //     value:"Przepisy i Regulaminy",
        //     href:"poczta",
        //     isDropDown:0
        // },
        {
            id:11,
            parentId: 2,
            value:"Harmonogram",
            href:"/recreation-section/schedule",
            isDropDown:0
        },
        {
            id:12,
            parentId: 2,
            value:"Zapisy",
            href:"/recreation-section/records",
            isDropDown:0
        }, 
        {
            id:13,
            parentId: 2,
            value:"Składki",
            href:"/recreation-section/dues",
            isDropDown:0
        },
        // {
        //     id:14,
        //     parentId: 2,
        //     value:"Oferta dla grup",
        //     href:"poczta",
        //     isDropDown:0
        // },
        {
            id:15,
            parentId: 3,
            value:"Kontakt",
            href:"/club/contacts",
            isDropDown:0
        },
        {
            id:16,
            parentId: 3,
            value:"Aktualności",
            href:"/club/activity",
            isDropDown:0
        }
    ]
    const [isHighlighed, setHighlighed] = useState(false);
    const pathname  = usePathname ();

    useEffect(() => {
        setHighlighed(pathname == props.href ? true : false);
    },[pathname])

    return (
        <div className="flex flex-row h-full lg:bg-gray-100">
            <div className="flex flex-col h-full w-full mt-24 lg:mt-0 bg-white overflow-hidden">
                <div className="h-[4.5rem] shadow-b-md mt-2 lg:mt-36 mx-2 lg:mx-0">
                    <Link href={props.href} className={`flex items-center h-full ${isHighlighed ? 'bg-blue-300 mr-2 rounded-l-lg lg:rounded-l-none rounded-r-lg' : ''}`}>
                        <h1 className="ml-4 font-bold text-3xl text-slate-800">{props.title}</h1>
                    </Link>
                </div>
                <hr className="bg-blue-500 mt-2 h-[2px] ml-4 mr-10" />
                <ul className="flex flex-col py-4 mx-2 lg:mx-0">
                    {    
                        SideBarItems.map( x => {
                            if(x.parentId == props.ownId){
                                return (
                                    <SideBarItem 
                                        key={x.id}
                                        {...x}
                                    /> 
                                )
                            }
                        })
                    }
                </ul>
            </div>
        </div>
    )
}