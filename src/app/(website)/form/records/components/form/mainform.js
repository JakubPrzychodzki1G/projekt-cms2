'use client';

import { AnimatePresence, motion } from "framer-motion"
import FirstForm from "./firstform"
import SecondForm from "./secondform"
import { useState } from "react"
import Link from "next/link";

export default function MainForm(props){
    const [countFormValid, setCountFormValid] = useState(0);
    const [namesArray, setNamesArray] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    const formIsValid = (props.formId == 1 && countFormValid == 4) || (props.formId == 2 && countFormValid == 13);

    const formData = {
        sex: "", 
        city: "", 
        first_name: "", 
        last_name: "", 
        birth_date: "",
        school_name: "",
        street_and_number: "",
        zip_code: "",
        parent_first_name: "",
        parent_last_name: "",
        parent2_first_name: "",
        parent2_last_name: "",
        contact_email: "",
        main_number: "",
        additional_number: "",
        player_number: "",
        skill: "",
        section: "sport-section",
        comments: "",
        isDeleted: false,
        isVerified: false
    }
    const [responseBody, setResponseBody] = useState(formData);

    const inputChangeHandler = (event, name, callback) => {
        setResponseBody((prevState) => ({...prevState, [name]: name.includes('Date') ? event.$d : event.target.value}));
    }
    
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if(formIsValid){
            setIsSaving(true);
            props.toggle('next');
            var myHeaders = new Headers();
            myHeaders.append("accept", "application/json");
            myHeaders.append("Content-Type", "application/ld+json");

            var raw = JSON.stringify(responseBody);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("/api/players", requestOptions)
            .then(response => {
                if(response.status != 201){
                    setIsSaving('error');
                }
                else{
                    setIsSaving(false);
                }
            })
            .catch(error => {
                setIsSaving('error');
            });
        }
        else{
            return;
        }
    }
    
    const changeCountFormValid = (name, hasError) => {
        let functionArray = namesArray;
        if(functionArray.includes(name) && hasError){
            functionArray.splice(functionArray.indexOf(name), 1)
            setNamesArray(functionArray);
            setCountFormValid( prevNumber => {return prevNumber - 1});
        }
        else if(!functionArray.includes(name) && !hasError){
            functionArray.push(name);
            setNamesArray(functionArray);
            setCountFormValid( prevNumber => {return prevNumber + 1});
        }
    }

    const motionOptions = {
        animate:{
            opacity: 1
        },
        initial:{
            opacity: 0.1
            
        },
        transition:{
            duration: 0.3,
            ease: "easeOut"
        },
        exit:{
            opacity: 0,
            transition: {duration: 0.3}
        }
    }
    return(
        <div className="p-6 bg-gray-100 flex justify-center w-full">
            <div className="container max-w-screen-lg mx-auto">
                <form onSubmit={onSubmitHandler}>
                    <div className="bg-white rounded-lg shadow-lg p-4 px-4 md:p-8 mb-6">
                        <AnimatePresence>
                            <motion.div className={`${ props.formId != 3 ? "grid gap-4 gap-y-2 grid-cols-1 lg:grid-cols-3" : "hidden"} text-sm`} key={"form"} {...motionOptions}>
                                <div className="text-slate-800">
                                    <p className="font-medium text-lg">Deklaracja członkostwa</p>
                                    <p>Wypełnij wszystkie pola i wciśnij niebieski przycisk!</p>
                                </div>
                                    
                                <div className="lg:col-span-2">
                                    <div >
                                        <motion.div className={`${props.formId == 1 ? "grid" : "hidden"} gap-4 xl:gap-y-2 text-sm grid-cols-1 md:grid-cols-5 mb-4`} key={"FirstForm"} {...motionOptions}>
                                            <FirstForm toggleValidity={changeCountFormValid} changeForm={inputChangeHandler}/>
                                        </motion.div>
                                        <motion.div className={`${props.formId == 2 ? "grid" : "hidden"} gap-4 gap-y-6 2xl:gap-y-2 text-sm grid-cols-1 md:grid-cols-5 mb-4`} key={"SecondForm"} {...motionOptions}>
                                            <SecondForm toggleValidity={changeCountFormValid} changeForm={inputChangeHandler}/>
                                        </motion.div>
                                    </div>
                                    <div className="md:col-span-5 text-right">
                                        <div className="inline-flex items-end">
                                            {
                                            props.formId == 1 ? 
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={!formIsValid} onClick={(e) => { e.preventDefault(); props.toggle('next')}}>Nastepny</button>
                                            : 
                                            props.formId == 2 ?
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={!formIsValid} type="submit">Zapisz</button>
                                            :''
                                            }
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div className={`${props.formId == 3? "flex" : "hidden"} mb-4 text-sm`} key={"Saved"} {...motionOptions}>
                                <div className="flex justify-center items-center w-full h-[36vh]">
                                    {
                                        isSaving == true?
                                        <div className="text-3xl font-semibold text-slate-700">
                                            <svg aria-hidden="true" className="w-32 h-32 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                        </div>
                                        : 
                                        (isSaving == 'error' ?
                                            <div className="text-3xl font-semibold text-red-600 flex flex-col items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-red-600 w-36 h-36">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                                </svg>
                                                <h1>Nie Zapisano!</h1>
                                                <div className="mt-14">
                                                    <Link
                                                        href="/#"
                                                        rel="noopener"
                                                        className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md ">
                                                        Powrót do strony głównej
                                                    </Link>
                                                </div>
                                            </div>
                                            :
                                            <div className="text-3xl font-semibold text-slate-700 flex flex-col items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-blue-300 w-32 h-32">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <h1>Zapisano</h1>
                                                <div className="mt-14">
                                                    <Link
                                                        href="/#"
                                                        rel="noopener"
                                                        className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md ">
                                                        Powrót do strony głównej
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </form>
            </div>
        </div>
    )
}