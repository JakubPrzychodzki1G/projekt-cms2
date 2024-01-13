import InputTextBox from "../inputs/inputtextbox"
import InputSelectBox from "../inputs/inputselectbox"
import { MenuItem } from "@mui/material"
import { useEffect, useState } from "react";

const PlayerFilter = (props) => {
    const [groupsData, setGroupsData] = useState([]);
    const [options, setOptions] = useState("");
    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        
        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        fetch("/api/swim_groups", requestOptions)
        .then(response => response.json())
        .then(result => {
            setGroupsData(result);
        })
        .catch(error => console.log('error', error));
    }, [])

    const inputChangeOrBlurHandler = (event, name, callback) => {
        setOptions((prevState) => {
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
                    name="firstName" 
                    label="Imie Zawodnika" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <InputTextBox 
                    className="" 
                    name="lastName" 
                    label="Nazwisko Zawodnika" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <InputTextBox 
                    className="" 
                    name="parentFirstName" 
                    label="Imie pierwszego rodzica" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <InputTextBox 
                    className="" 
                    name="parentlastName" 
                    label="Nazwisko pierwszego rodzica" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <InputTextBox 
                    className="" 
                    name="parent2FirstName" 
                    label="Imie drugiego rodzica" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <InputTextBox 
                    className="" 
                    name="parent2LastName" 
                    label="Nazwisko drugiego rodzica" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <InputTextBox 
                    className="" 
                    name="contactEmail" 
                    label="Email kontaktowy" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <InputTextBox 
                    className="" 
                    name="mainNumber" 
                    label="Numer telefonu głównego" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <InputTextBox 
                    className="" 
                    name="additionalNumber" 
                    label="Numer telefonu dodatkowego" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <InputTextBox 
                    className="" 
                    name="playerNumber" 
                    label="Numer zawodnika" 
                    onBlur={inputChangeOrBlurHandler}
                />
                <InputSelectBox 
                    className="" 
                    name="skill" 
                    label="Poziom zaawansowania zawodnika" 
                    inputChange={inputChangeOrBlurHandler}
                >
                    <MenuItem value={''}></MenuItem>
                    <MenuItem value={'1'}>nie unosi się samodzielnie na wodzie bez przyrządów (zajęcia na brodziku)</MenuItem>
                    <MenuItem value={'2'}>dobrze unosi się na wodzie bez przyrządów (zajęcia na torze)</MenuItem>
                    <MenuItem value={'3'}>potrafi pływać jednym stylem</MenuItem>
                    <MenuItem value={'4'}>potrafi pływać więcej niż jednym stylem</MenuItem>
                </InputSelectBox>
                <InputSelectBox 
                    className="" 
                    name="swimGroup.name" 
                    label="Grupa"
                    inputChange={inputChangeOrBlurHandler}
                >
                    <MenuItem value={''}></MenuItem>
                    {
                        groupsData && groupsData.map((x) => {
                            return (
                                <MenuItem key={x.id} value={x.name}>{x.name}</MenuItem>
                            )
                        })
                    }
                </InputSelectBox>
                <InputSelectBox 
                    className="" 
                    name="section" 
                    label="Sekcja"
                    inputChange={inputChangeOrBlurHandler}
                >
                    <MenuItem value={''}></MenuItem>
                    <MenuItem value={'sport-section'}>Sekcja sportowa</MenuItem>
                    <MenuItem value={'recreation-section'}>Sekcja rekreacyjna</MenuItem>
                </InputSelectBox>
            </div>
        </div>
    )
}

export default PlayerFilter