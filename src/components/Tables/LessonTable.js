"use client"

import { useEffect, useState } from "react"
import { useContext } from "react"
import { UserState } from "@/components/simple/clientAuthProvider"
import Link from "next/link"
import LessonsFilter from "@/components/Filters/LessonsFilter"
import AddButton from "@/components/Forms/AddButton"
import api from "@/components/Api/ApiActions";
import dayjs from "dayjs";
import { useRouter } from "next/navigation"
import { ItemValidator } from "@/app/(manageApp)/components/Auth/ItemValidator"

const LessonTable = (props) => {
  const router = useRouter();

  const [lessonsData, setLessonsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useContext(UserState);

  const fetchLessons = async (options = '') => {
    const getOptions = {
        params: {
            isDeleted: false,
            ...options
        }
    };
    const res = await api.getLessons(getOptions)
    if(res) {
        setLessonsData(res);
        setLoading(false);
    }
  } 

  useEffect(() => {
    router.prefetch('/lessons/edit/[id]');
    fetchLessons();
  }, [])

  const isEditor = user.roles?.includes("ROLE_USER") || user.roles?.includes("ROLE_ADMIN"); 
  
  const deleteLesson = async (e, lessonId) => {
    e.preventDefault();

    const res = await api.deleteLesson(lessonId)
    if(res.ok) {
      setLessonsData(lessonsData.filter(lesson => lesson.id !== lessonId));
    }
  }

  const filterGroupsHandler = (options) => {
    fetchLessons(options);
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Zajęcia
        </h4>
        {props.isMainPage && 
          <div>
            <AddButton refresh={fetchLessons} component="addLesson"/>
          </div>
        }
      </div>
      <div className="flex flex-col">
        <LessonsFilter filterHandler={filterGroupsHandler}/>
        <div className={`grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4 ${isEditor ? 'sm:grid-cols-10' : 'sm:grid-cols-8'}`}>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
                Temat Lekcji
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
                Basen
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
                Start Zajęć
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
                Koniec Zajęć
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
                Długość Zajęć
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
                Czy Inwidualne
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
                Trener
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
                Grupa Wiekowa
            </h5>
          </div>
        </div>

        {lessonsData && lessonsData.map((lesson, key) => (
          <Link href={`/lessons/show/${lesson.id}`}
          // <div
            className={`grid grid-cols-8 ${isEditor ? 'sm:grid-cols-10' : 'sm:grid-cols-8'} ${
              key === lessonsData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{lesson.name}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{lesson.pool}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{dayjs(lesson.startDateTime).format('DD/MM/YYYY HH:mm')}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{dayjs(lesson.endDateTime).format('DD/MM/YYYY HH:mm')}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{lesson.duration}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{ lesson.isInvidual ? "Tak" : "Nie" }</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{`${lesson.coach.name} ${lesson.coach.lastName}`}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{lesson.ageGroup}</p>
            </div>
            <ItemValidator permission="/lessons/edit">
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <button onClick={(e) => {e.stopPropagation(); e.preventDefault(); router.push(`lessons/edit/${lesson.id}`)}} className="px-2 py-1.5 text-sm font-medium text-white transition duration-200 ease-in-out bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Edytuj
                </button>
              </div>
            </ItemValidator>
            <ItemValidator permission="deleteLesson">
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <button onClick={(e) => {e.preventDefault()}} onDoubleClick={(e) => {deleteLesson(e, lesson.id)}} className="px-2 py-1.5 text-sm font-medium text-white transition duration-200 ease-in-out bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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

export default LessonTable
