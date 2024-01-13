import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import Validator from "../components/Auth/Validator"

export default function GroupsLayout({ children }) {    
    return (
        <Validator>
            <Breadcrumb pageName="Tables" />
            <div className="flex flex-col gap-10">
                {children}
            </div>
        </ Validator>
    )
}