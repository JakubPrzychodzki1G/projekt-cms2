"use client"
import { useState, useEffect } from "react"

export default function UseAuth() {
    const [isAuth, setIsAuth] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [user, setUser] = useState([]);
    
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/ld+json");
    myHeaders.append("Content-Type", "application/ld+json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    useEffect(() => {
        const fetchMe = async () => {
            await fetch('/api/me', requestOptions)
            .then((res) => {
                setLoading(false)
                if(res.status != 200){
                    setIsAuth(false)
                    return false;
                }
                else{
                    setIsAuth(true);
                    return res.json();
                }
            })
            .then((data) => {
                if(data) setUser(data);
            })
        }
        fetchMe();
    }, [])
    // console.log('re-rovienie');
    // console.log(data);
    // console.log(isLoading);
    if (isLoading) return [null , null];
    
    return [isAuth, user];
    

    // fetch(`/api/me`, requestOptions)
    // .then(response => {
    //     if(response.status != 200){
    //         setAuth(false);
    //     }
    //     else{
    //         setAuth(true);
    //     }
    // })
    // .catch(error => console.log('error', error));
}