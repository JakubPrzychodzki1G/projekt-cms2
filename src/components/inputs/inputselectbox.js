'use client';

import UseInput from "@/hooks/use-input";
import { Select } from "@mui/material"
import { Children } from "react"

export default function InputSelectBox(props){
    if(props.readOnly) return (
            <div className={`${props.className} flex flex-col justify-end`}>
                <label htmlFor={props.name}>{props.label}</label>
                <Select
                    multiple={props.multiple}
                    className="rounded w-full bg-gray-50"
                    name={props.name}
                    id={props.name}
                    value={props.value}
                    readOnly={props.readOnly}
                >
                    {
                        Children.map( props.children, child => {
                            return (
                                child
                            )
                        })
                    }
                </Select>
            </div>
        )

    const {
        value: selectValue,
        isValid: isValid,
        hasError: hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset: reset,
        isSaved: isSaved
    } = UseInput(props.validateFunction, props.inputChange, 'normal', props.name, props.formIsValid, props.value, props.onBlur, props.specialFunc);

    return(
        <div className={`${props.className} flex flex-col justify-start`}>
            <label htmlFor={props.name}>{props.label}</label>
            <Select
                multiple={props.multiple}
                className="rounded w-full bg-gray-50"
                name={props.name}
                id={props.name}
                value={selectValue}
                onChange={valueChangeHandler}
                onBlur={(e) => {inputBlurHandler(e);}}
            >
                {
                    Children.map( props.children, child => {
                        return (
                            child
                        )
                    })
                }
            </Select>
            {hasError && 
                <div id="error" className="mt-2 text-red-600">
                    {props.errorText}
                </div>
            }
            {
            isSaved
            && 
            isSaved == 'success' 
            ? 
            (<div className="mt-2 text-green-600">Zapisano!</div>) 
            : 
                isSaved == 'error' 
                ? 
                (<div className="mt-2 text-red-600">Błąd zapisu!</div>) 
                : 
                    isSaved == 'saving' 
                    ? 
                    (<div className="mt-2 text-blue-600">Zapisywanie</div>)
                    : 
                    ''
            }
        </div>
    )
}