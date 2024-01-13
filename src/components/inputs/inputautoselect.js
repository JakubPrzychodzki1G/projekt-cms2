'use client';

import UseInput from "@/hooks/use-input";
import { Children } from "react"
import Select from 'react-select';

export default function InputAutoSelect(props){
    if(props.readOnly) return (
            <div className={`${props.className} flex flex-col justify-end`}>
                <label for={props.name}>{props.label}</label>
                <Select
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
    } = UseInput(props.validateFunction, props.inputChange, 'autoselect', props.name, props.formIsValid, props.value, props.onBlur);

    return(
        <div className={`${props.className} flex flex-col justify-start`}>
            <label for={props.name}>{props.label}</label>
            <Select
                className="rounded w-full bg-gray-50"
                styles={{
                    control: base => ({
                        ...base,
                        height: 60,
                        minHeight: 60
                    })}}
                name={props.name}
                id={props.name}
                options={props.options}
                onChange={(e) => {valueChangeHandler(e);}}
                onBlur={(e) => {inputBlurHandler(e);}}
            /> 
            {hasError && 
                <div className="mt-2 text-red-600">
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