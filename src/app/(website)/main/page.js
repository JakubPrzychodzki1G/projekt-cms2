'use client'
import {useState, useEffect} from "react"
import Head from "next/head";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import SectionTitle from "../components/sectionTitle";

import benefitOne from "../components/data";
import Benefits from "../components/benefits";
import Footer from "../components/footer";
import Testimonials from "../components/testimonials";
import Faq from "../components/faq";

const Home = () => {

  const [settingsData, setSettingsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async (options = '') => {
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    // mode: 'no-cors'
    };

    await fetch(`/api/settings`, requestOptions)
    .then((res) => res.json())
    .then((data) => {
        setSettingsData(data)
        setLoading(false)
        setColors(data.find((value) => value.name === 'colors'))
    })    
    .catch(error => console.log('error', error))
  } 

  useEffect(() => {
    fetchSettings();
  }, [])

  const setColors = (colors) => {
    console.log("COLORS")
    console.log(colors?.value?.value?.colorAdditional.value)
    document.documentElement.style.setProperty('--color-secondary', colors?.value?.value?.colorSecondary.value ?? 'black');
    // document.documentElement.style.setProperty('--color-secondary', 'red');

    // document.documentElement.style.setProperty('--color-additional', colors?.value?.value?.colorAdditional ?? 'black');
    document.documentElement.style.setProperty('--color-additional', colors?.value?.value?.colorAdditional.value ?? 'red');

    // document.body.style.backgroundColor= colors?.value?.value?.colorBase ?? 'white'
  }

  const getValue = (key, defaultValue) => {
    const data = settingsData.find((setting) => setting.name === key)
    return data?.value?.value ?? defaultValue
  }

  return (
    <>
      <Head>
        <title>Nextly - Free Nextjs & TailwindCSS Landing Page Template</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar 
          clubLogo={getValue("clubLogo", "https://www.w3schools.com/howto/img_avatar.png")}
          clubName={getValue("clubName", "Klub pływacki")}
      />
      <Hero 
      title={getValue("heroTitle", "Hero title")}
      description = {getValue("heroDescription", "Hero description")}/>
      <SectionTitle
        id = "about"
        pretitle="O nas"
        title={getValue("aboutUsTitlte", "About us title")}>
        {getValue("aboutUsDescription", "About us description")}
      </SectionTitle>
      <Benefits data={benefitOne} />
      <SectionTitle
        id="opinions"
        pretitle="Opinie"
        title="Opinie naszych kursantów">
      </SectionTitle>
      <Testimonials 
        firstOpinion={getValue("opinions")?.[0]?.opinion ?? "opinia"}
        firstOpinionUsername={getValue("opinions")?.[0]?.username ?? "Jan Kowalski"}
        firstOpinionUserTitle={getValue("opinions")?.[0]?.userTitle ?? "Pływak"}
        firstOpinionUserImage={getValue("opinions")?.[0]?.userImage ?? "https://www.w3schools.com/howto/img_avatar.png"}
        
        secondOpinion={getValue("opinions")?.[1]?.opinion ?? "opinia"}
        secondOpinionUsername={getValue("opinions")?.[1]?.username ?? "Jan Kowalski"}
        secondOpinionUserTitle={getValue("opinions")?.[1]?.userTitle ?? "Pływak"}
        secondOpinionUserImage={getValue("opinions")?.[1]?.userImage ?? "https://www.w3schools.com/howto/img_avatar.png"}
        
        thirdOpinion={getValue("opinions")?.[2]?.opinion ?? "opinia"}
        thirdOpinionUsername={getValue("opinions")?.[2]?.username ?? "Jan Kowalski"}
        thirdOpinionUserTitle={getValue("opinions")?.[2]?.userTitle ?? "Pływak"}
        thirdOpinionUserImage={getValue("opinions")?.[2]?.userImage ?? "https://www.w3schools.com/howto/img_avatar.png"}
      />
      <SectionTitle
        id="faq"
        pretitle="FAQ"
        title=" Najczęściej zadawane pytania">
        Sprawdź najczęściej zadawane pytania aby dowiedzieć się więcej o naszym klubie pływackim!
      </SectionTitle>
      <Faq 
      faqData = {getValue("questions")}/>
      <Footer 
      facebookLink= {getValue("facebookLink")}
      instagramLink={getValue("instagramLink")}
      tweeterLink={getValue("tweeterLink")}
      linkedInLink={getValue("linkedInLink")}/>
    </>
  );
}

export default Home;