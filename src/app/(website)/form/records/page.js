'use client';
import { AnimatePresence, motion } from "framer-motion";
import BlogDiv from "@/components/not-simple/blogdiv";
import MainForm from "./components/form/mainform";
import BigButton from "@/components/simple/bigbutton";
import { useEffect, useState } from "react";

export default function Main(){
    const [formNumber, setFormNumber] = useState(0);
    const [isHfull, setHfull] = useState(false);
    const motionOptions = {
        animate:{
            opacity: 1,
            display: 'block'
        },
        initial:{
            opacity: 0,
            display: 'none'
        },
        transition:{
            delay: 0.5,
            duration: 0.3,
            ease: "easeOut"
        },
        exit:{
            opacity: 0,
            transition: {duration: 0.3}
        }
    }

    useEffect(() => {
        if(formNumber == 1 || formNumber == 3){
            setTimeout(() => {
                setHfull(true)
            },350)
        }
        else{
            setHfull(false)
        }
    },[formNumber])

    const toggleForm = (whatState) => {
        setFormNumber( prevNumber => whatState == "next" ? prevNumber + 1 : prevNumber - 1)
    }

    return (
            <AnimatePresence>
                {
                formNumber == 0 ? 
                <motion.div
                    key={"infoDiv"}
                    animate={{
                        opacity: 1,
                    }}
                    initial={{
                        opacity: 0.8,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut"
                    }}
                    exit={{
                        opacity: 0,
                        transition: {duration: 0.3}
                    }}
                >
                    <BlogDiv image="https://images.unsplash.com/photo-1560090995-01632a28895b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" breadcrump="Zapisy!">
                        <div>
                            <div>
                                <span className="p-4 font-sm">
                                    Formularz zapisów wypełniają zarówno uczestnicy, którzy pierwszy raz chcą wziąć udział w naszych zajęciach jak również ci, którzy uczęszczali na treningi w poprzednich sezonach.
                                    Wszyscy chętni, którzy wypełnili formularz zostaną podzieleni na grupy w ostatnim tygodniu sierpnia i wtedy trenerzy prześlą SMSem informację o proponowanym terminie zajęć.
                                    Wpłatę pierwszej składki za wrzesień dokonujemy dopiero po przydziale do grupy i otrzymaniu od trenera terminów zajęć.
                                </span>
                            </div>
                            <div className="mt-4">
                                <span className="p-4 font-sm">
                                    <p className="font-semibold text-lg">W celu dokonania zapisu należy:</p>
                                    ◦ zapoznać się z charakterystyką sekcji prowadzonych przez Klub<br/>
                                    ◦ wypełnić formularz zapisów<br/>
                                    ◦ zapoznać się z Regulaminem Klubu<br/>
                                    ◦ zapoznać się z Regulaminem treningów<br/>
                                    ◦ zapoznać się z zasadami wpłat składek członkowskich na stronie Składki.<br/>
                                    ◦ po skompletowaniu grup (w połowie sierpnia) trenerzy poinformują przez SMS-a o terminie pierwszych zajęć <br/>
                                    ◦ wtedy na stronie internetowej klubu będzie możliwość sprawdzenia, do której grupy zostało przydzielony uczestnik ew. skontaktować się telefonicznie lub smsem z trenerem<br/>
                                    ◦ harmonogram treningów znajduje się na stronie Treningi <br/>
                                </span>
                            </div>
                            <div className="mt-4">
                                <span className="p-4 font-sm">
                                    <p className="font-semibold text-lg">Dodatkowe informacje:</p>
                                    ◦ liczba miejsc jest ograniczona <br/>
                                    ◦ liczy się kolejność zgłoszeń i terminowość opłacania składek<br/>
                                    ◦ regularne zajęcia są prowadzone w okresie trwania roku szkolnego <br/>
                                    ◦ od wrzęśnia do czerwca. W okresach Świąt, ferii i wakacji zajęcia nie są prowadzone<br/>
                                    ◦ czas trwania zajęć to 55min, a dla przedszkolaków 45min <br/>
                                    ◦ łącznie z czasem na przebranie<br/>
                                    ◦ zajęcia będą odbywały się w godzinach popołudniowych (po godz. 15:00), a w soboty w godzinach dopołudniowych<br/>
                                    ◦ liczebność grup wynosi od 6 do 10 osób<br/>
                                    ◦ aby dziecko mogło samodzielnie brać udział w zajęciach powinno potrafić wykonywać polecenia prowadzącego<br/>
                                    ◦ w Sekcji Rekreacyjnej nie wymagamy żadnych wstępnych umiejętności pływackich<br/>
                                    ◦ uczestnicy zajęć są ubezpieczeni od następstw nieszczęśliwych wypadków<br/>
                                    ◦ podział na grupy oraz szczegółowy harmonogram dni i godzin zajęć zostanie podany po skompletowaniu grup<br/>
                                    ◦ na pierwszym treningu rodzic wraz z dzieckiem zgłaszają się do instruktora “Poseidona” informując, że są pierwszy raz. Dziecko na tych pierwszych zajęciach będzie już mogło pływać, więc powinno mieć ze sobą niezbędny sprzęt, czyli przede wszystkim strój pływacki, okularki, ew. czepek. Na pierwszych zajęciach rodzic wraz z prowadzącym uzgodnią docelową grupę, do której będzie uczęszczało dziecko<br/>
                                    ◦ rezygnacja z zajęć jest równoważna z rezygnacją z członkostwa w Klubie i wymaga przesłania stosownej informacji na maila klubowego,<br/>
                                    ◦ w razie pytań lub wątpliwości prosimy o kontakt<br/>
                                </span>
                            </div>
                            <div className="flex justify-center w-full" onClick={()=>{setFormNumber(1)}}>
                                <BigButton classes="p-4 md:p-0 md:w-1/2 bg-blue-500 mt-10 mb-8">
                                    <span className="text-white min-[200px]:text-base min-[320px]:text-xl md:text-2xl 2xl:text-3xl">
                                        Formularz Rejestracji
                                    </span>
                                </BigButton>
                            </div>
                        </div>
                    </BlogDiv>
                </motion.div>
                :
                <motion.div
                    className={`${formNumber == 1 || formNumber == 3 ? "md:h-[65vh]" : ""}`}
                    key={"FormDiv"}
                    {...motionOptions}
                >
                    <MainForm toggle={toggleForm} formId={formNumber}/>
                </motion.div>
            }
        </AnimatePresence>
    )
}