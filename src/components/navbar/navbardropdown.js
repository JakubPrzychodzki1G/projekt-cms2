'use client';
import React from "react";
import { motion } from "framer-motion";
import NavBarDropDownItem from "./navbardropdownitem";

export default function NavBarDropDown(props) {
    const dropDownItems = [
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
        // }
        
    ]

    const items = dropDownItems.filter(x => x.parentId == props.parentId).map( (x, index, array) => {
        return (
            <NavBarDropDownItem 
                key={x.id}
                {...x}
                isLast={array.length - 1 == index ? true : false}
                isFirst={index == 0 ? true : false}
                isSidebar={props.isSidebar}
            />
        )
    })
    return (
        <motion.div
            animate={props.isSidebar ? {} : { y: 20, z: 10}}
            className={`${props.isSidebar ? 'flex justify-center w-full' : 'absolute w-56 mt-8 pt-2'}`}
        >
            <div className={`${props.isSidebar ? 'mb-2 w-5/6' : 'w-full rounded-lg shadow-lg'} flex flex-col bg-blue-200`}>
                {items}
            </div>
        </motion.div>
    )
}