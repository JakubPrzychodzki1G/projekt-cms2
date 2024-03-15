import Validator from "@/app/(manageApp)/components/Auth/Validator";
import GroupData from "../../components/GroupData";
import { redirect } from "next/navigation";

const Page = ({params: {action, id}}) => {
    ["edit", "show"].includes(action) === false && redirect("/");
    const readOnly = action === "edit" ? false : true;

    return (
        <Validator>
            <GroupData id={id} isReadOnly={readOnly} name="Edytuj Grupe"/>
        </Validator>
    )
}

export default Page;