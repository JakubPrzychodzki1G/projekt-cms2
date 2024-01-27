'use client'

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import Image from "next/image"
import api from "@/components/Api/ApiActions"
import { useEffect, useRef, useState } from "react"
import { HexColorPicker } from "react-colorful"
import InputTextBox from "@/components/inputs/inputtextbox"
import _ from "lodash"
import InputTextarea from "@/components/inputs/inputtextarea"

const Settings = (props) => {
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const timeoutUpdate = useRef();

    const fetchSettings = async () => {
        setLoading(true);
        const res = await api.getSettings();
        if(res) {
            setSettings(res)
            setLoading(false);
        }
    }

    const getParticularSetting = (name) => {
        const setting = settings.find(setting => setting.name === name);
        return setting ? setting : null;
    }

    const updateSetting = async (event, name, callback) => {
        const value = event.target.value;
        var result = ""
        var patchValue = null;
        setSettings((prevState) => 
            prevState.map((setting) => {
                const nameArray = name.split('.');
                if(setting.name === nameArray[0]) {
                    nameArray.splice(0, 1);
                    _.set(setting, [...nameArray], value)
                    patchValue = setting;
                }
                return setting;
            })
        )
        callback();
        clearTimeout(timeoutUpdate.current);
        await new Promise((resolve, reject) => {
            timeoutUpdate.current = setTimeout(async () => {
                const res = await api.patchSetting(name.split(".")[0], patchValue);
                if(res) {
                    result = 'success';
                }
                else {
                    result = 'error';
                }
                resolve();
            }, 1000)
        })
        return result;
    }

    useEffect(() => {
        fetchSettings();
    }, [])
    
    return (
        <>
        <div className="mx-auto w-full">
        {
            loading 
            ? 
            <div className="flex justify-center items-center h-screen"><div className="loader"></div></div> 
            : 
            <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-2">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Ustawienia wyglądu
                        </h3>
                    </div>
                    <div className="p-7">
                        <form action="#">
                            <div className="mb-5.5 flex flex-col gap-5.5">
                                <div className="">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="fullName"
                                    >
                                        Kolor Podstawowy
                                    </label>
                                    <div className="flex gap-10">
                                        <HexColorPicker 
                                            color={getParticularSetting('colors').value.value.colorBase.value} 
                                            onChange={(value) => updateSetting({"target": {"value": value}}, 'colors.value.value.colorBase.value', () => {})}
                                        />
                                        <InputTextBox 
                                            value={getParticularSetting('colors').value.value.colorBase.value}
                                            label="Wartość Hex koloru podstawowego"
                                            className="w-full"
                                            inputChange={updateSetting}
                                            name="colors.value.value.colorBase.value"
                                            readOnly={props.isReadOnly}
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="fullName"
                                    >
                                        Kolor Dodatkowy 1
                                    </label>
                                    <div className="flex gap-10">
                                        <HexColorPicker 
                                            color={getParticularSetting('colors').value.value.colorAdditional.value} 
                                            onChange={(value) => updateSetting({"target": {"value": value}}, 'colors.value.value.colorAdditional.value', () => {})}
                                        />
                                        <InputTextBox 
                                            value={getParticularSetting('colors').value.value.colorAdditional.value} 
                                            label="Wartość Hex koloru dodatkowego 1"
                                            className="w-full"
                                            inputChange={updateSetting}
                                            name="colors.value.value.colorAdditional.value"
                                            readOnly={props.isReadOnly}
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="fullName"
                                    >
                                        Kolor Dodatkowy 2
                                    </label>
                                    <div className="flex gap-10">
                                        <HexColorPicker 
                                            color={getParticularSetting('colors').value.value.colorSecondary.value} 
                                            onChange={(value) => updateSetting({"target": {"value": value}}, 'colors.value.value.colorSecondary.value', () => {})}
                                        />
                                        <InputTextBox 
                                            value={getParticularSetting('colors').value.value.colorSecondary.value}
                                            label="Wartość Hex koloru dodatkowego 2"
                                            className="w-full"
                                            inputChange={updateSetting}
                                            name="colors.value.value.colorSecondary.value"
                                            readOnly={props.isReadOnly}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="rounded-sm mt-6 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                        Linki
                        </h3>
                    </div>
                    <div className="p-7">
                        <form action="#">
                            <InputTextBox 
                                value={getParticularSetting('facebookLink').value.value}
                                label="Facebook"
                                className="w-full"
                                inputChange={updateSetting}
                                name="facebookLink.value.value"
                                readOnly={props.isReadOnly}
                            />
                            <InputTextBox 
                                value={getParticularSetting('instagramLink').value.value}
                                label="Instagram"
                                className="w-full"
                                inputChange={updateSetting}
                                name="instagramLink.value.value"
                                readOnly={props.isReadOnly}
                            />
                            <InputTextBox 
                                value={getParticularSetting('tweeterLink').value.value}
                                label="Tweeter"
                                className="w-full"
                                inputChange={updateSetting}
                                name="tweeterLink.value.value"
                                readOnly={props.isReadOnly}
                            />
                            <InputTextBox 
                                value={getParticularSetting('linkedInLink').value.value}
                                label="LinkedIn"
                                className="w-full"
                                inputChange={updateSetting}
                                name="linkedInLink.value.value"
                                readOnly={props.isReadOnly}
                            />
                        </form>
                    </div>
                </div>
                </div>
                <div className="col-span-5 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                            Ustawienia klubu
                            </h3>
                        </div>
                        <div className="p-7">
                            <form action="#">
                                <InputTextBox 
                                    value={getParticularSetting('clubName').value.value}
                                    label="Nazwa Klubu"
                                    className="w-full"
                                    inputChange={updateSetting}
                                    name="clubName.value.value"
                                    readOnly={props.isReadOnly}
                                />
                                <InputTextBox 
                                    value={getParticularSetting('clubLogo').value.value}
                                    label="Logo Klubu"
                                    className="w-full"
                                    inputChange={updateSetting}
                                    name="clubLogo.value.value"
                                    readOnly={props.isReadOnly}
                                />
                                <InputTextBox 
                                    value={getParticularSetting('heroTitle').value.value}
                                    label="Nagłówek w Hero Section"
                                    className="w-full"
                                    inputChange={updateSetting}
                                    name="heroTitle.value.value"
                                    readOnly={props.isReadOnly}
                                />
                                <InputTextBox 
                                    value={getParticularSetting('heroDescription').value.value}
                                    label="Opis w Hero Section"
                                    className="w-full"
                                    inputChange={updateSetting}
                                    name="heroDescription.value.value"
                                    readOnly={props.isReadOnly}
                                />
                                <InputTextarea
                                    value={getParticularSetting('aboutUsTitlte').value.value}
                                    label="O nas"
                                    className="w-full"
                                    inputChange={updateSetting}
                                    name="aboutUsTitlte.value.value"
                                    readOnly={props.isReadOnly}
                                />
                            </form>
                        </div>
                    </div>
                    <div className="mt-8 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                            Opinie, pytania, odpowiedzi o nas
                            </h3>
                        </div>
                        <div className="p-7">
                            <form action="#">
                                {getParticularSetting("opinions").value.value.map((opinion, index) => 
                                    <div className="rounded-sm mb-2 border bg-white dark:border-strokedark dark:bg-boxdark">
                                        <div className="py-4 px-7 dark:border-strokedark">
                                            <h3 className="font-medium text-black dark:text-white">
                                                {`Opinia ${index + 1}`}
                                            </h3>
                                        </div>
                                        <div className="p-7">
                                            <form action="#">
                                                <InputTextBox 
                                                    value={opinion.username}
                                                    label="Imie i nazwisko"
                                                    className="w-full"
                                                    inputChange={updateSetting}
                                                    name={`opinions.value.value.${index}.username`}
                                                    readOnly={props.isReadOnly}
                                                />
                                                <InputTextBox 
                                                    value={opinion.userTitle}
                                                    label="Zawód"
                                                    className="w-full"
                                                    inputChange={updateSetting}
                                                    name={`opinions.value.value.${index}.userTitle`}
                                                    readOnly={props.isReadOnly}
                                                />
                                                <InputTextBox 
                                                    value={opinion.userImage}
                                                    label="Zdjęcie"
                                                    className="w-full"
                                                    inputChange={updateSetting}
                                                    name={`opinions.value.value.${index}.userImage`}
                                                    readOnly={props.isReadOnly}
                                                />
                                                <InputTextBox 
                                                    value={opinion.opinion}
                                                    label="Opinia"
                                                    className="w-full"
                                                    inputChange={updateSetting}
                                                    name={`opinions.value.value.${index}.opinion`}
                                                    readOnly={props.isReadOnly}
                                                />
                                            </form>
                                        </div>
                                    </div>
                                )}
                                {getParticularSetting("questions").value.value.map((question, index) => 
                                    <div className="rounded-sm mb-2 border bg-white dark:border-strokedark dark:bg-boxdark">
                                        <div className="py-4 px-7 dark:border-strokedark">
                                            <h3 className="font-medium text-black dark:text-white">
                                                {`Pytanie ${index + 1}`}
                                            </h3>
                                        </div>
                                        <div className="p-7">
                                            <form action="#">
                                                <InputTextBox 
                                                    value={question.question}
                                                    label="Pytanie"
                                                    className="w-full"
                                                    inputChange={updateSetting}
                                                    name={`questions.value.value.${index}.question`}
                                                    readOnly={props.isReadOnly}
                                                />
                                                <InputTextBox 
                                                    value={question.answer}
                                                    label="Odpowiedź"
                                                    className="w-full"
                                                    inputChange={updateSetting}
                                                    name={`questions.value.value.${index}.answer`}
                                                    readOnly={props.isReadOnly}
                                                />
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        }
        </div>
        </>
    )
}

export default Settings;