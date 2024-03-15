import UseAuth from "@/lib/useAuth";
import ClientAuthProvider from "./clientAuthProvider";
import { redirect } from 'next/navigation'

const AuthProvider = async ({ children }) => {
    const [auth, user] = await UseAuth();

    if (!auth) {
        redirect("/main");
    }

    return (
        <ClientAuthProvider auth={auth} user={user}>
            {children}
        </ClientAuthProvider>
    )
}

export default AuthProvider;