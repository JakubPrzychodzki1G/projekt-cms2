import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import Validator from "../components/Auth/Validator"

export default function gradesLayout({ children }) {    
    return (
        <Validator>
            <Breadcrumb pageName="Oceny" />
            <div className="flex flex-col gap-10">
                {children}
            </div>
        </ Validator>
    )
}
