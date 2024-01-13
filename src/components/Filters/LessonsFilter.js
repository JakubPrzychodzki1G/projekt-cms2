import InputTextBox from "../inputs/inputtextbox"
import InputSelectBox from "../inputs/inputselectbox"
import { MenuItem } from "@mui/material"
import { useEffect, useState } from "react";
import InputDateBox from "../inputs/inputdatebox";
import CheckboxInput from "../inputs/inputcheckbox";

const LessonsFilter = (props) => {
    const [coachesData, setCoachesData] = useState([]);
    const [options, setOptions] = useState({});
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
            const newOptions = event.target ? { ...prevState, [name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value.trim() } : event && !event.target ? { ...prevState, [name]: event.format('YYYY-MM-DDTHH:mm:ssZ[Z]') } : prevState;
            event.target?.value === '' && delete newOptions[name];
            props.filterHandler(newOptions);
            return newOptions;
        })
    }

    return (
        <div className="flex flex-col justify-end mb-4">
            <h2 className="mb-2 text-xl font-semibold">Filtry</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InputTextBox 
                    className="" 
                    name="name" 
                    label="Temat zajęć" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <InputTextBox 
                    className="" 
                    name="pool" 
                    label="Basen" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <InputDateBox 
                    className="" 
                    name="startDateTime[after]" 
                    label="Start zajęć" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <InputDateBox 
                    className="" 
                    name="endDateTime[before]" 
                    label="Koniec zajęć" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <InputTextBox 
                    className="" 
                    name="duration" 
                    label="Długość zajęć" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <CheckboxInput
                    className="" 
                    name="isInvidual" 
                    label="Czy inwidualne" 
                    inputChange={inputChangeOrBlurHandler}
                />
                <InputTextBox 
                    className="" 
                    name="fees" 
                    label="Opłata" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <InputSelectBox 
                    className="" 
                    name="coach.id" 
                    label="Trener"
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

export default LessonsFilter