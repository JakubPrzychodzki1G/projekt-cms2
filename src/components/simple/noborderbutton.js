'use client';
import { motion } from "framer-motion"
import { Children } from "react"

export default function NoBorderButton(props){
    const variants = {
        hover: { 
            color: "#3b82f6"
        }
    }

    return (
        <li>
            <motion.a
                whileHover="hover"
                initial={{color: props.textColor}}
                variants={variants}
                className={`flex w-full pb-4 text-white text-md font-medium`} href={props.href}
            >
                <div className={`flex gap-2 ${props.className}`}>
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
            </motion.a>
        </li>
    )
}