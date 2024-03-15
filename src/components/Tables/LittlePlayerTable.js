import { useEffect, useState, useContext, use } from "react";
import { UserState } from "@/components/simple/clientAuthProvider"
import Link from "next/link"
import InputCheckbox from "../inputs/inputcheckbox";
import InputTextarea from "../inputs/inputtextarea";
import { AnimatePresence, motion } from "framer-motion";
import { ItemValidator } from "@/app/(manageApp)/components/Auth/ItemValidator";

const LittlePlayerTable = (props) => {
    const [playersData, setPlayersData] = useState([]);
    const [loading, setLoading] = useState();
    const [openComnents, setOpenComments] = useState([]);
    const user = useContext(UserState);

    const isEditor = user.roles?.includes("ROLE_USER") || user.roles?.includes("ROLE_ADMIN");
    useEffect(() => {
      setPlayersData((prevState) => {
        const players = props.playersData.map((player) => {
          props.attendances && props.attendances.forEach((attendance) => {
            if (attendance.player === "/api/players/" + player.id) {
              player.attendance = attendance;
            }
          });
          return player;
        });
        return players;
      });
    }, [props.playersData, props.attendances]);
    // useEffect(() => {
    //   console.log("playerzy stad", playersData)
    // }, [playersData])
    return (
    <div className="flex flex-col">
        <div className={`grid rounded-sm bg-gray-2 dark:bg-meta-4 ${!props.isReadOnly && isEditor ? (props.attendances && props.attendances.length > 0 ? 'grid-cols-4 sm:grid-cols-5' : 'grid-cols-2 sm:grid-cols-3') : (props.attendances && props.attendances.length > 0 ? 'grid-cols-4' : 'grid-cols-2')}`}>
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
            {
              props.attendances && props.attendances.length > 0  && (
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Obecność
                  </h5>
                </div>
              )
            }
        </div>

        {playersData && playersData.map((player, key) => (
            <Link href={`/players/show/${player.id}`}
            // <div
                className={`grid ${!props.isReadOnly && isEditor ? (player.attendance ? 'grid-cols-4 sm:grid-cols-5' : 'grid-cols-2 sm:grid-cols-3') : (player.attendance ? 'grid-cols-4' : 'grid-cols-2')} ${
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
              player.attendance && (
                <InputCheckbox
                  className="flex items-center justify-center p-2.5 xl:p-5" 
                  name={"isPresent"}
                  label=""
                  onClick={(e) => {e.stopPropagation()}}
                  checked={player.attendance.isPresent}
                  inputChange={(e, name, callback) => {
                    e.target.id = player.attendance.id
                    return props.attendancesChange(e, name, callback);
                  }}
                />
              )
            }
            {
              !props.isReadOnly && (
                <ItemValidator permission={"deletePlayer"+props.module}>
                  <div className={"hidden items-center justify-center p-2.5 sm:flex xl:p-5 " + player.id}>
                    <button onClick={(e) => {e.preventDefault()}} onDoubleClick={(e) => {props.delete(e, player.id)}} className="px-2 py-1.5 text-sm font-medium text-white transition duration-200 ease-in-out bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Usuń
                    </button>
                  </div>
                </ItemValidator>
              )
            }
            {
              player.attendance && (
                <>
                  <div className="w-full h-full flex items-center justify-center p-2.5 xl:p-5">
                    <button
                      className="w-full h-full flex justify-center"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenComments((prevState) => {
                          return {
                            ...prevState,
                            [key]: !prevState[key],
                          };
                        });
                      }}
                    >
                      <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-6 h-6"
                        animate={{
                          rotate: openComnents[key] ? 180 : 0
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </motion.svg>
                    </button>
                  </div>
                  {
                    openComnents[key] && 
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, transition: { duration: 0.5 }}}
                      >
                        <InputTextarea 
                          name="comments"
                          className={`p-2.5 xl:p-5 ${!props.isReadOnly && isEditor ? "w-[500%]" : "w-[400%]"}`}
                          value={player.attendance.comments}
                          inputChange={(e, name, callback) => {
                            e.target.id = player.attendance.id
                            return props.attendancesChange(e, name, callback);
                          }}
                          label="komentarz"
                          onClick={(e) => {e.preventDefault(); e.stopPropagation()}}
                        />
                      </motion.div>
                    </AnimatePresence>
                  }
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