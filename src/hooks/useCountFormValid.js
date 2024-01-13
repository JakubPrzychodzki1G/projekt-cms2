'use client'

import { useState } from "react";

const UseCountFormValid = () => {
    const [countFormValid, setCountFormValid] = useState(0);
    const [namesArray, setNamesArray] = useState([]);

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

    return [countFormValid, changeCountFormValid]
}

export default UseCountFormValid;