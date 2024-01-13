'use client'
import { createContext, useState, useEffect } from "react";
import UseAuth from "@/hooks/useAuth";

const AppState = createContext();
export const UserState = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, user] = UseAuth();
    // const [ auth1, setAuth1 ] = useState(null);
    // useEffect(() => {
    //     if(!auth){
    //         setAuth1(false);
    //     }else{
    //         setAuth1(true);
    //     }
    // }, [auth])
    // setAuth1(UseAuth());
    console.log(auth);

    return (
        <AppState.Provider value={auth}>
            <UserState.Provider value={user}>
                {children}
            </UserState.Provider>
        </AppState.Provider>
    )
}

export default AppState;