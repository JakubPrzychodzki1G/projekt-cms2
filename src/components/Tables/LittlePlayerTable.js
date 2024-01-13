import { useEffect, useState, useContext } from "react";
import { UserState } from "@/components/simple/authProvider"
import Link from "next/link"

const LittlePlayerTable = (props) => {
    // const [playersData, setPlayersData] = useState([]);
    // const [loading, setLoading] = useState();
    const user = useContext(UserState);

    const isEditor = user.roles?.includes("ROLE_USER") || user.roles?.includes("ROLE_ADMIN");
    return (
    <div className="flex flex-col">
        <div className={`grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 ${!props.isReadOnly && isEditor ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
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
        </div>

        {props.playersData && props.playersData.map((player, key) => (
            <Link href={`/players/show/${player.id}`}
            // <div
                className={`grid grid-cols-2 ${!props.isReadOnly && isEditor ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} ${
                key === props.playersData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
                }`}
                key={key}
            >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{player.firstName}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{player.lastName}</p>
            </div>
            {
              !props.isReadOnly && isEditor && (
                <>
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <button onClick={(e) => {e.preventDefault()}} onDoubleClick={(e) => {props.delete(e, player.id)}} className="px-2 py-1.5 text-sm font-medium text-white transition duration-200 ease-in-out bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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
    )
}

export default LittlePlayerTable