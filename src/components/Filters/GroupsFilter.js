import InputTextBox from "../inputs/inputtextbox"
import InputSelectBox from "../inputs/inputselectbox"
import { MenuItem } from "@mui/material"
import { useEffect, useState } from "react";

const GroupsFilter = (props) => {
    const [coachesData, setCoachesData] = useState([]);
    const [options, setOptions] = useState("");
    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        
        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        fetch("/api/users", requestOptions)
        .then(response => response.json())
        .then(result => {
            setCoachesData(result);
        })
        .catch(error => console.log('error', error));
    }, [])

    const inputChangeOrBlurHandler = (event, name, callback) => {
        setOptions((prevState) => {
            console.log(event);
            const options = prevState.includes(name) ? (event.target.value.trim() != '' ? prevState.replace(new RegExp(`&${name}=([^&]*)`), `&${name}=${event.target.value}`) : prevState.replace(new RegExp(`&${name}=([^&]*)`), '')) :  (event.target.value.trim() != '' ? prevState.concat(`&${name}=${event.target.value}`) : prevState);
            props.filterHandler(options);
            return options;
        })
    }

    return (
        <div className="flex flex-col justify-end mb-4">
            <h2 className="mb-2 text-xl font-semibold">Filtry</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InputTextBox 
                    className="" 
                    name="name" 
                    label="Nazwa grupy" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <InputSelectBox 
                    className="" 
                    name="coach.id" 
                    label="Trener grupy"
                    inputChange={inputChangeOrBlurHandler}
                >
                    <MenuItem value={''}></MenuItem>
                    {
                        coachesData && coachesData.map((x) => {
                            return (
                                <MenuItem key={x.id} value={`${x.id}`}>{`${x.name} ${x.lastName}`}</MenuItem>
                            )
                        })
                    }
                </InputSelectBox>
            </div>
        </div>
    )
}

export default GroupsFilter