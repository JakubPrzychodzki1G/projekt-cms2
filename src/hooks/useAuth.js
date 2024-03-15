"use client"
import { useState, useEffect } from "react"

export default function UseAuth() {
    const [isLoading, setLoading] = useState(true)
    const [user, setUser] = useState([]);

    var myHeaders = new Headers();
    myHeaders.append("accept", "application/ld+json");
    myHeaders.append("Content-Type", "application/ld+json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        cache: 'no-store'
    };

    useEffect(() => {
        const fetchMe = async () => {
            await fetch('/api/me', requestOptions)
            .then((res) => {
                setLoading(false)
                if(res.status != 200){
                    return false;
                }
                else{
                    return res.json();
                }
            })
            .then((data) => {
                setUser(data);
            })
        }
        fetchMe();
    }, [])

    if (isLoading) return [null , null];
    return [user ? true : false, user];
}