import { redirect } from "next/navigation";
import Loader from "@/components/common/Loader";
import UseAuth from "@/lib/useAuth";
import { headers } from "next/headers";

export default async function Validator(params) {
  const [auth, user] = await UseAuth();
  // console.log(user);
  const headersList = headers();
  // headersList.forEach((value, key) => {
  //   console.log(key, value);
  // })
  const activePath = headersList.get('next-url') ? headersList.get('next-url').replace(/\/\d+$/, "") : "/";
  // console.log(activePath);
  const rolesPagesMap = {
    // "ROLE_ADMIN": [
      // "/",
      // "/groups",
      // "/groups/edit",
      // "/groups/show",
      // "/players",
      // "/players/show",
      // "/lessons",
      // "/lessons/show",
      // "/lessons/edit",
      // "/grades",
      // "/grades/show",
      // "/grades/edit",
      // "/system"
    // ],
    "ROLE_ADMIN": "admin",
    "ROLE_COACH": [
      "/",
      "/groups",
      "/groups/edit",
      "/groups/show",
      "/players",
      "/players/show",
      "/lessons",
      "/lessons/show",
      "/lessons/edit",
      "/grades",
      "/grades/show",
      "/grades/edit",
    ],
    "ROLE_PLAYER": [
      "/",
      "/groups/show",
      "/players/show",
      "/lessons",
      "/lessons/show",
      "/grades",
      "/grades/show",
    ],
    "ROLE_PLAYER": [
      "/",
      "/groups/show",
      "/players/show",
      "/lessons",
      "/lessons/show",
      "/grades",
      "/grades/show",
    ],
    "ROLE_USER": [
      "/"
    ]
  }
  // if(!auth) {
    // redirect("/main");
  // }
  // console.log(user.roles[0], rolesPagesMap[user.roles[0]], activePath, rolesPagesMap[user.roles[0]].includes(activePath));
  if(rolesPagesMap[user.roles[0]].includes(activePath) !== true && rolesPagesMap[user.roles[0]] !== "admin"){
    redirect( rolesPagesMap[user.roles[0]][0] ? rolesPagesMap[user.roles[0]][0] : "/main" );
  }

  return (
    <>
      {params.children}
    </>
  )
}