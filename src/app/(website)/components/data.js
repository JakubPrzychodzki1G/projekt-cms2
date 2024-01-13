import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../../../../public/img/swimmingpool.png";

const benefitOne = {
  title: "Korzyści z pływania",
  desc: "Zobacz jakie korzyści są z regularnego pływania.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Polepsz swoje samopoczucie",
      desc: "Podczas pływania wytwarzanie są endorfiny, które poprawią twój humor.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Zwiększ kondycję!",
      desc: "Regularne pływanie zwiększa twoją kondycję oraz rozbudowuje twoje ciało.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Stawaj się lepszym",
      desc: "Aktywność fizyczna nie rozwija cię jedynie fizycznie ale równiez mentalnie!",
      icon: <TrophyIcon />,
    },
  ],
};


export default benefitOne;
