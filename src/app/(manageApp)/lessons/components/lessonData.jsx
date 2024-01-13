import InputDateBox from "@/components/inputs/inputdatebox"
import InputTextBox from "@/components/inputs/inputtextbox"
import api from "@/components/Api/ApiActions";
import InputTextarea from "@/components/inputs/inputtextarea";
import InputCheckbox from "@/components/inputs/inputcheckbox";
import InputSelectBox from "@/components/inputs/inputselectbox";
import { MenuItem } from "@mui/material";
import LittlePlayerTable from "@/components/Tables/LittlePlayerTable";
import { useEffect, useState } from "react";
import AddPlayer from "../../groups/components/AddPlayer";

const LessonData = (props) => {
    const [playersData, setPlayersData] = useState([]);
    const [swimGroupsData, setSwimGroupsData] = useState([]);
    const [groupId, setGroupId] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [allReadyAddedPlayers, setAllReadyAddedPlayers] = useState([]); // [id, id, id
    const [addingPlayer, setAddingPlayer] = useState(false);

    const addNewPlayer = async (e, playerId) => {
        e.preventDefault();
        setAddingPlayer(true);
        const modPlayers = [...props.data.players, `/api/players/${playerId}`];
        const res = await api.patchLesson(props.data.id, {players: modPlayers});
        if(res) {
            props.setLessonProperty('players', modPlayers)
            const isNewPlayersFetched = await fetchPlayers();
            if(isNewPlayersFetched) {
                setTimeout(() => {setAddingPlayer(false);}, 2000);
            }
        }
    }
    const toSettingLoading = (value) => {
        setAddingPlayer(value);
    }
    const fetchGroups = async (options = '') => {
        const getOptions = {
            params: {
                isDeleted: false,
                ...options
            }
        };
        const res = await api.getGroups(getOptions)
        if(res) {
            setSwimGroupsData(res);
        }
        return 'end';
    }

    const inputChangeHandler = async (event, name, callback) => {
        const value = name.includes('Date') ? event.$d : (event.target?.type == 'number' ? +event.target.value : (event.target?.type == "checkbox" ? event.target.checked : event.target.value)) 
        props.setLessonProperty(name, value);
        callback();
        const res = await api.patchLesson(props.data.id, {[name]: value})
        if (res) {
            return 'success';
        }
        else {
            return 'error';
        }
    }
    const fetchPlayers = async () => {
        await Promise.all(props.data.players.map(async (element) => {
            if (playersData.some(value => `/api/players/${value.id}` === element)) return;
            const res = await api.get(element.replace("/api", ""))
            if(res) {
                setPlayersData((prevState) => {
                    return prevState.find( val => val.id === res.id) ? [...prevState] : [...prevState, res]
                })
                setAllReadyAddedPlayers((prevState) => {
                    return [...prevState, res.id]
                })
                setGroupId(res.swimGroup[0]?.id);
            }
        }));
        return 'end';
    }

    const deletePlayer = async (e, playerId) => {
        e.preventDefault();
        e.stopPropagation();
        const modPlayers = props.data.players.filter((player) => player !== `/api/players/${playerId}`);

        const res = await api.patchLesson(props.data.id, {players: modPlayers});
        if(res) {
            props.setLessonProperty('players', modPlayers)
            setAllReadyAddedPlayers((prevState) => {
                return prevState.filter((player) => player !== playerId)
            })
            setPlayersData((prevState) => {
                return prevState.filter((player) => player.id !== playerId)
            })
        }
    }

    const functionForUseEffect = async () => {
        const res1 = await fetchPlayers();
        const res2 = await fetchGroups();
        setLoading(false);
    }

    useEffect(() => {
        if(props.data.players) functionForUseEffect();
    }, [props.data.players])
    
    // useEffect(() => {
    //     fetchGroups();
    // }, [])

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            { !props.loading ? (
            <div>
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                    {props.name}
                </h4>
                <InputTextBox 
                    className="md:col-span-5" 
                    name="name" 
                    label="Temat lekcji" 
                    validateFunction={(value) => {return value !== '' && value?.trim().length >= 3}} 
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze podać poprawny temat lekcji!"
                    value={props.data.name}
                    readOnly={props.isReadOnly}
                />
                <InputDateBox
                    className="md:col-span-3" 
                    name="startDateTime" 
                    label="Początek zajęć"
                    validateFunction={(value) => {return value}}
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze podać poprawną date!"
                    value={props.data.startDateTime}
                    readOnly={props.isReadOnly}
                    isDateTime={true}
                />
                <InputDateBox
                    className="md:col-span-3" 
                    name="creationDate" 
                    label="Data utworzenia zajęć"
                    value={props.data.creationDate}
                    readOnly={true}
                    isDateTime={true}
                />
                <InputDateBox
                    className="md:col-span-3" 
                    name="endDateTime" 
                    label="Koniec zajęć"
                    validateFunction={(value) => {return value}} 
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze podać poprawną date!"
                    value={props.data.endDateTime}
                    readOnly={props.isReadOnly}
                    isDateTime={true}
                />
                <InputTextarea 
                    className="md:col-span-5" 
                    name="description" 
                    label="Opis lekcji" 
                    inputChange={inputChangeHandler}
                    value={props.data.description}
                    readOnly={props.isReadOnly}
                />
                <InputTextBox 
                    className="md:col-span-5" 
                    type="number"
                    name="duration" 
                    label="Długość lekcji (w minutach)" 
                    validateFunction={(value) => {return value > 0}} 
                    formIsValid={props.toggleValidity} 
                    onBlur={inputChangeHandler}
                    errorText="Prosze podać poprawną długość lekcji!"
                    value={props.data.duration}
                    readOnly={props.isReadOnly}
                />
                <InputTextBox 
                    className="md:col-span-5" 
                    name="pool" 
                    label="Basen" 
                    validateFunction={(value) => {return value !== '' && value?.trim().length >= 3}} 
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze podać poprawną nazwe basenu!"
                    value={props.data.pool}
                    readOnly={props.isReadOnly}
                />
                <InputTextBox 
                    className="md:col-span-5" 
                    name="ageGroup" 
                    label="Grupa wiekowa" 
                    validateFunction={(value) => {return value !== '' && value?.trim().length >= 3}} 
                    formIsValid={props.toggleValidity} 
                    inputChange={inputChangeHandler}
                    errorText="Prosze podać poprawną nazwe basenu!"
                    value={props.data.ageGroup}
                    readOnly={props.isReadOnly}
                />
                <InputTextBox
                    className="md:col-span-5" 
                    name="objectives" 
                    label="Cele lekcji" 
                    inputChange={inputChangeHandler}
                    value={props.data.objectives}
                    readOnly={props.isReadOnly}
                />
                <InputTextBox
                    className="md:col-span-5" 
                    name="equipment" 
                    label="Potrzebny sprzęt" 
                    inputChange={inputChangeHandler}
                    value={props.data.equipment}
                    readOnly={props.isReadOnly}
                />
                <InputTextarea
                    className="md:col-span-5" 
                    name="comments" 
                    label="Dodatkowe komentarze" 
                    inputChange={inputChangeHandler}
                    value={props.data.comments}
                    readOnly={props.isReadOnly}
                />
                <InputSelectBox 
                    className="md:col-span-5 mb-5" 
                    name="coach" 
                    label="Trener"
                    inputChange={inputChangeHandler}
                    validateFunction={(value) => {return value !== ''}} 
                    formIsValid={props.toggleValidity} 
                    value={props.data.coach}
                    readOnly={props.isReadOnly}
                >
                    {
                        props.coachesData && props.coachesData.map((x) => {
                            return (
                                <MenuItem key={x.id} value={`/api/users/${x.id}`}>{`${x.name} ${x.lastName}`}</MenuItem>
                            )
                        })
                    }
                </InputSelectBox>
                <InputCheckbox
                    className="md:col-span-5 mb-6" 
                    name="isInvidual" 
                    label="Lekcja inwidualna" 
                    inputChange={inputChangeHandler}
                    checked={props.data.isInvidual}
                    readOnly={props.isReadOnly}
                    specialFunc={(e, setErrorToTrue) => {
                        if(!e.target.checked) return false;
                        if(playersData.length > 1) {
                            setErrorToTrue();
                            return true;
                        }
                        else {
                            return false;
                        }
                    }}
                    errorText="Nie można zmienić typu lekcji, ponieważ lekcja ma już przypisanych uczestników! By zmienić typ lekcji, należy najpierw usunąć uczestników tak by został jeden."
                />
                {
                    !loading && <>
                        {
                            !props.data.isInvidual && <InputSelectBox 
                                className={`md:col-span-5 mb-6`} 
                                name="swimGroup.id" 
                                label="Grupa"
                                inputChange={(e) => {
                                    setGroupId(e.target.value)
                                }}
                                specialFunc={(e, setErrorToTrue) => {
                                    if(playersData.length > 0) {
                                        setErrorToTrue();
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                }}
                                errorText="Nie można zmienić grupy, ponieważ lekcja ma już przypisanych uczestników! By zmienić grupę, należy najpierw usunąć uczestników."
                                readOnly={props.isReadOnly}
                                value={playersData[0] && playersData[0].swimGroup[0] ? playersData[0].swimGroup[0].id : 0}
                            >
                                {
                                    swimGroupsData && swimGroupsData.map((x) => {
                                        return (
                                            <MenuItem key={x.id} value={x.id}>{`${x.name}`}</MenuItem>
                                        )
                                    })
                                }
                            </InputSelectBox>
                        }
                        <div className="flex justify-between mb-4">
                            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                                Uczestnicy zajęć
                            </h4>
                            {
                                (props.data.isInvidual || groupId !== -1) && ( playersData.length < 1 || !props.data.isInvidual ) && 
                                    <AddPlayer 
                                        options={props.data.isInvidual ? {'id': allReadyAddedPlayers.toString()} : {"swimGroup.id": groupId, 'id': allReadyAddedPlayers.toString()}} 
                                        players={props.data.players} 
                                        addNewPlayer={addNewPlayer} 
                                        refresh={props.refresh}
                                        loading={addingPlayer}
                                        setLoading={toSettingLoading}
                                    />
                            }
                        </div>
                        <LittlePlayerTable delete={deletePlayer} playersData={playersData} module={"lessons"} isReadOnly={props.isReadOnly}/>
                    </>
                }
            </div>
        ) : (
            <p className="mb-6">Loading...</p>
        )}
        </div>
    )
}

export default LessonData