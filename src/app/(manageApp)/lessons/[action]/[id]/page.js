"use client"

import { useState, useEffect } from "react";
import api from "@/components/Api/ApiActions";
import LessonData from "../../components/lessonData";

const Page = ({params: {action, id}}) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [coachesData, setCoachesData] = useState([]); 

    const fetchLesson = async () => {
        setLoading(true);
        const res = await api.getLesson(id)
        if (res) {
            setData(res);
            setLoading(false);
        }
    }

    const setLessonProperty = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const fetchCoaches = async (options = '') => {
        setLoading(true);
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

    useEffect(() => {
        fetchLesson();
        fetchCoaches();
    }, [])

    const readOnly = action === "edit" ? false : true;

    return (
        <LessonData setLessonProperty={setLessonProperty} refresh={fetchLesson} coachesData={ coachesData } loading={ loading } data={ data } isReadOnly={ readOnly } name={ readOnly ? "Lekcja" : "Edytuj Lekcje" }/>
    )
}

export default Page;