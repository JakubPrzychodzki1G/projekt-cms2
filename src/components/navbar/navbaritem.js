'use client';
import React from "react"
import NavBarDropDown from "./navbardropdown";
import { motion } from "framer-motion";

export default function NavBarItem(props){
    const [dropDown, setDropDown] = React.useState(false);

    const varShown = {
        conditionA: {
          opacity: [1],
        },
    
        conditionB: {
          opacity: [0],
        }
      };
    return (
        <div onMouseEnter={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)}>
            
            <motion.div
                animate={dropDown ? "conditionA" : "conditionB"}
                variants={varShown}
            >
                <div className="bg-blue-400 w-full h-2 rounded"></div>
            </motion.div>
            <div className={`flex ${props.isDropDown === 1 ? "w-[14rem]" : "w-[8rem]" }`} >
                <motion.a href={props.href} className={`text-center inline-flex items-center justify-center w-full h-12 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700`}>
                    {`${props.value} `}
                    { props.isDropDown === 1 && <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"></path>
                    </svg>}
                </motion.a>
                {(dropDown && props.isDropDown === 1) && <NavBarDropDown isOpen={dropDown} parentId={props.id}/>}
            </div>
        </div>
    )
}