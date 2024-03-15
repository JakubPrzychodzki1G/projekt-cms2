import InputDateBox from "@/components/inputs/inputdatebox"
import InputTextBox from "@/components/inputs/inputtextbox"
import api from "@/components/Api/ApiActions";
import InputTextarea from "@/components/inputs/inputtextarea";
import InputCheckbox from "@/components/inputs/inputcheckbox";
import InputSelectBox from "@/components/inputs/inputselectbox";
import { MenuItem } from "@mui/material";
import LittlePlayerTable from "@/components/Tables/LittlePlayerTable";
import { useRef, useEffect, useState } from "react";
import AddPlayer from "../../groups/components/AddPlayer";
import { ItemValidator, getMyPermissions } from "../../components/Auth/ItemValidator";

const LessonData = (props) => {
    const [playersData, setPlayersData] = useState([]);
    const [swimGroupsData, setSwimGroupsData] = useState([]);
    const [groupId, setGroupId] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [allReadyAddedPlayers, setAllReadyAddedPlayers] = useState([]); // [id, id, id]
    const [addingPlayer, setAddingPlayer] = useState(false);
    const [attendances, setAttendances] = useState([]); // [attendance, attendance, attendance]
    const [addingAttendances, setAddingAttendances] = useState(false); // [attendance, attendance, attendance]
    const [playersIdsToAddAttendances, setPlayersIdsToAddAttendances] = useState([]);
    const myPermission = getMyPermissions();
    const timeoutUpdate = useRef(null);

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
        var result = '';
        clearTimeout(timeoutUpdate.current);
        await new Promise((resolve, reject) => {
            timeoutUpdate.current = setTimeout(async () => {
                const res = await api.patchLesson(props.data.id, {[name]: value})
                if (res) {
                    result = 'success';
                }
                else {
                    result = 'error';
                }
                resolve();
            }, 500)
        })
        return result;
    }

    const inputAttendanceChangeHandler = async (event, name, callback) => {
        const value = event.target?.type == 'number' ? +event.target.value : (event.target?.type == "checkbox" ? event.target.checked : event.target.value)
        callback();
        var result = '';
        clearTimeout(timeoutUpdate.current);
        await new Promise((resolve, reject) => {
            timeoutUpdate.current = setTimeout(async () => {
                const res = await api.patchAttendance(event.target.id, {[name]: value})
                if (res) {
                    setAttendances((prevState) => {
                        return [...prevState.filter((attendance) => attendance.id !== res.id), res];
                    });
                    result = 'success';
                }
                else {
                    result = 'error';
                }
                resolve();
            }, 500)
        })
        return result;
    }

    const fetchPlayers = async () => {
        const newPlayersData = [];
        await Promise.all(props.data.players.map(async (element) => {
            const alreadyExistingPlayer = playersData.find(value => `/api/players/${value.id}` === element);
            if (alreadyExistingPlayer){
                newPlayersData.push(alreadyExistingPlayer);
                return;
            }
            const res = await api.get(element.replace("/api", ""))
            if(res) {
                !newPlayersData.find( val => val.id === res.id) && newPlayersData.push(res);
                setAllReadyAddedPlayers((prevState) => {
                    return [...prevState, res.id]
                })
                setGroupId(res.swimGroup[0]?.id);
            }
        }));
        setPlayersData(newPlayersData);
        return 'end';
    }

    const fetchAttendances = async () => {
        const newAttendances = [];
        await Promise.all(props.data.attendances.map(async (element) => {
            const res = await api.get(element.replace("/api", ""))
            if(res) {
                !newAttendances.find( val => val.id === res.id) && newAttendances.push(res);
            }
        }));
        setAttendances(newAttendances);
        return 'end';
    }

    const deletePlayer = async (e, playerId) => {
        e.preventDefault();
        e.stopPropagation();
        const modPlayers = props.data.players.filter((player) => player !== `/api/players/${playerId}`);

        const res = await api.patchLesson(props.data.id, {players: modPlayers});
        if(res) {
            setAllReadyAddedPlayers((prevState) => {
                return prevState.filter((player) => player != playerId)
            })
            setPlayersData((prevState) => {
                playersData.length <= 1 && (setGroupId(-1) || setPlayersIdsToAddAttendances([]));
                return prevState.filter((player) => player.id != playerId)
            })
            setAttendances((prevState) => {
                return prevState.filter((attendance) => attendance.player.replace("/api/players/", "") != playerId)
            })
            props.setLessonProperty('attendances', 
                props.data.attendances
                    .toSpliced(
                        props.data.attendances
                        .indexOf(`/api/attendances/${attendances.find((attendance) => attendance.player.replace("/api/players/", "") == playerId)?.id}`), 1))
            props.setLessonProperty('players', modPlayers)
        }
    }

    const functionForUseEffect = async () => {
        // if(playersData.length < 1) setLoading(true);
        await fetchPlayers();
        if(myPermission.includes('lessonPlayers')){
            await fetchGroups();
            await fetchAttendances();
        }
        setLoading(false);
    }

    const addAttendancesObjectsForAllUsers = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setAddingAttendances(true);
        await Promise.all(playersIdsToAddAttendances.map(async (playerId) => {
            const res = await api.postAttendance(
                {
                    lesson: `/api/lessons/${props.data.id}`,
                    player: `/api/players/${playerId}`,
                }
            );
            if(res) {
                setAttendances((prevState) => {
                    return [...prevState.filter((attendance) => attendance.id !== res.id), res]
                })
                setPlayersIdsToAddAttendances((prevState) => {
                    return prevState.filter((id) => id !== playerId)
                })
            }
        }));
        setAddingAttendances(false);
    }

    useEffect(() => {
        if(props.data.players) functionForUseEffect();
    }, [props.data.players])
    
    useEffect(() => {
        if(loading) return;
        if(attendances.length > 0){
            const arrayOfPlayers = playersData.map((player) => player.id);
            const arrayOfAttendancesPlayers = attendances.map((attendance) => +attendance.player.replace("/api/players/", ""));
            setPlayersIdsToAddAttendances([...new Set([...arrayOfPlayers.filter((id) => !arrayOfAttendancesPlayers.includes(id))])]);
        }
        else{
            playersData.forEach((player) => {
                setPlayersIdsToAddAttendances((prevState) => {
                    return [...new Set([...prevState, player.id])]
                })
            })
        }
    }, [loading, playersData])

    // useEffect(() => {
    //     console.log(playersIdsToAddAttendances)
    // }, [playersIdsToAddAttendances])

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
                    inputChange={inputChangeHandler}
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
                <ItemValidator permission="lessonPlayers">
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
                                    value={playersData[0] ? playersData[0].swimGroup[0].id : 0}
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
                                <h4 className="w-1/5 mb-6 text-xl font-semibold text-black dark:text-white">
                                    Uczestnicy zajęć
                                </h4>
                                <div className="flex w-4/5 justify-end gap-4">
                                {
                                    playersIdsToAddAttendances?.length != 0 && <div className="">
                                        <button className="p-2 md:p-4 w-full bg-blue-500 text-white font-bold rounded-xl" onClick={addAttendancesObjectsForAllUsers}>
                                            {
                                                !addingAttendances 
                                                ? <span>Dodaj obecności</span> 
                                                : 
                                                <div className="w-full flex justify-center">
                                                    <div className="h-6 w-8 border-4 border-white rounded-full animate-spin"></div>
                                                </div>
                                            }
                                        </button>
                                    </div>
                                }
                                {
                                    !props.isReadOnly && (props.data.isInvidual || groupId !== -1) && ( playersData.length < 1 || !props.data.isInvidual ) && 
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
                            </div>
                            <LittlePlayerTable delete={deletePlayer} attendancesChange={inputAttendanceChangeHandler} playersData={playersData} attendances={attendances} module={"lessons"} isReadOnly={props.isReadOnly}/>
                        </>
                    }
                </ItemValidator>
            </div>
        </div>
    )
}

export default LessonData