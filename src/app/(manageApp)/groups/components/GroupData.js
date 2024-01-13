"use client";

import { useEffect, useState } from "react";
import LittlePlayerTable from "@/components/Tables/LittlePlayerTable";
import AddPlayer from "./AddPlayer";
import GroupInputs from "./GroupInputs";

const GroupData = (props) => {
    const [groupsData, setGroupsData] = useState({});
    const [loading, setLoading] = useState(true);
    const [playersData, setPlayersData] = useState([]);

    const inputChangeHandler = async (event, name, callback) => {
        callback();
        let patchHeaders = new Headers();
        patchHeaders.append("Content-Type", "application/merge-patch+json");
        patchHeaders.append("accept", "application/ld+json");

        let patchRequestOptions = {
            method: 'PATCH',
            headers: patchHeaders,
            body: JSON.stringify({[name]: name.includes('Date') ? event.$d : event.target.value})
        }
        return await fetch(`/api/swim_groups/${props.id}`, patchRequestOptions)
        .then(response => {
            if(response.status != 200){
                return 'error';
            }
            else{
                return 'success';
            }
        })
        .catch(error => 'error');
    }

    const addNewPlayer = (e, playerId) => {
        e.preventDefault();
        const modPlayers = [...groupsData.players, `/api/players/${playerId}`]
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/ld+json");
  
        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: JSON.stringify({players: modPlayers})
        };
        fetch(`/api/swim_groups/${props.id}`, requestOptions)
        .then((res) => {
          if(res.ok) {
            fetchGroups();
            setIsOpened(prevState => !prevState);
          }
        })
        .catch(error => console.log('error', error));
    }

    const fetchGroups = async () => {
        var myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        // setLoading(true);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        await fetch(`/api/swim_groups/${props.id}`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            setGroupsData(data)
            setLoading(false)
        })
        .catch(error => console.log('error', error));
    }

    const fetchPlayers = async () => {
        var myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        // mode: 'no-cors'
        };

        await groupsData.players.forEach(async element => {
            await fetch(element, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setPlayersData((prevState) => {
                    return prevState.find( val => val.id === data.id) ? [...prevState] : [...prevState, data]
                })
                setLoading(false)
            })
            .catch(error => console.log('error', error)); 
        });
    }

    const deletePlayer = (e, playerId) => {
        e.preventDefault();
        const modPlayers = groupsData.players.filter((player) => player !== `/api/players/${playerId}`)
        console.log(modPlayers);
        var myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/ld+json");

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify({players: modPlayers})
        };
        fetch(`/api/swim_groups/${groupsData.id}`, requestOptions)
        .then((res) => {
            if(res.ok) {
                e.target.parentNode.parentNode.remove();
                setGroupsData(prevState => {
                    return {
                        ...prevState,
                        players: modPlayers
                    }
                })
            }
        })
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
        fetchGroups();
    }, [])

    useEffect(() => {
        fetchPlayers();
    }, [groupsData.players])

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            { !loading ? (
            <div>
                <div className="flex justify-between">
                    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        {props.name}
                    </h4>
                    {!props.isReadOnly && <AddPlayer players={groupsData.players} options={{"exists[swimGroup]": false}} addNewPlayer={addNewPlayer} refresh={fetchGroups}/>}
                </div>
                <GroupInputs inputChangeHandler={inputChangeHandler} groupsData={groupsData} isReadOnly={props.isReadOnly} groupId={props.id}/>
                <div className="mb-2 text-xl font-bold">
                    <p>Zawodnicy w grupie</p>
                </div>
                <LittlePlayerTable delete={deletePlayer} playersData={playersData} players={groupsData.players} module={"groups"} isReadOnly={props.isReadOnly} refresh={fetchGroups}/>
            </div>
        ) : (
            <p className="mb-6">Loading...</p>
        )}
        </div>
    )
}

export default GroupData;