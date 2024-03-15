'use client';
import UseInput from "@/hooks/use-input";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"

export default function InputDateBox(props){
    if(props.readOnly) return (
        <div className={`${props.className} flex flex-col justify-end`}>
            <label htmlFor={props.name}>{props.label}</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker 
                className="rounded px-4 w-full bg-gray-50" 
                name={props.name} 
                id={props.name} 
                value={dayjs(props.value)} 
                defaultValue={dayjs(props.placeholder)} 
                views={props.isDateTime ? ['year', 'month', 'day', 'hours', 'minutes'] : ['year', 'month', 'day']}
                readOnly={props.readOnly}
            />
            </LocalizationProvider>
        </div>
    )

    const {
        value: dateValue,
        isValid: isValid,
        hasError: hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset: reset,
        isSaved: isSaved
    } = UseInput(props.validateFunction, props.inputChange, "date", props.name, props.formIsValid, props.value, props.onBlur);

    return(
        <div className={`${props.className} flex flex-col justify-start`}>
            <label htmlFor={props.name}>{props.label}</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker 
                className="rounded px-4 w-full bg-gray-50" 
                onChange={valueChangeHandler} 
                onAccept={
                    (e) => {inputBlurHandler(e)}
                }
                name={props.name} 
                id={props.name} 
                value={dayjs(dateValue)} 
                defaultValue={dayjs(props.placeholder)} 
                views={props.isDateTime ? ['year', 'month', 'day', 'hours', 'minutes'] : ['year', 'month', 'day']}
            />
            </LocalizationProvider>
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