'use client';
import InputTextBox from "@/components/inputs/inputtextbox";
import InputDateBox from "@/components/inputs/inputdatebox";
import InputSelectBox from "@/components/inputs/inputselectbox";
import { MenuItem } from "@mui/material"
import dayjs from "dayjs"

export default function FirstForm(props){
    return(
        <>
            <InputTextBox 
                className="md:col-span-5" 
                name="lastName" 
                label="Nazwisko" 
                validateFunction={(value) => {return value !== '' && (typeof value === 'string' ? value : '').trim().length >= 3}} 
                formIsValid={props.toggleValidity} 
                inputChange={props.changeForm}
                errorText="Prosze podać poprawne Nazwisko!"
            />
            <InputTextBox 
                className="md:col-span-3" 
                name="firstName" 
                label="Imie" 
                validateFunction={(value) => {return value !== '' && (typeof value === 'string' ? value : '').trim().length >= 3}} 
                formIsValid={props.toggleValidity} 
                inputChange={props.changeForm}
                errorText="Prosze podać poprawne Imie!"
            />
            <InputSelectBox 
                className="md:col-span-2" 
                name="sex" 
                label="Płeć" 
                validateFunction={(value) => {return value !== ''}} 
                formIsValid={props.toggleValidity} 
                inputChange={props.changeForm}
                errorText="Prosze wybierać jedną z opcji"
            >
                <MenuItem value={0}>Mężczyzna</MenuItem>
                <MenuItem value={1}>Kobieta</MenuItem>
            </InputSelectBox>
            <InputDateBox 
                className="md:col-span-5" 
                name="birthDate" 
                label="Data urodzenia" 
                validateFunction={(value) => {return value !== '' && dayjs().subtract(4, 'year').isAfter(value)}} 
                formIsValid={props.toggleValidity} 
                inputChange={props.changeForm}
                errorText="Prosze wprowadzić poprawną date urodzenią, Dziecko musi mieć minimalnie 4 lata!"
            />
        </>
    )
}