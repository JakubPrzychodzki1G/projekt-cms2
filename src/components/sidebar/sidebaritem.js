'use client';

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link";
import { usePathname  } from "next/navigation";
import { useEffect, useState } from "react"

export default function SideBarItem(props){
    const [isHover, setHover] = useState(false);
    const [isHighlighed, setHighlighed] = useState(false);
    const pathname  = usePathname ();

    useEffect(() => {
        setHighlighed(window.location.href.includes(props.href) ? true : false);
    },[pathname])
    return (
        <li className={`flex ${isHighlighed ? 'bg-blue-100 mr-2 rounded-r-lg' : ''}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <AnimatePresence>
                {isHover && 
                <motion.div
                    key={`strip-${props.id}`}
                    animate={{
                        opacity: 1
                    }}
                    initial={{
                        opacity: 0.1
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut"
                    }}
                    exit={{
                        opacity: 0,
                        transition: {duration: 0.3}
                    }}
                    className="h-12 w-1 absolute bg-blue-500 rounded">
                </motion.div>}
            </AnimatePresence>
            <Link href={props.href} className="flex flex-row items-center w-full h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-slate-800">
                <span className="ml-4 text-base font-medium">{props.value}</span>
            </Link>
        </li>
    )
}