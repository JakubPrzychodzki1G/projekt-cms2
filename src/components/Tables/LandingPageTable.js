"use client"

import { useEffect, useState } from "react"
import { useContext } from "react"
import { UserState } from "@/components/simple/authProvider"
import Link from "next/link"
import GroupsFilter from "@/components/Filters/GroupsFilter"
import AddButton from "@/components/Forms/AddButton"
import { useRouter } from "next/navigation"
import InputTextBox from "../inputs/inputtextbox"


const LandingPageTable = (props) => {
  const router = useRouter();

  const [groupsData, setGroupsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useContext(UserState);

  const fetchGroups = async (options = '') => {
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    // mode: 'no-cors'
    };

    await fetch(`/api/swim_groups?is_deleted=false${options}`, requestOptions)
    .then((res) => res.json())
    .then((data) => {
        setGroupsData(data)
        setLoading(false)
    })
    .catch(error => console.log('error', error));
  } 

  useEffect(() => {
    router.prefetch('/groups/edit/[id]');
    fetchGroups();
  }, [])

  const isAdmin = user?.roles?.includes("ROLE_ADMIN") ?? false; 
  
  const deletePlayer = (e, groupId) => {
    e.preventDefault();
    // console.log(e.target.parentNode.parentNode);
    var myHeaders = new Headers();
    myHeaders.append("accept", "*/*");

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders
    };

    fetch(`/api/swim_groups/${groupId}`, requestOptions)
    .then((res) => {
      if(res.ok) {
        e.target.parentNode.parentNode.remove();
      }
    })
    .catch(error => console.log('error', error));
  }

  const filterGroupsHandler = (options) => {
    // setFilterOptions(options);
    fetchGroups(options);
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between">
        <h3 className="mb-6 text-3xl font-semibold text-black dark:text-white">
          Landing Page Editor
        </h3>
      </div>
      <div className="flex flex-col">
        <h4 className="my-6 text-2xl font-semibold text-black dark:text-white">
          Informacje ogólne
        </h4 >
        <InputTextBox 
            className="" 
            name="clubName" 
            label="Nazwa klubu" 
            />
        <h4 className="my-6 text-2xl font-semibold text-black dark:text-white">
          Sekcja główna
        </h4>
        <InputTextBox 
            className="" 
            name="heroTitle" 
            label="Nagłówek sekcji głownej" 
            />
        <InputTextBox 
            className="" 
            name="heroDescription" 
            label="Opis w sekcji głównej" />
        <h4 className="my-6 text-2xl font-semibold text-black dark:text-white">
          Sekcja o nas
        </h4>
        <InputTextBox 
            className="" 
            name="aboutUsTitlte" 
            label="Nagłówek sekcji o nas" />
        <InputTextBox 
            className="" 
            name="aboutUsDescription" 
            label="Opis sekcji o nas" />
        <h4 className="my-6 text-2xl font-semibold text-black dark:text-white">
          Sekcja z opiniami
        </h4>
        <h6 className="my-3 text-xl font-semibold text-black dark:text-white">
          Pierwsza opinia
        </h6>
        <InputTextBox 
            className="" 
            name="firstOpinion" 
            label="Treść pierwszej opinii" />
        <InputTextBox 
            className="" 
            name="firstOpinionUsername" 
            label="Nazwa autora pierwszej opinii" />
        <InputTextBox 
            className="" 
            name="firstOpinionUserTitle" 
            label="Tytuł autora pierwszej opinii" />
        <h6 className="my-3 text-xl font-semibold text-black dark:text-white">
          Druga opinia
        </h6>
        <InputTextBox 
            className="" 
            name="secondOpinion" 
            label="Treść drugiej opinii" />
        <InputTextBox 
            className="" 
            name="secondOpinionUsername" 
            label="Nazwa autora drugiej opinii" />
        <InputTextBox 
            className="" 
            name="secondOpinionUserTitle" 
            label="Tytuł autora drugiej opinii" />
        <h6 className="my-3 text-xl font-semibold text-black dark:text-white">
          Trzecia opinia
        </h6>
        <InputTextBox 
            className="" 
            name="thirdOpinion" 
            label="Treść trzeciej opinii" />
        <InputTextBox 
            className="" 
            name="thirdOpinionUsername" 
            label="Nazwa autora trzeciej opinii" />
        <InputTextBox 
            className="" 
            name="thirdOpinionUserTitle" 
            label="Tytuł autora trzeciej opinii" />
        <h4 className="my-6 text-2xl font-semibold text-black dark:text-white">
          Sekcja FAQ
        </h4>
        <h6 className="my-3 text-xl font-semibold text-black dark:text-white">
          Pierwsze pytanie
        </h6>
        <InputTextBox 
            className="" 
            name="firstQuestion" 
            label="Pierwsze pytanie" />
        <InputTextBox 
            className="" 
            name="firstAnswer" 
            label="Pierwsza odpowiedź" />
        <h6 className="my-3 text-xl font-semibold text-black dark:text-white">
          Drugie pytanie
        </h6>
        <InputTextBox 
            className="" 
            name="secondQuestion" 
            label="Drugie pytanie" />
        <InputTextBox 
            className="" 
            name="secondAnswer" 
            label="Druga odpowiedź" />
        <h6 className="my-3 text-xl font-semibold text-black dark:text-white">
          Trzecie pytanie
        </h6>
        <InputTextBox 
            className="" 
            name="thirdQuestion" 
            label="Trzecie pytanie" />
        <InputTextBox 
            className="" 
            name="thirdAnswer" 
            label="Trzecia odpowiedź" />
        <h6 className="my-3 text-xl font-semibold text-black dark:text-white">
          Czwarte pytanie
        </h6>
        <InputTextBox 
            className="" 
            name="fourthQuestion" 
            label="Czwarte pytanie" />
        <InputTextBox 
            className="" 
            name="fourthAnswer" 
            label="Czwarta odpowiedź" />
        <h4 className="my-6 text-2xl font-semibold text-black dark:text-white">
          Sekcja z social mediami
        </h4>
        <InputTextBox 
            className="" 
            name="facebookLink" 
            label="Link do Facebooka" />
        <InputTextBox 
            className="" 
            name="instagramLink" 
            label="Link do Instagrama" />
        <InputTextBox 
            className="" 
            name="tweeterLink" 
            label="Link do Tweetera" />
        <InputTextBox 
            className="" 
            name="linkedInLink" 
            label="Link do LinkedIn" />
      </div>
    </div>
  )
}

export default LandingPageTable
