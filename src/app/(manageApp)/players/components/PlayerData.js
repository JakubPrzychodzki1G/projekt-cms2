"use client";

import InputSelectBox from "@/components/inputs/inputselectbox";
import InputDateBox from "@/components/inputs/inputdatebox";
import InputTextBox from "@/components/inputs/inputtextbox";
import InputTextarea from "@/components/inputs/inputtextarea";
import { MenuItem } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";

const PlayerData = (props) => {
    const [coachesData, setCoachesData] = useState([]);
    const [playerData, setPlayerData] = useState({});
    const [loading, setLoading] = useState(true);
    const timeoutUpdate = useRef(null);

    const inputChangeHandler = async (event, name, callback) => {
        callback();
        var result = '';
        const patchHeaders = new Headers();
        patchHeaders.append("Content-Type", "application/merge-patch+json");
        patchHeaders.append("accept", "application/ld+json");

        const patchRequestOptions = {
            method: 'PATCH',
            headers: patchHeaders,
            body: JSON.stringify({[name]: name.includes('Date') ? event.$d : event.target.value})
        }

        clearTimeout(timeoutUpdate.current);
        await new Promise((resolve, reject) => {
            timeoutUpdate.current = setTimeout(async () => {
                await fetch(`/api/players/${props.id}`, patchRequestOptions)
                .then(response => {
                    if(response.ok){
                        result = 'success';
                    }
                    else{
                        result = 'error';
                    }
                })
                .catch(error => {result = 'error'});
                resolve();
            }, 500)
        })
        return result;
    }

    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    useEffect(() => {
        fetch("/api/users?isCoach=true&isDeleted=false", requestOptions)
        .then((res) => res.json())
        .then((data) => {
            setCoachesData(data)
            // setLoading(false)
        })
        .catch(error => console.log('error', error));
    }, [])

    useEffect(() => {
        fetch(`/api/players/${props.id}`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            setPlayerData(data)
            setLoading(false)
        })
        .catch(error => console.log('error', error));
    }, [])

    const validateEmail = (email) => {
        return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            { !loading ? (
            <div>
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                    {props.name}
                </h4>
                <InputTextBox 
                    className="md:col-span-5" 
                    name="lastName" 
                    label="Nazwisko" 
                    validateFunction={(value) => {return value !== '' && value.trim().length >= 3}} 
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze podać poprawne Nazwisko!"
                    value={playerData.lastName}
                    readOnly={props.isReadOnly}
                />
                <InputTextBox 
                    className="md:col-span-3" 
                    name="firstName" 
                    label="Imie" 
                    validateFunction={(value) => {return value !== '' && value.trim().length >= 3}} 
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze podać poprawne Imie!"
                    value={playerData.firstName}
                    readOnly={props.isReadOnly}
                />
                <InputSelectBox 
                    className="md:col-span-2" 
                    name="sex" 
                    label="Płeć" 
                    validateFunction={(value) => {return value !== ''}} 
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze wybierać jedną z opcji"
                    value={playerData.sex}
                    readOnly={props.isReadOnly}
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
                    inputChange={inputChangeHandler}
                    errorText="Prosze wprowadzić poprawną date urodzenią, Dziecko musi mieć minimalnie 4 lata!"
                    value={playerData.birthDate}
                    readOnly={props.isReadOnly}
                />
                <InputTextBox 
                    className="md:col-span-5" 
                    name="schoolName" 
                    label="Nazwa szkoły / przedszkola" 
                    validateFunction={(value) => {return value !== '' && value.trim().length > 2}} 
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze wprowadzić poprawną nazwe szkoły, musi ona mieć minimum 3 znaki"
                    value={playerData.schoolName}
                    readOnly={props.isReadOnly}
                />
                <InputTextBox 
                    className="md:col-span-2" 
                    name="city" 
                    label="Miejscowość zamieszkania" 
                    validateFunction={(value) => {return value !== '' && value.trim().length > 1}} 
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze wprowadzić poprawną nazwe miejscowości"
                    value={playerData.city}
                    readOnly={props.isReadOnly}
                />
                <InputTextBox 
                    className="md:col-span-2" 
                    name="streetAndNumber" 
                    label="Ulica i numer domu" 
                    validateFunction={(value) => {return value !== '' && value.trim().length >= 3 && value.trim().length < 100}} 
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze wprowadzić poprawne dane zamieszkania"
                    value={playerData.streetAndNumber}
                    readOnly={props.isReadOnly}
                />
                <InputTextBox 
                    className="md:col-span-1" 
                    name="zipCode" 
                    label="Kod pocztowy" 
                    validateFunction={(value) => {return value !== '' && value.trim().length == 6}} 
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze wprowadzić poprawny kod, kod pocztowy musi mieć 6 znaków"
                    value={playerData.zipCode}
                    readOnly={props.isReadOnly}
                />
                <span className="md:col-span-5 mt-3 text-lg font-semibold">Pierwszy rodzic / opiekun *</span>
                <hr className="md:col-span-5 bg-blue-500 h-[2px] mr-64" />
                <InputTextBox 
                    className="md:col-span-3" 
                    name="parentLastName" 
                    label="Nazwisko" 
                    validateFunction={(value) => {return value !== '' && value.trim().length >= 3 && value.trim().length < 80}} 
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze podać poprawne nazwisko"
                    value={playerData.parentLastName}
                    readOnly={props.isReadOnly}
                />
                <InputTextBox 
                    className="md:col-span-2" 
                    name="parentFirstName" 
                    label="Imie" 
                    validateFunction={(value) => {return value !== '' && value.trim().length >= 3 && value.trim().length < 50}} 
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze podać poprawne imię"
                    value={playerData.parentFirstName}
                    readOnly={props.isReadOnly}
                />
                <span className="md:col-span-5 mt-3 text-lg font-semibold">Drugi rodzic / opiekun</span>
                <hr className="md:col-span-5 bg-blue-500 h-[2px] mr-52" />
                <InputTextBox 
                    className="md:col-span-3" 
                    name="parent2LastName" 
                    label="Nazwisko" 
                    validateFunction={(value) => {return value.trim().length < 80}} 
                    inputChange={inputChangeHandler}
                    errorText="Za długie!"
                    value={playerData.parent2LastName}
                    readOnly={props.isReadOnly}
                />
                <InputTextBox 
                    className="md:col-span-2" 
                    name="parent2FirstName" 
                    label="Imie" 
                    validateFunction={(value) => {return value.trim().length < 50}} 
                    inputChange={inputChangeHandler}
                    errorText="Za długie!"
                    value={playerData.parent2FirstName}
                    readOnly={props.isReadOnly}
                />
                <InputTextBox 
                    className="md:col-span-5" 
                    name="contactEmail" 
                    label="Adres email do kontaktu" 
                    validateFunction={(value) => {return value !== '' && value.trim().length >= 5 && value.trim().length < 255 && validateEmail(value)}} 
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze wprowadzić poprawmy adres e-mail"
                    value={playerData.contactEmail}
                    readOnly={props.isReadOnly}
                />
                <InputTextBox 
                    className="md:col-span-5" 
                    name="mainNumber" 
                    label="Telefon kontaktowy główny" 
                    validateFunction={(value) => {return value !== '' && value.trim().length == 9}} 
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze wprowadzić poprawny numer telefonu komórkowe składający się z 9 cyfr"
                    value={playerData.mainNumber}
                    readOnly={props.isReadOnly}
                />
                <InputTextBox 
                    className="md:col-span-3" 
                    name="additionalNumber" 
                    label="Telefon dodatkowy" 
                    validateFunction={(value) => {return value !== '' && value.trim().length == 9}} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze wprowadzić poprawny numer telefonu komórkowe składający się z 9 cyfr"
                    value={playerData.additionalNumber}
                    readOnly={props.isReadOnly}
                />
                <InputTextBox 
                    className="md:col-span-2" 
                    name="playerNumber" 
                    label="Telefon kontaktowy zawodnika" 
                    validateFunction={(value) => {return value !== '' && value.trim().length == 9}} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze wprowadzić poprawny numer telefonu komórkowe składający się z 9 cyfr"
                    value={playerData.playerNumber}
                    readOnly={props.isReadOnly}
                />
                <InputSelectBox 
                    className="md:col-span-5" 
                    name="skill" 
                    label="Wybierz poziom zaawansowania uczestnika zajęć" 
                    validateFunction={(value) => {return value !== ''}} 
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze wybrać jedną z opcji"
                    value={playerData.skill}
                    readOnly={props.isReadOnly}
                >
                    <MenuItem value={'1'}>nie unosi się samodzielnie na wodzie bez przyrządów (zajęcia na brodziku)</MenuItem>
                    <MenuItem value={'2'}>dobrze unosi się na wodzie bez przyrządów (zajęcia na torze)</MenuItem>
                    <MenuItem value={'3'}>potrafi pływać jednym stylem</MenuItem>
                    <MenuItem value={'4'}>potrafi pływać więcej niż jednym stylem</MenuItem>
                </InputSelectBox>
                <InputSelectBox 
                    className="md:col-span-5" 
                    name="coach" 
                    label="Dotychczasowy (preferowany) trener" 
                    validateFunction={(value) => {return value !== ''}} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze wybrać jedną z opcji"
                    value={playerData.coach}
                    readOnly={props.isReadOnly}
                >
                    {
                        coachesData.map((x) => {
                            return (
                                <MenuItem key={x.id} value={x.id}>{x.name+" "+x.lastName}</MenuItem>
                            )
                        })
                    }
                </InputSelectBox>
                <InputTextarea 
                    className="md:col-span-5" 
                    name="comments" 
                    label="Uwagi" 
                    validateFunction={(value) => {return value !== ''}} 
                    inputChange={inputChangeHandler}
                    value={playerData.comments}
                    readOnly={props.isReadOnly}
                />
            </div>
        ) : (
            <p className="mb-6">Loading...</p>
        )}
        </div>
    )
}

export default PlayerData;