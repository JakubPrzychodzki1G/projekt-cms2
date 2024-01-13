'use client';
import { Children } from "react";
import { motion } from "framer-motion";

export default function BigButton(props){
    const variants = {
        hover: { 
            scale: 1.06,
            borderColor: "rgb(137, 207, 240)"
        }
    }

    return (
        <motion.a
            whileHover="hover"
            whileTap={{scale: 0.9}}
            variants={variants}
            className={`flex ${props.classes ? props.classes : "w-full"} p-2 h-20 border rounded-xl text-slate-800 text-2xl font-semibold ${props.position == "left" ? "justify-start" : props.position == "right" ? "justify-end" : "justify-center" }`} href={props.href}
        >
            <div className={`flex gap-2`}>
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
    )
}