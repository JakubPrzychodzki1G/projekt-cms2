"use client"
import { createContext } from "react";
import UseAuth from "@/hooks/useAuth";
import Loader from "../common/Loader";
import { usePathname } from 'next/navigation'

export const AppState = createContext();
export const UserState = createContext();

const ClientAuthProvider = (props) => {
    let user = props.user;
    let auth = props.auth;
    if (!user){
        [auth, user] = UseAuth();
    }

    return (
        <AppState.Provider value={user ? true : false}>
            <UserState.Provider value={user}>
                {auth !== true && usePathname() !== "/auth/signin" ? <Loader /> : props.children}
            </UserState.Provider>
        </AppState.Provider>
    )
}

export default ClientAuthProvider;