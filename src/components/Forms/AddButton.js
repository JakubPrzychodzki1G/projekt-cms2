"use client"

import AddGroup from "./components/AddGroup"
import AddLesson from "./components/AddLesson"
import AddPlayer from "./components/AddPlayer"
import { useState } from "react"

const AddButton = (props) => {
    const [isOpened, setIsOpened] = useState(false);
    const [formData, setFormData] = useState({});
    const [countFormValid, setCountFormValid] = useState(0);
    const [namesArray, setNamesArray] = useState([]);
    const [endpointFunc, setEndpointFunc] = useState(() => () => {});
    const [checkFunc, setCheckFunc] = useState(() => () => {});
    
    const initializeFormData = (initialFormData) => {
        setFormData(initialFormData);
    }

    const inputChangeHandler = (event, name, callback) => {
        setFormData((prevState) => 
            (
                {   
                    ...prevState, 
                    [name]: name.includes('Date') ? event.$d : 
                    name.includes('coach') 
                    ? `/api/users/${event.target.value}` 
                    : (
                        event.target?.type == 'checkbox' 
                        ? event.target.checked 
                        : (
                            event.target?.type == 'number' ?
                            +event.target.value :
                            event.target.value
                        ) 
                    )
                }
            )
        );
        console.log(formData);
    }

    const clickHandler = () => {
        setFormData({});
        setIsOpened(prevState => !prevState);
    }

    const checkFuncHandler = (func) => {
        setCheckFunc(() => func);
    }

    const addEntity = (e) => {
        e.preventDefault();
        if(!formIsValid){
            return;
        }
        endpointFunc(formData);
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

    const setEndpointFuncHandler = (func) => {
        setEndpointFunc(() => func);
    }

    const formIsValid = checkFunc(countFormValid);

    const components = {
        'groups': 
        <AddGroup 
            refresh={props.refresh} 
            changeCountFormValid={changeCountFormValid} 
            inputChangeHandler={inputChangeHandler} 
            addEntity={addEntity} 
            formIsValid={formIsValid} 
            endpointFunc={setEndpointFuncHandler} 
            checkFunc={checkFuncHandler}
            initializeFormData={initializeFormData}
            formData={formData}
            close={clickHandler}
        />,
        'players': 
        <AddPlayer 
            refresh={props.refresh} 
            changeCountFormValid={changeCountFormValid} 
            inputChangeHandler={inputChangeHandler} 
            addEntity={addEntity} 
            formIsValid={formIsValid} 
            endpointFunc={setEndpointFuncHandler}
            checkFunc={checkFuncHandler}
            initializeFormData={initializeFormData}
            formData={formData}
            close={clickHandler}
        />,
        'lessons': 
        <AddLesson 
            refresh={props.refresh} 
            changeCountFormValid={changeCountFormValid} 
            inputChangeHandler={inputChangeHandler} 
            addEntity={addEntity} 
            formIsValid={formIsValid} 
            endpointFunc={setEndpointFuncHandler}
            checkFunc={checkFuncHandler}
            initializeFormData={initializeFormData}
            formData={formData}
            close={clickHandler}
        />,
    }

    const textData = {
        'groups':
            {
                button: "Dodaj Grupe",
                title: "Dodaj nową Grupe"
            },
        'players': 
            {
                button: "Dodaj Zawodnika",
                title: "Dodaj nowego Zawodnika"
            },
        'lessons':
            {
                button: "Dodaj Zajęcia",
                title: "Dodaj nowe Zajęcia"
            }
    }

    return (
    <>
        <div>
            <button className="p-4 bg-blue-500 text-white font-bold rounded-xl" onClick={clickHandler}>
                {textData[props.component].button}
            </button>
        </div>
        {isOpened && 
            <div className="absolute top-0 left-0 right-0 min-h-screen bg-black bg-opacity-20 flex justify-center items-center z-99" onClick={clickHandler}>
                <div className="mt-32 mb-20 w-5/6 md:w-1/2 2xl:w-1/3 bg-white rounded-xl flex flex-col items-center" onClick={e => {e.stopPropagation();}}>
                    <div className="w-full flex justify-between">
                        <h1 className="p-5 text-lg font-bold">{textData[props.component].title}</h1>
                        <button className="bg-red-500 w-10 h-10 m-4 rounded-lg text-white flex justify-center items-center" onClick={clickHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                    {components[props.component]}
                </div>
                {/* <div className="w-full h-screen" onClick={clickHandler}>

                </div> */}
            </div>
        }
    </>
    )
}

export default AddButton