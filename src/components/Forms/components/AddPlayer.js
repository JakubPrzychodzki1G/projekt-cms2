"use client"

import { useEffect } from "react";
import api from "@/components/Api/ApiActions";

const AddPlayer = (props) => {
    useEffect(() => {
        props.checkFunc((count) => {
            return count === 2;
        })
        props.endpointFunc(async (formData) => {
            await api.postGroup(formData)
            .then((res) => {
                props.refresh();
            })
        })
    }, [])

    return (
        <form className="w-full h-full flex flex-col items-center">
            <div>
                <button disabled={!props.formIsValid} className="p-4 bg-blue-500 text-white font-bold rounded-xl mb-6" onClick={props.addEntity}>
                    Dodaj Zawodnika
                </button>
            </div>
        </form>
    )
}

export default AddPlayer