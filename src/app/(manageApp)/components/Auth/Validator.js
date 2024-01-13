'use client'
import { redirect } from "next/navigation";
import { useEffect, useContext } from "react";
import AppState from "@/components/simple/authProvider";
import Loader from "@/components/common/Loader";

export default function Validator({ children }) {
  const auth = useContext(AppState);

  useEffect(() => {
    if(auth === false){
      console.log("redirecting to /main");
      redirect("/main");
    }
    else{
      console.log("auth ok");
    }
  }, [auth])

  return (
    <>
      {auth != true ? <Loader /> : children}
    </>
  )
}