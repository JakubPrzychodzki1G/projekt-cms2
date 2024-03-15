import Validator from "@/app/(manageApp)/components/Auth/Validator";
import PlayerData from "../../components/PlayerData";
import { redirect } from "next/navigation";

export default function Page ({params: {action, id}}) {
    !["edit", "show"].includes(action) && redirect("/");
    const readOnly = action === "edit" ? false : true;
    return (
        <Validator>
            <PlayerData id={id} isReadOnly={readOnly} name={readOnly ? "Dane Zawodnika" : "Edytuj Zawodnika"}/>
        </Validator>
    )
}