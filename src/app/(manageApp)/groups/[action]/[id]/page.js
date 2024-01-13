"use client"

import GroupData from "../../components/GroupData";

const Page = ({params: {action, id}}) => {
    const readOnly = action === "edit" ? false : true;

    return (
        <GroupData id={id} isReadOnly={readOnly} name="Edytuj Grupe"/>
    )
}

export default Page;