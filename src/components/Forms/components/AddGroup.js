"use client"

import GroupInputs from "@/app/(manageApp)/groups/components/GroupInputs"
import { useEffect } from "react";
import api from "@/components/Api/ApiActions";

const AddGroup = (props) => {
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
            <GroupInputs toggleValidity={props.changeCountFormValid} inputChangeHandler={props.inputChangeHandler} specialNames={['name', 'coach']} width="w-3/4"/>
            <div>
                <button disabled={!props.formIsValid} className="p-4 bg-blue-500 text-white font-bold rounded-xl mb-6" onClick={props.addEntity}>
                    Dodaj Grupe
                </button>
            </div>
        </form>
    )
}

export default AddGroup