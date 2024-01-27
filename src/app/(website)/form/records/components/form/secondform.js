'use client';
import InputTextBox from "@/components/inputs/inputtextbox";
import InputDateBox from "@/components/inputs/inputdatebox";
import InputSelectBox from "@/components/inputs/inputselectbox";
import InputTextarea from "@/components/inputs/inputtextarea";
import { MenuItem } from "@mui/material"

export default function SecondForm(props){
    const apiData = [
        {
            id: 1,
            name: "Artur",
            surname: "Baranowski"
        }
    ]
    const validateEmail = (email) => {
        return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    return (
        <>
            <InputTextBox 
                className="md:col-span-5" 
                name="schoolName" 
                label="Nazwa szkoły / przedszkola" 
                validateFunction={(value) => {return value !== '' && (typeof value === 'string' ? value : '').trim().length > 2}} 
                formIsValid={props.toggleValidity} 
                inputChange={props.changeForm}
                errorText="Prosze wprowadzić poprawną nazwe szkoły, musi ona mieć minimum 3 znaki"
            />
            <InputTextBox 
                className="md:col-span-2 lg:col-span-5 2xl:col-span-2" 
                name="city" 
                label="Miejscowość zamieszkania" 
                validateFunction={(value) => {return value !== '' && (typeof value === 'string' ? value : '').trim().length > 1}} 
                formIsValid={props.toggleValidity} 
                inputChange={props.changeForm}
                errorText="Prosze wprowadzić poprawną nazwe miejscowości"
            />
            <InputTextBox 
                className="md:col-span-2 lg:col-span-5 2xl:col-span-2" 
                name="streetAndNumber" 
                label="Ulica i numer domu" 
                validateFunction={(value) => {return value !== '' && (typeof value === 'string' ? value : '').trim().length >= 3 && (typeof value === 'string' ? value : '').trim().length < 100}} 
                formIsValid={props.toggleValidity} 
                inputChange={props.changeForm}
                errorText="Prosze wprowadzić poprawne dane zamieszkania"
            />
            <InputTextBox 
                className="md:col-span-1 lg:col-span-5 2xl:col-span-1" 
                name="zipCode" 
                label="Kod pocztowy" 
                validateFunction={(value) => {return value !== '' && (typeof value === 'string' ? value : '').trim().length == 6}} 
                formIsValid={props.toggleValidity} 
                inputChange={props.changeForm}
                errorText="Prosze wprowadzić poprawny kod, kod pocztowy musi mieć 6 znaków"
            />
            <span className="md:col-span-5 mt-3 text-lg font-semibold">Pierwszy rodzic / opiekun *</span>
            <hr className="md:col-span-5 bg-blue-500 h-[2px] mr-64" />
            <InputTextBox 
                className="md:col-span-3 lg:col-span-5 2xl:col-span-3" 
                name="parentLastName" 
                label="Nazwisko" 
                validateFunction={(value) => {return value !== '' && (typeof value === 'string' ? value : '').trim().length >= 3 && (typeof value === 'string' ? value : '').trim().length < 80}} 
                formIsValid={props.toggleValidity} 
                inputChange={props.changeForm}
                errorText="Prosze podać poprawne nazwisko"
            />
            <InputTextBox 
                className="md:col-span-2 lg:col-span-5 2xl:col-span-2" 
                name="parentFirstName" 
                label="Imie" 
                validateFunction={(value) => {return value !== '' && (typeof value === 'string' ? value : '').trim().length >= 3 && (typeof value === 'string' ? value : '').trim().length < 50}} 
                formIsValid={props.toggleValidity} 
                inputChange={props.changeForm}
                errorText="Prosze podać poprawne imię"
            />
            <span className="md:col-span-5 mt-3 text-lg font-semibold">Drugi rodzic / opiekun</span>
            <hr className="md:col-span-5 bg-blue-500 h-[2px] mr-52" />
            <InputTextBox 
                className="md:col-span-3 lg:col-span-5 2xl:col-span-3" 
                name="parent2LastName" 
                label="Nazwisko" 
                validateFunction={(value) => {return (typeof value === 'string' ? value : '').trim().length < 80}} 
                inputChange={props.changeForm}
                errorText="Za długie!"
            />
            <InputTextBox 
                className="md:col-span-2 lg:col-span-5 2xl:col-span-2" 
                name="parent2FirstName" 
                label="Imie" 
                validateFunction={(value) => {return (typeof value === 'string' ? value : '').trim().length < 50}} 
                inputChange={props.changeForm}
                errorText="Za długie!"
            />
            <InputTextBox 
                className="md:col-span-5" 
                name="contactEmail" 
                label="Adres email do kontaktu" 
                validateFunction={(value) => {return (typeof value === 'string' ? value : '') !== '' && (typeof value === 'string' ? value : '').trim().length >= 5 && (typeof value === 'string' ? value : '').trim().length < 255 && validateEmail(value)}} 
                formIsValid={props.toggleValidity} 
                inputChange={props.changeForm}
                errorText="Prosze wprowadzić poprawmy adres e-mail"
            />
            <InputTextBox 
                className="md:col-span-5" 
                name="mainNumber" 
                label="Telefon kontaktowy główny" 
                validateFunction={(value) => {return value !== '' && (typeof value === 'string' ? value : '').trim().length == 9}} 
                formIsValid={props.toggleValidity} 
                inputChange={props.changeForm}
                errorText="Prosze wprowadzić poprawny numer telefonu komórkowe składający się z 9 cyfr"
            />
            <InputTextBox 
                className="md:col-span-3 lg:col-span-5 2xl:col-span-3" 
                name="additionalNumber" 
                label="Telefon dodatkowy" 
                validateFunction={(value) => {return value !== '' && (typeof value === 'string' ? value : '').trim().length == 9}} 
                inputChange={props.changeForm}
                errorText="Prosze wprowadzić poprawny numer telefonu komórkowe składający się z 9 cyfr"
            />
            <InputTextBox 
                className="md:col-span-2 lg:col-span-5 2xl:col-span-2" 
                name="playerNumber" 
                label="Telefon kontaktowy zawodnika" 
                validateFunction={(value) => {return value !== '' && (typeof value === 'string' ? value : '').trim().length == 9}} 
                inputChange={props.changeForm}
                errorText="Prosze wprowadzić poprawny numer telefonu komórkowe składający się z 9 cyfr"
            />
            <InputSelectBox 
                className="md:col-span-5" 
                name="skill" 
                label="Wybierz poziom zaawansowania uczestnika zajęć" 
                validateFunction={(value) => {return value !== ''}} 
                formIsValid={props.toggleValidity} 
                inputChange={props.changeForm}
                errorText="Prosze wybrać jedną z opcji"
            >
                <MenuItem value={'1'}>nie unosi się samodzielnie na wodzie bez przyrządów (zajęcia na brodziku)</MenuItem>
                <MenuItem value={'2'}>dobrze unosi się na wodzie bez przyrządów (zajęcia na torze)</MenuItem>
                <MenuItem value={'3'}>potrafi pływać jednym stylem</MenuItem>
                <MenuItem value={'4'}>potrafi pływać więcej niż jednym stylem</MenuItem>
            </InputSelectBox>
            <InputSelectBox 
                className="md:col-span-5" 
                name="coach" 
                label="Dotychczasowy (preferowany) trener" 
                validateFunction={(value) => {return value !== ''}} 
                inputChange={props.changeForm}
                errorText="Prosze wybrać jedną z opcji"
            >
                {
                    apiData.map((x) => {
                        return (
                            <MenuItem key={x.id} value={x.id}>{x.name+" "+x.surname}</MenuItem>
                        )
                    })
                }
            </InputSelectBox>
            <InputTextarea className="md:col-span-5" name="comments" label="Uwagi" validateFunction={(value) => {return value !== ''}} inputChange={props.changeForm}/>
        </>
    )
}