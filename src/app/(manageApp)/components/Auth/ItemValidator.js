"use client";

import { UserState } from "@/components/simple/clientAuthProvider"
import { useContext } from "react";

const rolesComponentsNamesMap = {
    "ROLE_ADMIN": [
        "/players", // dziala
        "/grades",  // dziala
        "/lessons", // dziala
        "/groups", // dziala
        "/settings", //tego jeszcze nie ma
        "/system", // dziala
        "/players/edit", // dziala
        "deletePlayer", // dziala
        "addPlayer", // dziala
        "/grades/edit", // to nie dziala bo nie ma takiego routa
        "deleteGrade", // dziala
        "addGrade", // dziala
        "gradeBox_edit", // dziala
        "gradeBox_show", // dziala
        "/lessons/edit", // dziala
        "deleteLesson", // dziala
        "addLesson", // dziala
        "deletePlayerlessons", // dziala
        "/groups/edit", // dziala
        "addGroup", // dziala
        "deletePlayergroups", // dziala
        "deleteGroup", // dziala
        "allGrades", // dziala
        "allLessons", // dziala
        "lessonPlayers", // dziala
        // "onlyMyGrades", // dziala
        // "onlyMyLessons",
        // "onlyMyPlayers",
        // "onlyMyGroups",
    ],
    // "ROLE_ADMIN": "admin",
    "ROLE_COACH": [
        "/players", // dziala
        "addPlayer", // dziala
        "/grades",  // dziala
        "/grades/edit", // to nie dziala bo nie ma takiego routa
        "deleteGrade", // dziala
        "addGrade", // dziala
        "gradeBox_edit", // dziala
        "gradeBox_show", // dziala
        "allGrades", // dziala
        "/lessons", // dziala
        "/lessons/edit", // dziala
        "deleteLesson", // dziala
        "addLesson", // dziala
        "deletePlayerlessons", // dziala
        "/groups", // dziala
        "/groups/edit", // dziala
        "deletePlayergroups", // dziala
        "allGrades", // dziala
        "onlyMyLessons", // dziala
        "lessonPlayers", // dziala
    ],
    "ROLE_PLAYER": [
        "/grades",  // dziala
        "/lessons", // dziala
        "gradeBox_show", // dziala
        "onlyMyGrades", // dziala
        "onlyWithMeLessons", // dziala
    ],
    "ROLE_PARENT": [
        "/grades",  // dziala
        "/lessons", // dziala
        "gradeBox_show", // dziala
        "onlyMyGrades", // dziala
        "onlyWithMeLessons", // dziala
    ],
    "ROLE_USER": [
        "/", // dziala
    ]
}

export const getMyPermissions = () => {
    const user = useContext(UserState);
    return rolesComponentsNamesMap[user.roles[0]];
}

export const ItemValidator = (props) => {
    const user = useContext(UserState);

    // console.log(rolesComponentsNamesMap[user.roles[0]], props.permission, rolesComponentsNamesMap[user.roles[0]].includes(props.permission));
    return (
        <>
            { rolesComponentsNamesMap[user.roles[0]].includes(props.permission) ? props.children : <></> }
        </>
    )
}