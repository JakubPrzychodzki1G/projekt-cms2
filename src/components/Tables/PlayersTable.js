"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { UserState } from "@/components/simple/authProvider"
import Link from "next/link"
import PlayerFilter from "@/components/Filters/PlayerFilter"

const PlayersTable = () => {
  const [playersData, setPlayersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useContext(UserState);
  const [filterOptions, setFilterOptions] = useState("");

  const fetchPlayers = async (options = '') => {
    const roles = user?.roles;
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    // mode: 'no-cors'
    };

    await fetch(`/api/players?isDeleted=false${options}`, requestOptions)
    .then((res) => res.json())
    .then((data) => {
        setPlayersData(data)
        setLoading(false)
    })
    .catch(error => console.log('error', error));
  } 

  useEffect(() => {
    fetchPlayers();
  }, [])

  const isEditor = user.roles?.includes("ROLE_USER") || user.roles?.includes("ROLE_ADMIN"); 
  
  const deletePlayer = (e, playerId) => {
    e.preventDefault();
    // console.log(e.target.parentNode.parentNode);
    var myHeaders = new Headers();
    myHeaders.append("accept", "*/*");

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders
    };

    fetch(`/api/players/${playerId}`, requestOptions)
    .then((res) => {
      if(res.ok) {
        e.target.parentNode.parentNode.remove();
      }
    })
    .catch(error => console.log('error', error));
  }

  const filterPlayersHandler = (options) => {
    // setFilterOptions(options);
    fetchPlayers(options);
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Zawodnicy
      </h4>

      <div className="flex flex-col">
        <PlayerFilter filterHandler={filterPlayersHandler}/>
        <div className={`grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 ${isEditor ? 'sm:grid-cols-5' : 'sm:grid-cols-3'}`}>
          {/* <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Zdjęcie
            </h5>
          </div> */}
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Imie
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nazwisko
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Grupa
            </h5>
          </div>
          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Edycja
            </h5>
          </div> */}
        </div>

        {playersData && playersData.map((player, key) => (
          <Link href={`/players/show/${player.id}`}
          // <div
            className={`grid grid-cols-3 ${isEditor ? 'sm:grid-cols-5' : 'sm:grid-cols-3'} ${
              key === playersData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            {/* <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <Image src={player.logo} alt="Brand" width={48} height={48} />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {player.name}
              </p>
            </div> */}

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{player.firstName}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{player.lastName}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {
                  player.swimGroup.map((swimGroup, key1) => {
                    return (
                      <span key={key1} className="text-meta-5">{swimGroup.name}</span>
                    )
                  })
                }
              </p>
            </div>
            {
              isEditor && (
                <>
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <Link href={`players/edit/${player.id}`} className="px-2 py-1.5 text-sm font-medium text-white transition duration-200 ease-in-out bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      Edytuj
                    </Link>
                  </div>
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <button onClick={(e) => {e.preventDefault()}} onDoubleClick={(e) => {deletePlayer(e, player.id)}} className="px-2 py-1.5 text-sm font-medium text-white transition duration-200 ease-in-out bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Usuń
                    </button>
                  </div>
                </>
              )
            }
          {/* </div> */}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PlayersTable
