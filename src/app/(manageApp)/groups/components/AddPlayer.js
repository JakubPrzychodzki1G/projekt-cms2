"use client"

import { useState, useEffect } from "react";
import InputAutoSelect from "@/components/inputs/inputautoselect";
import api from "@/components/Api/ApiActions";

const AddPlayer = (props) => {
    const [isOpened, setIsOpened] = useState(false);
    const [playerData, setPlayerData] = useState({});
    const [playerId, setPlayerId] = useState('');

    const inputChangeHandler = (event, name, callback) => {
        setPlayerId(event.value);
    }

    const clickHandler = () => {
        setIsOpened(prevState => !prevState);
    }

    const fetchPlayers = async (options = '') => {
        const getOptions = {
            params: {
                isDeleted: false,
                ...options
            }
        };
        const res = await api.getPlayers(getOptions);
        if(res) {
            const mappedData = res ? res.map((x) => {
                return {
                    label: `${x.firstName} ${x.lastName}`,
                    value: x.id
                }
            }) : ''
            setPlayerData(mappedData)
        }
    } 
  
    useEffect(() => {
        fetchPlayers(props.options ? props.options : '');
    }, [props.options])

    return (
        <>
            <div>
                <button className="p-4 bg-blue-500 text-white font-bold rounded-xl" onClick={clickHandler}>
                    Dodaj Zawodnika
                </button>
            </div>
            {isOpened && 
                <div className="fixed top-0 bottom-0 left-0 lg:left-72.5 right-0 bg-black bg-opacity-20 flex justify-center items-center z-99999">
                    <div className="absolute w-5/6 md:w-1/2 2xl:w-1/3 h-1/3 bg-white rounded-xl flex flex-col items-center">
                        <div className="w-full flex justify-between">
                            <h1 className="p-5 text-lg font-bold">Dodaj zawodnika do grupy</h1>
                            <button className="bg-red-500 w-10 h-10 m-4 rounded-lg text-white flex justify-center items-center" onClick={clickHandler}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                        <form className="w-full h-full flex flex-col items-center">
                            {
                                !props.loading
                                ?
                                <>
                                    <div className="w-3/4 h-full flex items-center">
                                        <InputAutoSelect
                                            options={playerData} 
                                            className="w-full"
                                            name="players" 
                                            validateFunction={(value) => {return value !== ''}} 
                                            inputChange={inputChangeHandler}
                                            errorText="Prosze wybrać jedną z opcji"
                                        />
                                    </div>
                                    <div>
                                        <button className="p-4 bg-blue-500 text-white font-bold rounded-xl mb-6" onClick={(e) => props.addNewPlayer(e, playerId)}>
                                            Dodaj Zawodnika
                                        </button>
                                    </div>
                                </>
                                :
                                <div className="w-3/4 h-full flex items-center justify-center">
                                    <div className="w-1/2 h-1/2 flex justify-center items-center">
                                        <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-spin"></div>
                                    </div>
                                </div>
                            }
                        </form>
                    </div>
                    <div className="w-full h-full" onClick={clickHandler}>

                    </div>
                </div>
            }
        </>
    );
}

export default AddPlayer;