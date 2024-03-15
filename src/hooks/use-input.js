'use client';

import dayjs from 'dayjs';

const { useState, useEffect, use } = require("react")

let timeout = null;

const UseInput = (validateFunction, formChangeFunction, type = 'normal', inputName = '', formIsValid, initialValue, onBlur = null, specialFunc = null) => {
    const [enteredValue, setEnteredValue] = useState(type == 'normal' || type == 'checkbox' ? (initialValue ? initialValue : (type == 'checkbox' ? false : '')) : dayjs(initialValue));
    const [isTouched, setIsTouched] = useState(false);
    const [isSaved, setIsSaved] = useState();
    const [hasError, setHasError] = useState(false);
    const valueIsValid = typeof validateFunction === 'function' ? validateFunction(enteredValue) : true;
    useEffect(() => {
        setHasError(!valueIsValid && isTouched);
    }, [isTouched]);

    useEffect(() => {
        setEnteredValue(initialValue ? initialValue : (type == 'checkbox' ? false : ''));
    }, [initialValue]);

    const valueChangeHandler = async (event, date = '') => {
        const isBreak = specialFunc ? specialFunc(event, () => {
            setHasError(true)
            setTimeout(() => {
                setHasError(false)
            }, 8000)
        }) : null;
        if(isBreak) return;
        switch(type){
            case 'normal':
                setEnteredValue(event.target.value);
                break;
            case 'date':
                setEnteredValue(event);
                break;
            case 'autoselect':
                setEnteredValue(event.value);
                break;
            case 'checkbox':
                setEnteredValue( prevState => !prevState );
                break;
            default:
                setEnteredValue(event.target.value);
                break;
        }
        var res = formChangeFunction ? await formChangeFunction(
            event,
            inputName != '' ? inputName : event.target.name,
            () => {setIsSaved('saving')}
        ) : null;
        if(res) {
            clearTimeout(timeout);
            setIsSaved(res)
            timeout = setTimeout(() => {
                setIsSaved(null);
            }, 4000)
        };
        typeof formIsValid === 'function' && formIsValid(inputName, !validateFunction(type == 'normal' ? event.target.value : event))
    };

    const inputBlurHandler = async (event) => {
        setIsTouched(true);
        if(onBlur){
            const res = await onBlur(event, inputName != '' ? inputName : event.target.name, () => {setIsSaved('saving')});
            if(res) {
                clearTimeout(timeout);
                setIsSaved(res)
                timeout = setTimeout(() => {
                    setIsSaved(null);
                }, 4000)
            };
        }
    };

    const reset = () => {
        setEnteredValue("");
        setIsTouched(false);
    };

    // useEffect(() => {
    //     if(type === "checkbox"){
    //         console.log('enteredValue', enteredValue)
    //     }
    // }, [enteredValue])

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
        isSaved
    }
}

export default UseInput;