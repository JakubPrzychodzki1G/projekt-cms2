"use client"

import { useState ,useContext, useEffect } from "react";
import api from "@/components/Api/ApiActions";
import InputTextBox from "@/components/inputs/inputtextbox";
import InputTextarea from "@/components/inputs/inputtextarea";
import InputDateBox from "@/components/inputs/inputdatebox";
import InputCheckbox from "@/components/inputs/inputcheckbox";
import InputSelectBox from "@/components/inputs/inputselectbox";
import { UserState } from "@/components/simple/clientAuthProvider";
import { MenuItem } from "@mui/material";

const inputClasses = "w-3/4"

const AddLesson = (props) => {
    const user = useContext(UserState);
    const [coachesData, setCoachesData] = useState([]);
    const [playersData, setPlayersData] = useState([]);
    const [swimGroupsData, setSwimGroupsData] = useState([]);
    const [playersInSwimGroupData, setPlayersInSwimGroupData] = useState([]);
    const [loading, setLoading] = useState(true);
    const readOnly = false;

    const fetchCoaches = async (options = '') => {
        const getOptions = {
            params: {
                isDeleted: false,
                isCoach: true,
                ...options
            }
        };
        const res = await api.getUsers(getOptions)
        if(res) {
            setCoachesData(res);
            setLoading(false);
        }
    }

    const fetchGroups = async (options = '') => {
        const getOptions = {
            params: {
                isDeleted: false,
                ...options
            }
        };
        setLoading(true);
        const res = await api.getGroups(getOptions)
        if(res) {
            setSwimGroupsData(res);
            setLoading(false);
        }
    }

    const fetchPlayers = async (options = '') => {
        const getOptions = {
            params: {
                isDeleted: false,
                ...options
            }
        };
        const res = await api.getPlayers(getOptions)
        if(res) {
            options !== '' ? setPlayersInSwimGroupData(res) : setPlayersData(res);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCoaches();
        props.initializeFormData({
            "name": '',
            "pool": '',
            "equipment": '',
            "description": '',
            "duration": '',
            "objectives": '',
            "fees": '',
            "swimGroup.id": "",
            "startDateTime": '',
            "endDateTime": '',
            "players": [],
            "coach": `/api/users/${user.id}`,
            "comments": '',
            "isInvidual": false,
        })
        props.checkFunc((count) => {
            return count === 3;
        })
        props.endpointFunc(async (formData) => {
            setLoading(true);
            const formDataToSend = formData;
            if(!Array.isArray(formDataToSend["players"])) formDataToSend["players"] = [formDataToSend["players"]]
            await api.postLesson(formDataToSend)
            .then((res) => {
                props.refresh();
                props.close();
                return res;
            })
            .catch((err) => {
                setLoading(false);
                throw err;
            })
        })
        fetchGroups();
    }, [])

    useEffect(() => {
        if(props.formData["isInvidual"]) {
            fetchPlayers();
        }
        else if (props.formData["swimGroup.id"]){
            fetchPlayers({"swimGroup.id": props.formData["swimGroup.id"]});
        }
    }, [props.formData["isInvidual"], props.formData["swimGroup.id"]])
    return (
        props.error ?
        <div className="p-20">
            <p className="text-red-500 font-42">Wystąpił błąd podczas dodawania</p>
        </div> 
        :
        (!loading ? 
        <form className="w-full h-full flex flex-col items-center">
            <InputTextBox 
                className={inputClasses}
                name='name'
                label="Nazwa lekcji"
                inputChange={props.inputChangeHandler}
                formIsValid={props.changeCountFormValid} 
                errorText="Nazwa lekcji nie możebyć pusta!"
                validateFunction={(value) => {return value !== ''}} 
                readOnly={props.isReadOnly}
                value={props.formData["name"]}
            />
            <InputTextBox 
                className={inputClasses}
                name='pool'
                label="Basen"
                inputChange={props.inputChangeHandler}
                formIsValid={props.changeCountFormValid} 
                errorText="Basen nie możebyć pusty!"
                validateFunction={(value) => {return value !== ''}} 
                readOnly={props.isReadOnly}
                value={props.formData["pool"]}
            />
            <InputTextBox 
                className={inputClasses}
                name='equipment'
                label="Potrzebne przedmioty"
                inputChange={props.inputChangeHandler}
                readOnly={props.isReadOnly}
                value={props.formData["equipment"]}
            />
            <InputTextarea
                className={inputClasses}
                name='description'
                label="Opis lekcji" 
                inputChange={props.inputChangeHandler}
                readOnly={props.isReadOnly}
                value={props.formData["description"]}
            />
            <InputTextBox
                className={inputClasses}
                type="number"
                name='duration'
                label="Długość zajęć (minuty)" 
                inputChange={props.inputChangeHandler}
                formIsValid={props.changeCountFormValid}
                errorText="Długość zajęć nie możebyć pusta!"
                validateFunction={(value) => {return value !== ''}} 
                readOnly={props.isReadOnly}
                value={props.formData["duration"]}
            />
            <InputTextBox
                className={inputClasses}
                name='objectives'
                label="Cele zajęć"
                inputChange={props.inputChangeHandler}
                readOnly={props.isReadOnly}
                value={props.formData["objectives"]}
            />
            <InputTextBox
                className={inputClasses}
                name='fees'
                label="Opłaty za zajęcia"
                inputChange={props.inputChangeHandler}
                readOnly={props.isReadOnly}
                value={props.formData["fees"]}
            />
            <InputDateBox 
                className={inputClasses} 
                name="startDateTime" 
                label="Start zajęć"
                inputChange={props.inputChangeHandler}
                readOnly={props.isReadOnly}
                value={props.formData["startDateTime"]}
                isDateTime={true}
            />
            <InputDateBox 
                className={inputClasses} 
                name="endDateTime" 
                label="Koniec zajęć" 
                inputChange={props.inputChangeHandler}
                readOnly={props.isReadOnly}
                value={props.formData["endDateTime"]}
                isDateTime={true}
            />
            <InputSelectBox 
                className={`${inputClasses} mb-5`} 
                name="coach" 
                label="Trener"
                inputChange={props.inputChangeHandler}
                validateFunction={(value) => {return value !== ''}} 
                formIsValid={props.changeCountFormValid} 
                value={props.formData["coach"]}
                readOnly={readOnly}
            >
                <MenuItem value={''}></MenuItem>
                {
                    coachesData && coachesData.map((x) => {
                        return (
                            <MenuItem key={x.id} value={`/api/users/${x.id}`}>{`${x.name} ${x.lastName}`}</MenuItem>
                        )
                    })
                }
            </InputSelectBox>
            <InputTextarea
                className={`${inputClasses} mb-5`}
                name='comments'
                label="Dodatkowe komentarze" 
                inputChange={props.inputChangeHandler}
                readOnly={props.isReadOnly}
            />
            <InputCheckbox
                className={`${inputClasses} mb-5`}
                name='isInvidual'
                label="Czy zajęcia indywidualne" 
                inputChange={props.inputChangeHandler}
                readOnly={props.isReadOnly}
                checked={props.formData["isInvidual"]}
            />
            {
                props.formData["isInvidual"] 
                ?
                <InputSelectBox 
                    className={`${inputClasses} mb-5`} 
                    name="players" 
                    label="Zawodnik"
                    inputChange={props.inputChangeHandler}
                    value={props.formData["players"]}
                    readOnly={props.isReadOnly}
                >
                    <MenuItem value={''}></MenuItem>
                    {
                        playersData && playersData.map((x) => {
                            return (
                                <MenuItem key={x.id} value={`/api/players/${x.id}`}>{`${x.firstName} ${x.lastName}`}</MenuItem>
                            )
                        })
                    }
                </InputSelectBox>
                :
                <>
                    <InputSelectBox 
                        className={`${inputClasses} mb-5`} 
                        name="swimGroup.id" 
                        label="Grupa"
                        inputChange={props.inputChangeHandler}
                        readOnly={props.isReadOnly}
                        value={props.formData["swimGroup.id"]}
                    >
                        {
                            swimGroupsData && swimGroupsData.map((x) => {
                                return (
                                    <MenuItem key={x.id} value={`/api/swim_groups/${x.id}`}>{`${x.name}`}</MenuItem>
                                )
                            })
                        }
                    </InputSelectBox>
                    {
                        playersInSwimGroupData.length > 0 && <InputSelectBox 
                            className={`${inputClasses} mb-5`} 
                            name="players" 
                            label="Zawodnicy"
                            inputChange={props.inputChangeHandler}
                            readOnly={props.isReadOnly}
                            value={props.formData["players"]}
                            multiple={true}
                        >
                            {
                                playersInSwimGroupData && playersInSwimGroupData.map((x) => {
                                    return (
                                        <MenuItem key={x.id} value={`/api/players/${x.id}`}>{`${x.firstName} ${x.lastName}`}</MenuItem>
                                    )
                                })
                            }
                        </InputSelectBox>
                    }
                </>
            }
            <div>
                <button  className="p-4 bg-blue-500 text-white font-bold rounded-xl mb-4" onClick={props.addEntity}>
                    Dodaj Zajęcia
                </button>
            </div>
            {props.formIsValid === false && <p className="text-red-500 mb-4">Formularz nie jest wypełniony poprawnie!</p>}
        </form>
        :
        <div className="text-3xl font-semibold text-slate-700 mb-12">
            <svg aria-hidden="true" className="w-32 h-32 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
        )

    )
}

export default AddLesson