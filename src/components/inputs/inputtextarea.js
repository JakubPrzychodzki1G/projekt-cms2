'use client';

import UseInput from "@/hooks/use-input";

export default function InputTextarea(props){
    if(props.readOnly){
        return (
            <div className={`${props.className} flex flex-col justify-end`}>
                <label htmlFor={props.name}>{props.label}</label>
                <textarea name={props.name} id={props.name} className="h-28 border hover:border-gray-600 rounded px-4 w-full bg-gray-50" value={props.value} readOnly></textarea>
            </div>
        )
    }
    const {
        value: textAreaValue,
        isValid: isValid,
        hasError: hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset: reset,
        isSaved: isSaved
    } = UseInput(props.validateFunction, props.inputChange, 'normal', props.name, props.formIsValid, props.value, props.onBlur);

    return (
    <div className={`${props.className} flex flex-col justify-start`}>
        <label htmlFor={props.name}>{props.label}</label>
        <textarea onClick={props.onClick} name={props.name} id={props.name} className="h-28 border hover:border-gray-600 rounded px-4 w-full bg-gray-50" value={textAreaValue} onChange={valueChangeHandler} onBlur={(e) => {inputBlurHandler(e)}} placeholder={props.placeholder}></textarea>
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