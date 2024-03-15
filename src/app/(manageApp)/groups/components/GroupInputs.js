"use client"

import { useEffect, useState } from 'react'
import InputSelectBox from "@/components/inputs/inputselectbox";
import InputTextBox from "@/components/inputs/inputtextbox";
import { MenuItem } from "@mui/material";

const GroupInputs = (props) => {
    const [coachesData, setCoachesData] = useState([])

    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    useEffect(() => {
        fetch("/api/users?isCoach=true&isDeleted=false", requestOptions)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            setCoachesData(data)
            // setLoading(false)
        })
        .catch(error => console.log('error', error));
    }, [])

    return (
        <>
            <InputTextBox 
                className={`md:col-span-5 ${props.width}`}
                name={props.specialNames ? props.specialNames[0] : 'name'} 
                label="Nazwa grupy" 
                inputChange={props.inputChangeHandler}
                formIsValid={props.toggleValidity} 
                errorText="Prosze podać poprawne Nazwisko!"
                value={props.groupsData ? props.groupsData.name : ''}
                validateFunction={(value) => {return value !== ''}} 
                readOnly={props.isReadOnly}
            />
            <InputSelectBox 
                className={`mb-4 ${props.width}`} 
                name={props.specialNames ? props.specialNames[1] : 'coach.id'} 
                label="Trener grupy"
                inputChange={props.inputChangeHandler}
                validateFunction={(value) => {return value !== ''}} 
                formIsValid={props.toggleValidity} 
                value={props.groupsData ? (props.groupsData.coach ? props.groupsData.coach.id : '') : ''}
                readOnly={props.isReadOnly}
            >
                <MenuItem value={''}></MenuItem>
                {
                    coachesData && coachesData.map((x) => {
                        // console.log(x)
                        return (
                            <MenuItem key={x.id} value={`${x.id}`}>{`${x.name} ${x.lastName}`}</MenuItem>
                        )
                    })
                }
            </InputSelectBox>
        </>
    )
}

export default GroupInputs