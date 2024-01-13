'use client'
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

      <Navbar />
      <Hero 
      title="Dołącz do naszego klubu pływackiego!"
      description = "Nasz klub jest najlepszy na świecie, a w naszej kadrze posiadamy wybitnych pływaków. Dołącz do nich juz dziś!"/>
      <SectionTitle
        id = "about"
        pretitle="O nas"
        title=" Co powinieneś o nas wiedzieć">
        Klub pływacki szczupak został załozony w 2015 roku. To pasja to pływania oraz wody spowodowała, ze trenują u nas same wybitne jednostki.
        Posiadamy kompleksową kadrę trenerską oraz najlepszej jakości sprzęt. 
      </SectionTitle>
      <Benefits data={benefitOne} />
      <SectionTitle
        id="opinions"
        pretitle="Opinie"
        title="Opinie naszych kursantów">
      </SectionTitle>
      <Testimonials />
      <SectionTitle
        id="faq"
        pretitle="FAQ"
        title=" Najczęściej zadawane pytania">
        Sprawdź najczęściej zadawane pytania aby dowiedzieć się więcej o naszym klubie pływackim!
      </SectionTitle>
      <Faq />
      <Footer />
    </>
  );
}

export default Home;