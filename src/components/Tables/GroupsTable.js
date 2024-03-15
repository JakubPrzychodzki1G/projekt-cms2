"use client"

import { useEffect, useState } from "react"
import { useContext } from "react"
import { UserState } from "@/components/simple/clientAuthProvider"
import Link from "next/link"
import GroupsFilter from "@/components/Filters/GroupsFilter"
import AddButton from "@/components/Forms/AddButton"
import { useRouter } from "next/navigation"
import { ItemValidator } from "@/app/(manageApp)/components/Auth/ItemValidator"

const GroupsTable = (props) => {
  const router = useRouter();

  const [groupsData, setGroupsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useContext(UserState);
  const [filterOptions, setFilterOptions] = useState("");

  const fetchGroups = async (options = '') => {
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    // mode: 'no-cors'
    };

    await fetch(`/api/swim_groups?is_deleted=false${options}`, requestOptions)
    .then((res) => res.json())
    .then((data) => {
        setGroupsData(data)
        setLoading(false)
    })
    .catch(error => console.log('error', error));
  } 

  useEffect(() => {
    router.prefetch('/groups/edit/[id]');
    fetchGroups();
  }, [])

  const isEditor = user.roles?.includes("ROLE_USER") || user.roles?.includes("ROLE_ADMIN"); 
  
  const deletePlayer = (e, groupId) => {
    e.preventDefault();
    // console.log(e.target.parentNode.parentNode);
    var myHeaders = new Headers();
    myHeaders.append("accept", "*/*");

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders
    };

    fetch(`/api/swim_groups/${groupId}`, requestOptions)
    .then((res) => {
      if(res.ok) {
        e.target.parentNode.parentNode.remove();
      }
    })
    .catch(error => console.log('error', error));
  }

  const filterGroupsHandler = (options) => {
    // setFilterOptions(options);
    fetchGroups(options);
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Zawodnicy
        </h4>
        {props.isMainPage && 
          <div>
            <AddButton refresh={fetchGroups} component="addGroup"/>
          </div>
        }
      </div>
      <div className="flex flex-col">
        <GroupsFilter filterHandler={filterGroupsHandler}/>
        <div className={`grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 ${isEditor ? 'sm:grid-cols-4' : 'sm:grid-cols-2'}`}>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nazwa grupy
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Trener
            </h5>
          </div>
        </div>

        {groupsData && groupsData.map((group, key) => (
          <Link href={`/groups/show/${group.id}`}
          // <div
            className={`grid grid-cols-4 ${isEditor ? 'sm:grid-cols-4' : 'sm:grid-cols-2'} ${
              key === groupsData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{group.name}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{`${group.coach.name} ${group.coach.lastName}`}</p>
            </div>
            <ItemValidator permission="/groups/edit">
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <button onClick={(e) => {e.preventDefault(); router.push(`groups/edit/${group.id}`)}} className="px-2 py-1.5 text-sm font-medium text-white transition duration-200 ease-in-out bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Edytuj
                </button>
              </div>
            </ItemValidator>
            <ItemValidator permission="deleteGroup">
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <button onClick={(e) => {e.preventDefault()}} onDoubleClick={(e) => {deletePlayer(e, group.id)}} className="px-2 py-1.5 text-sm font-medium text-white transition duration-200 ease-in-out bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Usuń
                </button>
              </div>
            </ItemValidator>
          {/* </div> */}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default GroupsTable
