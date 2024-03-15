
import Lesson from "../../components/lesson";
import Validator from "@/app/(manageApp)/components/Auth/Validator";
import { redirect } from "next/navigation";

const Page = ({params: {action, id}}) => {
    !["edit", "show"].includes(action) && redirect("/");
    return (
        <Validator>
            <Lesson params={{"action": action, "id": id}} />
        </Validator>
    )
}

export default Page;