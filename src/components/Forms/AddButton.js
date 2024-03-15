"use client"

import AddGroup from "./components/AddGroup"
import AddLesson from "./components/AddLesson"
import AddPlayer from "./components/AddPlayer"
import AddGrade from "./components/AddGrade"
import { useState } from "react"
import { ItemValidator } from "@/app/(manageApp)/components/Auth/ItemValidator"

const AddButton = (props) => {
    const [isOpened, setIsOpened] = useState(false);
    const [formData, setFormData] = useState({});
    const [countFormValid, setCountFormValid] = useState(0);
    const [namesArray, setNamesArray] = useState([]);
    const [endpointFunc, setEndpointFunc] = useState(() => () => {});
    const [checkFunc, setCheckFunc] = useState(() => () => {});
    const [error, setError] = useState(false);
    
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
                    ? event.target.value
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
    }

    const clickHandler = (e = null) => {
        e?.stopPropagation();
        setFormData({});
        setIsOpened(prevState => !prevState);
    }

    const checkFuncHandler = (func) => {
        setCheckFunc(() => func);
    }

    const addEntity = async (e) => {
        e.preventDefault();
        if(!formIsValid){
            return;
        }
        await endpointFunc(formData)
        .catch(async (err) => {
            setError(true);
            await setTimeout(() => {
                setError(false);
                return true;
            }, 3000);
        });
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
        'addGroup': 
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
            error={error}
        />,
        'addPlayer': 
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
            error={error}
        />,
        'addLesson': 
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
            error={error}
        />,
        'addGrade':
        <AddGrade
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
            player={props.player}
            error={error}
        />,
    }

    const textData = {
        'addGroup':
            {
                button: "Dodaj Grupe",
                title: "Dodaj nową Grupe"
            },
        'addPlayer': 
            {
                button: "Dodaj Zawodnika",
                title: "Dodaj nowego Zawodnika"
            },
        'addLesson':
            {
                button: "Dodaj Zajęcia",
                title: "Dodaj nowe Zajęcia"
            },
        'addGrade':
            {
                button: "+",
                title: "Dodaj nową ocenę"
            }
    }

    return (
    <ItemValidator permission={props.component}>
        <div>
            <button className={`bg-blue-500 text-white font-bold ${props.buttonClassName ? props.buttonClassName : "p-4 rounded-xl"}`} onClick={clickHandler}>
                {textData[props.component].button}
            </button>
        </div>
        {isOpened && 
            <div className="fixed top-0 bottom-0 left-0 lg:left-72.5 right-0 bg-black bg-opacity-20 flex justify-center overflow-auto items-center z-99" onClick={clickHandler}>
                <div className="mt-32 mb-20 w-5/6 md:w-1/2 2xl:w-1/3 bg-white rounded-xl flex flex-col self-start items-center" onClick={e => {e.stopPropagation();}}>
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
    </ItemValidator>
    )
}

export default AddButton