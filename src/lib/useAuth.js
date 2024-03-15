"use server"
import { headers } from "next/headers";

export default async function UseAuth() {

    const headersList = headers();

    var myHeaders = new Headers();
    myHeaders.append("accept", "application/ld+json");
    myHeaders.append("Content-Type", "application/ld+json");
    myHeaders.append("Cookie", headersList.get('Cookie'))
    
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        cache: 'no-store'
    };

    const user = await fetch(process.env.API_URL + '/api/me', requestOptions)
    .then((res) => {
        if(res.status != 200) return false;
        else return res.json();
    })
    .then((data) => {
        return data;
    })
    .catch(error => {
        console.log('error', error);
        return false;
    });
    // if (isLoading) return [null , null];
    return [user ? true : false, user];
}