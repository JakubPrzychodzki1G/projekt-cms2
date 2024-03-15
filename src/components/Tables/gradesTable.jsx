"use client"

import { useEffect, useState, useContext, useRef } from "react"
import { UserState } from "@/components/simple/clientAuthProvider"
import Link from "next/link"
import GroupsFilter from "@/components/Filters/GroupsFilter"
import AddButton from "@/components/Forms/AddButton"
import { useRouter } from "next/navigation"
import api from '../Api/ApiActions';
import { Tooltip } from "@mui/material"
import dayjs from 'dayjs';
import InputTextBox from "../inputs/inputtextbox"
import InputDateBox from "../inputs/inputdatebox"
import InputTextarea from "../inputs/inputtextarea"
import _ from "lodash"
import { ItemValidator } from "@/app/(manageApp)/components/Auth/ItemValidator"

const GradesTable = (props) => {
    const [playerWithGradesData, setPlayerWithGradesData] = useState([]);
    const [page, setPage] = useState(1);
    const user = useContext(UserState);
    const [loading, setLoading] = useState(false);
    const isEditor = user.roles?.includes("ROLE_USER") || user.roles?.includes("ROLE_ADMIN");
    const [modal, setModal] = useState({open: false, type: null, data: null});
    const [gradeDataForModal, setGradeDataForModal] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const timeoutUpdate = useRef(null);

    const clickHandler = (gradeData = {}) => {
        setGradeDataForModal(gradeData);
        setIsModalOpen(prevState => !prevState);
    }

    const fetchGradesData = async () => {
        setLoading(true);
        const res = await api.getPlayers({
            "params": {
                "page": page,
                "properties[0]": "lastName",
                "properties[1]": "grades",
                "properties[grades][0]": "value",
                "properties[grades][1]": "description",
                "properties[grades][2]": "createDate",
                "properties[grades][3]": "modTime",
                "properties[grades][4]": "id",
                "groups[0]": "players:grades:read",
                "properties[2]": "firstName",
                "properties[3]": "id"

            }
        });
        if (res){
            setPlayerWithGradesData(res);
        }
        setLoading(false);
    }

    const updateGrade = async (event, name, callback) => {
        const value = event.target.value;
        var result = ""
        var patchValue = {};
        setPlayerWithGradesData( prevState => {
            return prevState.map((playerWithGrades) => {
                const nameArray = name.split('.');
                if(playerWithGrades.id === +nameArray[0]) {
                    nameArray.splice(0, 2);
                    _.set(playerWithGrades, [...nameArray], value)
                    patchValue[nameArray[nameArray.length - 1]] = value;
                }
                return playerWithGrades;
            })
        })
        callback();
        clearTimeout(timeoutUpdate.current);
        await new Promise((resolve, reject) => {
            timeoutUpdate.current = setTimeout(async () => {
                const res = await api.patchGrade(+name.split(".")[1], patchValue);
                if(res) {
                    result = 'success';
                }
                else {
                    result = 'error';
                }
                resolve();
            }, 1000)
        })
        return result;
    }

    const deleteGrade = async (id, playerId, gradeKey) => {
        const res = await api.deleteGrade(id);
        if(res) {
            setPlayerWithGradesData( prevState => {
                var playerKey = null;
                const modGrades = prevState.find((playerWithGrades, key) => {playerKey = key; return playerWithGrades.id === playerId})?.grades.filter((grade) => grade.id !== id)
                if(!modGrades) return prevState;
                prevState[playerKey].grades = modGrades;
                return prevState
            })
            setIsModalOpen(false);
        }
    }

    useEffect(() => {
        fetchGradesData();
    }, []);

    return (
        <>
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex justify-between">
                    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                    Oceny zawodników
                    </h4>
                </div>
                <div className="flex flex-col">
                    {/* <GroupsFilter filterHandler={filterGroupsHandler}/> */}
                    <div className={`grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 ${isEditor ? 'sm:grid-cols-5' : 'sm:grid-cols-4'}`}>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Imie i nazwisko
                            </h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5 col-start-2 col-end-6">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Oceny
                            </h5>
                        </div>
                    </div>

                    {playerWithGradesData && playerWithGradesData.map((playerWithGrades, key) => (
                    <div
                        className={`grid grid-cols-4 ${isEditor ? 'sm:grid-cols-5' : 'sm:grid-cols-4'}`}
                        key={key}
                    >
                        <Link href={`/players/show/${playerWithGrades.id}`} className="flex items-center justify-start p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{`${playerWithGrades.firstName} ${playerWithGrades.lastName}`}</p>
                        </Link>

                        <div className="flex items-center justify-start p-2.5 xl:p-5 col-start-2 col-end-6">
                            <ItemValidator permission="gradeBox_show">
                            {
                                playerWithGrades.grades.length > 0 ?
                                    playerWithGrades.grades.map((grade, gradeKey) => (
                                        <div id={`gradeBox_${gradeKey}`} className="flex flex-col items-center justify-center p-1 mr-1 mb-1 border rounded-lg" key={gradeKey} onClick={() => clickHandler({...grade, "gradeKey": gradeKey, playerId: playerWithGrades.id})}>
                                            <Tooltip 
                                                title={
                                                    <div>
                                                        <p>{`Opis: ${grade.description},`}</p>
                                                        <p>{`Data dodania: ${dayjs(grade.createDate).format('DD.MM.YYYY')},`}</p>
                                                        <p>{`Godzina dodania: ${dayjs(grade.createDate).format('HH:mm')},`}</p>
                                                        <p>{`Data modyfikacji: ${dayjs(grade.modTime).format('DD.MM.YYYY')},`}</p>
                                                        <p>{`Godzina modyfikacji: ${dayjs(grade.modTime).format('HH:mm')}`}</p>
                                                        <p>{`Dodane przez: ${grade.addedBy?.name} ${grade.addedBy?.lastName}`}</p>
                                                    </div>
                                                }
                                            >
                                                <p className="text-black dark:text-white">{grade.value}</p>
                                            </Tooltip>
                                        </div>
                                    ))
                                :
                                <div className="flex flex-col items-center justify-center p-1 mr-1 mb-1 border rounded-lg bg-blue-200">
                                    <p className="text-black dark:text-white">Brak ocen</p>
                                </div>
                            }
                            </ItemValidator>
                            <div>
                                <AddButton 
                                    component="addGrade"
                                    player={playerWithGrades}
                                    refresh={fetchGradesData}
                                    buttonClassName = "py-1 px-2 mb-1 rounded-lg"
                                />
                            </div>
                        </div>
                    {/* </div> */}
                    </div>
                    ))}
                </div>
            </div>
            <ItemValidator permission="gradeBox_edit">
            {
                isModalOpen && 
                <div className="fixed top-0 bottom-0 left-0 lg:left-72.5 right-0 bg-black bg-opacity-20 flex justify-center items-center z-99999">
                    <div className="absolute w-5/6 md:w-1/2 2xl:w-1/3 p-6 bg-white rounded-xl flex flex-col items-center">
                        <div className="w-full flex justify-between">
                            <h1 className="p-5 text-lg font-bold">Dane oceny</h1>
                            <button className="bg-red-500 w-10 h-10 m-4 rounded-lg text-white flex justify-center items-center" onClick={clickHandler}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                        <form className="w-full h-full flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
                            <InputTextBox
                                value={`${gradeDataForModal.addedBy?.name} ${gradeDataForModal.addedBy?.lastName}`} 
                                label="Dodane przez"
                                className="w-full"
                                name="addedBy"
                                readOnly={true}
                            />
                            <InputTextBox
                                value={gradeDataForModal.value} 
                                label="Wartość oceny"
                                className="w-full"
                                inputChange={updateGrade}
                                readOnly={isEditor ? props.isReadOnly : true}
                                name={`${gradeDataForModal.playerId}.${gradeDataForModal.id}.grades.${gradeDataForModal.gradeKey}.value`}
                            />
                            <InputTextarea
                                value={gradeDataForModal.description} 
                                label="Opis oceny"
                                className="w-full"
                                inputChange={updateGrade}
                                readOnly={isEditor ? props.isReadOnly : true}
                                name={`${gradeDataForModal.playerId}.${gradeDataForModal.id}.grades.${gradeDataForModal.gradeKey}.description`}
                            />
                            <InputDateBox
                                isDateTime={true}
                                value={gradeDataForModal.createDate} 
                                label="Utworzona"
                                className="w-full"
                                name="createDate"
                                readOnly={true}
                            />
                            <InputDateBox
                                isDateTime={true}
                                value={gradeDataForModal.modTime} 
                                label="Modyfikowana"
                                className="w-full"
                                name="modTime"
                                readOnly={true}
                            />
                            <ItemValidator permission="deleteGrade">
                                <button 
                                    className="p-4 mt-4 bg-red-500 text-white font-bold rounded-xl mb-6" 
                                    onClick={(e) => deleteGrade(gradeDataForModal.id, gradeDataForModal.playerId, gradeDataForModal.gradeKey)}
                                >
                                    Usuń ocenę
                                </button>
                            </ItemValidator>
                        </form>
                    </div>
                    <div className="w-full h-full" onClick={clickHandler}>

                    </div>
                </div>
            }
            </ItemValidator>
        </>
    )
}

export default GradesTable;