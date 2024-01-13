'use client';
import NavBarItem from "./navbaritem";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import NavBarDropDown from "./navbardropdown";

export default function NavBar(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  }

  const navbarValues = [
    // {
    //   id:1,
    //   value:"Sekcja Sportowa",
    //   isDropDown:1 
    // }, 
    // {
    //   id:2,
    //   value:"Sekcja Rekreacyjna",
    //   isDropDown:1  
    // },
    {
      id:1,
      value:"Zapisy",
      href:"/sport-section/records",
      isDropDown:0
    }, 
    {
      id:2,
      value:"Harmonogram",
      href:"/sport-section/schedule",
      isDropDown:0
    }, 
    {
      id:4,
      value:"Składki",
      href:"/sport-section/dues",
      isDropDown:0
    }, 
    {
      id:3,
      value:"Media",
      href:"/club/activity",
      isDropDown:0
    }, 
    // {
    //   id:4,
    //   value:"Archiwum",
    //   href:"/archive",
    //   isDropDown:0
    // }, 
    {
      id:5,
      value:"Kontakt",
      href:"/club/contacts",
      isDropDown:0
    }, 
    // {
    //   id:6,
    //   value:"Poczta",
    //   href:"poczta",
    //   isDropDown:0
    // },
    {
      id:7,
      value:"O nas!",
      href:"/club",
      isDropDown:0
    }
]
  const items = navbarValues.map(x => {
    return (
      <NavBarItem 
        key={x.id}
        {...x}
      />
    )
  })

  const sidebarItems = navbarValues.map(x => {
    return (
      <div className="w-full font-semibold text-slate-800" key={x.id}>
        <div className="group w-full">
          <a className="px-1 py-3 flex items-center hover:bg-white transition-all" href={x.href}>
            <p className="ml-5">{x.value}</p>
            {
              x.isDropDown == 1 &&
              <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"></path>
              </svg>
            }
          </a>
          {
            x.isDropDown == 1 &&
            <div className="h-0 w-0 opacity-0 group-hover:opacity-100 group-hover:h-full transition-all group-hover:w-full">
              <NavBarDropDown isSidebar={true} isOpen={true} parentId={x.id}/>
            </div>
          }
        </div>
        <hr className="mx-4"/>
      </div>
    )
  })

  const motionOptions = {
    animate:{
        opacity: 1,
        x: 0
    },
    initial:{
        opacity: 0.1,
        x: -200
    },
    transition:{
        duration: 0.3,
        ease: "easeOut"
    },
    exit:{
        opacity: 0,
        transition: {duration: 0.3},
        x: -200
    }
  }

  return (
    <div className="w-11/12">
      <header className="flex w-full">
        <AnimatePresence>
        {
          sidebarOpen && 
          <motion.div className="absolute z-50 w-full left-0 h-screen flex" {...motionOptions}>
            <div className="w-3/4 md:w-1/2 lg:w-1/3 bg-blue-200 h-screen">
              <div className="p-4 w-full flex items-center justify-center">
                <a href="/main" className="flex-col items-center font-semibold text-slate-700 text-lg">
                  <img src="/next.svg" className="h-32 ml-3 mr-3" alt="Poseidon logo"/>
                </a>
              </div>
              {sidebarItems}
            </div>
            <div className="w-1/4 md:w-1/2 lg:w-2/3" onClick={toggleSidebar}>

            </div>
          </motion.div>
        }
        </AnimatePresence>
        <nav className="mt-4 w-full bg-blue-100 z-80 rounded-md shadow-lg h-[4rem] z-40">
          <div className="w-full flex flex-wrap items-center justify-between h-full">
            <a href="/main" className="flex items-center">
                <img src="/next.svg" className="h-8 ml-3 mr-3" alt="Poseidon logo"/>
            </a>
            <div className="hidden lg:flex order-2">
              {/* <button type="button" className="text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Zaloguj się</button> */}
            </div>
            <div className="flex lg:hidden order-2">
              <button type="button" onClick={toggleSidebar} className="text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg p-2 text-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
            <div className="items-center justify-between w-fit hidden lg:flex h-full order-1" id="navbar-sticky">
              {/* grid-cols-${items.length} */}
              <div className={`grid grid-flow-col gap-2 h-full font-medium text-slate-800 rounded-lg bg-blue-100 dark:border-gray-700`}>
                {items}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
    )
  }