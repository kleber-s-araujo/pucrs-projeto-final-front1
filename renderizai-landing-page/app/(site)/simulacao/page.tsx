"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import SectionHeader from "@/components/Common/SectionHeader";
import React, { useState } from "react";
import areaData from "./areaData";
import { Check } from 'lucide-react';
import lightingOptions from "./iluminacaoData";
import aditionalData from "./aditionalData";
import { useRouter } from 'next/navigation';
import { Requisicao } from "@/types/requisicao";

const Simulacao: React.FC = () => {

    /* Seletor Multi-Step */
    const [step, setStep] = useState(1);
    const [stepTitle, setStepTitle] = useState<string>('Dados do Projeto');
    const totalSteps = 5;

    const handleNext = () => {

        let newStep: number = step;

        if (!checkInputs(step))
            return;


        if (newStep == totalSteps) {
            newStep = step + 1;
            setStep(newStep);
            handleClick();

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            doCalculation();

            return;
        }

        if (step < totalSteps) {
            newStep = step + 1;
            setStep(newStep);
        }
        changeTitle(newStep);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    const handlePrevious = () => {

        let newStep: number = step;

        if (newStep > totalSteps) {
            newStep = step - 1;
            setStep(newStep);
            handleClick();
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            return;
        }

        if (step > 1) {
            newStep = step - 1;
            setStep(newStep);
        }
        changeTitle(newStep);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const changeTitle = (newStep: number) => {

        let newTitle: string;

        switch (newStep) {
            case 1:
                newTitle = 'Dados do Projeto';
                break;
            case 2:
                newTitle = 'Ambientes';
                break;
            case 3:
                newTitle = 'Iluminação';
                break;
            case 4:
                newTitle = 'Pacote de Renderização';
                break;
            default:
                newTitle = 'Serviços Adicionais';
                break;
        }
        setStepTitle(newTitle)
    }

    const [isVisible, setIsVisible] = useState(true);
    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    /* Seção 1: Dados do Projeto */
    const [nome, setNome] = useState<string>('');
    const [radioValue, setRadioValue] = useState<string>('option1');
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(event.target.value);
    };
    const [m2Interior, setM2Interior] = useState<string>('');
    const [m2Edificacao, setM2Edificacao] = useState<string>('');
    const [m2Terreno, setM2Terreno] = useState<string>('');
    const [mensagem, setMensagem] = useState<string>('');


    /* Seção 2: Ambientes */
    const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
    const roomCategories = areaData;
    const handleRoomToggle = (roomId: string) => {
        setSelectedRooms(prev => {
            if (prev.includes(roomId)) {
                return prev.filter(id => id !== roomId);
            }
            return [...prev, roomId];
        });
    };
    const flattenedRooms = roomCategories.reduce((acc, category) => {
        // Add category title as a special object
        acc.push({ isTitle: true, title: category.title });
        // Add rooms
        acc.push(...category.rooms);
        return acc;
    }, [] as Array<any>);


    /* Seção 3: Iluminação */
    const [selectedLighting, setSelectedLighting] = useState<string[]>([]);
    const [otherLighting, setOtherLighting] = useState('');
    const handleLightingToggle = (lightingId: string) => {
        setSelectedLighting(prev => {
            if (prev.includes(lightingId)) {
                return prev.filter(id => id !== lightingId);
            }
            return [...prev, lightingId];
        });
    };

    /* Seção 4: Pacote */
    const [packageValue, setPackage] = useState<string>('standard');

    /* Serviços Adicionais */
    const [imagensAdicionais, setImagensAdicionais] = useState<string>('');
    const [videoAdicional, setVideoAdicional] = useState<string>('');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const flattenedServices = aditionalData.reduce((acc, category) => {
        // Add category title as a special object
        acc.push({ isTitle: true, title: category.title });
        // Add rooms
        acc.push(...category.rooms);
        return acc;
    }, [] as Array<any>);

    const handleServiceToggle = (serviceId: string) => {
        setSelectedServices(prev => {
            if (prev.includes(serviceId)) {
                return prev.filter(id => id !== serviceId);
            }
            return [...prev, serviceId];
        });
    };

    /* Validations */
    const [error1, setError1] = useState<string>('');
    const [error2, setError2] = useState<string>('');
    const [error3, setError3] = useState<string>('');
    const checkInputs = (step: number): boolean => {

        if (step == 1) {
            if (nome == '') {
                setError1("Informar o Nome do Projeto!");
                return false;
            }
            else if ((radioValue == 'option1' && m2Interior == '') || (radioValue == 'option2' && (m2Edificacao == '' || m2Terreno == ''))) {
                setError1("Informar o a metragem quadrada do Projeto!");
                return false;
            }
            else if (mensagem == '') {
                setError1("Detalhe um pouco sobre o seu Projeto!");
                return false;
            }
        }
        else if (step == 2 && selectedRooms.length == 0) {
            setError2("Selecionar ao menos um Ambiente!");
            return false;
        }
        else if (step == 3 && selectedLighting.length == 0) {
            setError3("Selecionar ao menos uma Iluminação!");
            return false;
        }

        setError1('');
        setError2('');
        setError3('');
        return true;
    };

    const doCalculation = () => {
        navigateToDetails();        
    }

    const router = useRouter();    
    const navigateToDetails = () => {

        const params: Requisicao = {
            nome: nome,            
            radioValue: radioValue,
            m2Interior: m2Interior ? parseInt(m2Interior, 10) : 0,
            m2Edificacao: m2Edificacao ? parseInt(m2Edificacao, 10): 0,
            m2Terreno: m2Terreno ? parseInt(m2Terreno,10) : 0,
            mensagem: mensagem,
            selectedRooms: selectedRooms,
            selectedLighting: selectedLighting,
            otherLighting: otherLighting,
            packageValue: packageValue,
            selectedServices: selectedServices,
            imagensAdicionais: imagensAdicionais ? parseInt(imagensAdicionais) : 0,
            videoAdicional: videoAdicional ? parseInt(videoAdicional) : 0,           
        };

        localStorage.setItem('navigationData', JSON.stringify(params));
        router.push(`/simulacao/resultado`);

    };

    return (

        <>
            <section id="simulation" className={`pt-25 lg:pt-25 xl:pt-30 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100 z-[99]' : 'opacity-0 z-[1]'}`}>

                <div className="w-full mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0 mt-10">
                    <SectionHeader
                        headerInfo={{
                            title: "Quanto Custa?",
                            subtitle: "Quanto Custa?",
                            description: `Faça uma simulação para obter uma prévia do custo do seu projeto. `,
                        }}
                    />

                    <Card className="mt-10 w-full mx-auto rounded-lg bg-card text-card-foreground">
                        <CardHeader className="flex flex-col space-y-1.5 p-6 w-full">
                            <CardTitle>{stepTitle}</CardTitle>
                            <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${(step / totalSteps) * 100}%` }}
                                />
                            </div>
                            <div className="text-sm text-gray-500 mt-2">
                                Passo {step} de {totalSteps}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6">

                                { /*  Dados do Projeto  */}
                                {step === 1 && (
                                    <div className="space-y-3">
                                        <div className="mt-4 mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                                            <div className="flex w-full items-left flex-col">
                                                <span className="pb-2 w-50"><b>Nome do Projeto:</b></span>
                                                <input
                                                    id="nome"
                                                    type="text"
                                                    name="nome"
                                                    required
                                                    value={nome}
                                                    onChange={(e) => setNome(e.target.value)}
                                                    placeholder="Sala de Estar"
                                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-10 mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                                            <div className="flex">
                                                <span className="flex items-center me-4"><b>Tipo de Projeto:</b></span>
                                                <div className="flex items-center me-4">
                                                    <input id="inline-checked-radio" type="radio" value="option1" checked={radioValue === 'option1'} onChange={handleRadioChange} name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Interiores</label>
                                                </div>

                                                <div className="flex items-center me-4">
                                                    <input id="inline-radio" type="radio" value="option2" name="inline-radio-group" checked={radioValue === 'option2'} onChange={handleRadioChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Arquitetônico</label>
                                                </div>
                                            </div>
                                        </div>

                                        {radioValue === 'option1' && (
                                            <div className="mt-10 mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                                                <div className="flex">
                                                    <span className="flex items-center me-4">M²: </span>
                                                    <input
                                                        id="m2Interior"
                                                        name="m2Interior"
                                                        type="number"
                                                        required
                                                        value={m2Interior}
                                                        onChange={(e) => setM2Interior(e.target.value)}
                                                        placeholder="Ex.: 66"
                                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {radioValue === 'option2' && (
                                            <div className="mt-10 mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:gap-8">
                                                <div className="flex">
                                                    <span className="w-50 flex items-center me-4">M² Edificação:</span>
                                                    <input
                                                        id="m2Edificacao"
                                                        name="m2Edificacao"
                                                        type="number"
                                                        required
                                                        value={m2Edificacao}
                                                        onChange={(e) => setM2Edificacao(e.target.value)}
                                                        placeholder="Ex.: 66"
                                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>
                                                <div className="flex">
                                                    <span className="w-50 flex items-center me-4">M² do Terreno:</span>
                                                    <input
                                                        id="m2Terreno"
                                                        name="m2Terreno"
                                                        type="number"
                                                        required
                                                        value={m2Terreno}
                                                        onChange={(e) => setM2Terreno(e.target.value)}
                                                        placeholder="Ex.: 66"
                                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-10 pt-4 mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                                            <div className="flex w-full items-left flex-col me-4">
                                                <span className="w-50 items-left"><b>Detalhes do Projeto:</b></span>
                                                <textarea
                                                    id="mensagem"
                                                    placeholder="Nos conte um pouco sobre seu projeto e o resultado esperado..."
                                                    rows={4}
                                                    name="mensagem"
                                                    required
                                                    value={mensagem}
                                                    onChange={(e) => setMensagem(e.target.value)}
                                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                ></textarea>
                                            </div>
                                        </div>

                                        {error1 !== '' &&

                                            <div className="flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-4 py-4 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30">
                                                <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
                                                    <svg
                                                        width="13"
                                                        height="13"
                                                        viewBox="0 0 13 13"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
                                                            fill="#ffffff"
                                                            stroke="#ffffff"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <div className="w-full">
                                                    <h5 className="mt-1 font-semibold text-[#B45454]">
                                                        {error1}
                                                    </h5>
                                                </div>
                                            </div>
                                        }

                                    </div>
                                )}

                                { /*  Ambientes  */}
                                {step === 2 && (

                                    <div className="space-y-3">
                                        <Card className="w-full mx-auto">
                                            <CardContent>
                                                <div className="grid grid-cols-6 gap-4">
                                                    {flattenedRooms.map((item, index) => {
                                                        if (item.isTitle) {
                                                            return (
                                                                <div key={item.title} className="col-span-6">
                                                                    <h3 className="font-semibold text-lg border-b pb-2 mt-4 first:mt-0">
                                                                        {item.title}
                                                                    </h3>
                                                                </div>
                                                            );
                                                        }

                                                        const isSelected = selectedRooms.includes(item.id);
                                                        return (
                                                            <div
                                                                key={item.id}
                                                                onClick={() => handleRoomToggle(item.id)}
                                                                className={`relative p-3 rounded-lg border-2 cursor-pointer
                                                                transition-all duration-300 transform hover:scale-105
                                                                ${isSelected ?
                                                                        'border-primary bg-primary bg-opacity-5 text-primaryho' :
                                                                        'border-gray-200 hover:border-primary hover:border-opacity-40'
                                                                    }
                                                            `} >
                                                                <div className="flex items-center space-x-2">
                                                                    <div className={`
                                                                    flex items-center justify-center w-5 h-5 rounded-md
                                                                    transition-colors duration-300
                                                                    ${isSelected ? 'bg-primary' : 'bg-gray-100'}
                                                                `}>
                                                                        {isSelected ? (
                                                                            <Check className="w-3 h-3 text-white" />
                                                                        ) : null}
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <span className="text-lg mr-1">{item.icon}</span>
                                                                        <span className="text-xs font-medium leading-tight">
                                                                            {item.label}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <div className="mt-8 p-4 bg-primary bg-opacity-20 rounded-lg">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium text-primary">
                                                            Ambientes selecionados
                                                        </p>
                                                        <span className="px-3 py-1 bg-primary text-white rounded-full text-sm font-bold">
                                                            {selectedRooms.length}
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {error2 !== '' &&

                                            <div className="flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-4 py-4 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30">
                                                <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
                                                    <svg
                                                        width="13"
                                                        height="13"
                                                        viewBox="0 0 13 13"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
                                                            fill="#ffffff"
                                                            stroke="#ffffff"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <div className="w-full">
                                                    <h5 className="mt-1 font-semibold text-[#B45454]">
                                                        {error2}
                                                    </h5>
                                                </div>
                                            </div>

                                        }

                                    </div>
                                )}

                                { /*  Iluminação  */}
                                {step === 3 && (
                                    <div className="space-y-3">

                                        <Card className="w-full mx-auto">
                                            <CardContent>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                    {lightingOptions.map((option) => {
                                                        const isSelected = selectedLighting.includes(option.id);
                                                        return (
                                                            <div
                                                                key={option.id}
                                                                onClick={() => handleLightingToggle(option.id)}
                                                                className={`
                                                                relative p-4 rounded-lg border-2 cursor-pointer
                                                                transition-all duration-300 transform hover:scale-105
                                                                ${isSelected ?
                                                                        'border-primary bg-primary bg-opacity-5' :
                                                                        'border-gray-200 hover:border-blue-200'
                                                                    }
                                                            `}>

                                                                <div className="flex items-center space-x-2">
                                                                    <div className={`
                                                                    flex items-center justify-center w-5 h-5 rounded-md
                                                                    transition-colors duration-300
                                                                    ${isSelected ? 'bg-primary' : 'bg-gray-100'}
                                                                `}>
                                                                        {isSelected ? (
                                                                            <Check className="w-3 h-3 text-white" />
                                                                        ) : null}
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <span className="text-lg mr-1">{option.icon}</span>
                                                                        <span className="text-xs font-medium leading-tight">
                                                                            {option.label}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {/* Outro tipo de Iluminação */}
                                                <div className="mt-4">
                                                    <div className={`
                                                        p-4 rounded-lg border-2 
                                                        ${selectedLighting.includes('other') ?
                                                            'border-primary bg-primary bg-opacity-5' :
                                                            'border-gray-200'
                                                        }
                                                    `}>
                                                        <div className="flex items-center space-x-3 cursor-pointer"
                                                            onClick={() => handleLightingToggle('other')}>
                                                            <div className={`
                                                                flex items-center justify-center w-5 h-5 rounded-md
                                                                transition-colors duration-300
                                                                ${selectedLighting.includes('other') ? 'bg-primary' : 'bg-gray-100'}
                                                            `}>
                                                                {selectedLighting.includes('other') ? (
                                                                    <Check className="w-3 h-3 text-white" />
                                                                ) : null}
                                                            </div>
                                                            <span className="text-lg mr-2">✨</span>
                                                            <span className="text-sm font-medium">Outro</span>
                                                        </div>
                                                        {selectedLighting.includes('other') && (
                                                            <div className="mt-2 pl-8">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Descreva outro tipo de iluminação"
                                                                    value={otherLighting}
                                                                    onChange={(e) => setOtherLighting(e.target.value)}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="w-full text-sm p-2 rounded-lg"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="mt-8 p-4 bg-primary bg-opacity-20 rounded-lg">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium text-primary">
                                                            Tipos de iluminação selecionados
                                                        </p>
                                                        <span className="px-3 py-1 bg-primary text-white rounded-full text-sm font-bold">
                                                            {selectedLighting.length}
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {error3 !== '' &&

                                            <div className="flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-4 py-4 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30">
                                                <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
                                                    <svg
                                                        width="13"
                                                        height="13"
                                                        viewBox="0 0 13 13"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
                                                            fill="#ffffff"
                                                            stroke="#ffffff"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <div className="w-full">
                                                    <h5 className="mt-1 font-semibold text-[#B45454]">
                                                        {error3}
                                                    </h5>
                                                </div>
                                            </div>

                                        }

                                    </div>
                                )}


                                { /*  Pacote  */}
                                {step === 4 && (

                                    <div>

                                        <div className="flex justify-center gap-8 p-8">

                                            <div onClick={(e) => setPackage('basic')}
                                                className={`shadow-md rounded-lg p-6 m-4 w-full max-w-sm border-2 cursor-pointer
                                                        transition-all duration-300 transform hover:scale-110
                                                        ${packageValue === 'basic' ? 'scale-110 text-primaryho bg-primary bg-opacity-5 border-primary' : 'bg-white'}`}>
                                                <h2 className="m-3 text-xl font-bold text-center mb-4">Basico</h2>
                                                <ul className="mt-6 list-none p-0 mb-2">
                                                    <li key={1} className="p-2 rounded-md text-gray-700">• 3 Imagens</li>
                                                    <li key={2} className="p-2 rounded-md text-gray-700">• Qualidade Standard</li>
                                                    <li key={2} className="p-2 rounded-md text-gray-700">• Apenas 1 Ambiente</li>
                                                    <li key={2} className="p-2 rounded-md text-gray-700">• Até 2 tipos de Iluminação</li>
                                                </ul>
                                            </div>

                                            <div onClick={(e) => setPackage('standard')}
                                                className={`shadow-md rounded-lg p-6 m-4 w-full max-w-sm border-2 cursor-pointer
                                                        transition-all duration-300 transform hover:scale-110
                                                        ${packageValue === 'standard' ? 'scale-110 text-primaryho bg-primary bg-opacity-5 border-primary' : 'bg-white'}`}>
                                                <h2 className="m-3 text-xl font-bold text-center mb-4">Padrão</h2>
                                                <ul className="mt-6 list-none p-0 mb-2">
                                                    <li key={1} className="p-2 rounded-md text-gray-700">• 5 Imagens</li>
                                                    <li key={2} className="p-2 rounded-md text-gray-700">• Qualidade Standard</li>
                                                    <li key={2} className="p-2 rounded-md text-gray-700">• Até 2 Ambientes</li>
                                                    <li key={2} className="p-2 rounded-md text-gray-700">• Até 3 tipos de Iluminação</li>
                                                </ul>
                                            </div>

                                            <div onClick={(e) => setPackage('premium')}
                                                className={`shadow-md rounded-lg p-6 m-4 w-full max-w-sm border-2 cursor-pointer
                                                        transition-all duration-300 transform hover:scale-110
                                                        ${packageValue === 'premium' ? 'scale-110 text-primaryho bg-primary bg-opacity-5 border-primary' : 'bg-white'}`}>
                                                <h2 className="m-3 text-xl font-bold text-center mb-4">Premium</h2>
                                                <ul className="mt-6 list-none p-0 mb-2">
                                                    <li key={1} className="p-2 rounded-md text-gray-700">• 10 Imagens</li>
                                                    <li key={2} className="p-2 rounded-md text-gray-700">• Qualidade Superior do Render</li>
                                                    <li key={2} className="p-2 rounded-md text-gray-700">• Até 4 Ambientes</li>
                                                    <li key={2} className="p-2 rounded-md text-gray-700">• Até 5 tipos de Iluminação</li>
                                                </ul>
                                            </div>

                                        </div>

                                    </div>

                                )}

                                { /*  Serviços Adicionais  */}
                                {step === 5 && (

                                    <div className="space-y-3">
                                        <Card className="w-full mx-auto">
                                            <CardContent>
                                                <div className="grid grid-cols-4 gap-4">

                                                    <div className="col-span-4">
                                                        <span>
                                                            Algumas ações fazem parte do nosso workflow e já estarão inclusas em nossos serviços.
                                                            Além delas, você pode escolher alguns serviços que gostaria que fosse adicionado à sua renderização:
                                                        </span>
                                                    </div>

                                                    {flattenedServices.map((item, index) => {

                                                        if (item.isTitle) {
                                                            return (
                                                                <div key={item.title} className="col-span-4">
                                                                    <h3 className="font-semibold text-lg border-b pb-2 mt-4 first:mt-0">

                                                                    </h3>
                                                                </div>
                                                            );
                                                        }

                                                        const isSelected = selectedServices.includes(item.id) || item.type == 'fixed';
                                                        if (!item.isTitle)
                                                            return (
                                                                <div
                                                                    key={item.id}
                                                                    onClick={() => {
                                                                        if (item.type !== 'fixed')
                                                                            handleServiceToggle(item.id)
                                                                    }}
                                                                    className={`relative p-3 rounded-lg border-2 cursor-pointer
                                                                    transition-all duration-300 transform hover:scale-105
                                                                    ${isSelected ?
                                                                            'border-primary bg-primary bg-opacity-5 text-primaryho' :
                                                                            'border-gray-200 hover:border-primary hover:border-opacity-40'
                                                                        }
                                                                    ${item.type == '' || item.type == 'adt' ? 'col-span-2' : ''
                                                                        }
                                                                `} >
                                                                    <div className="flex items-center space-x-2">
                                                                        <div className={`
                                                                        flex items-center justify-center w-5 h-5 rounded-md
                                                                        transition-colors duration-300
                                                                        ${isSelected ? 'bg-primary' : 'bg-gray-100'}
                                                                    `}>
                                                                            {isSelected ? (
                                                                                <Check className="w-4 h-4 text-white" />
                                                                            ) : null}
                                                                        </div>
                                                                        <div className="flex items-center">
                                                                            <span className="text-lg mr-2">{item.icon}</span>
                                                                            <span className="text-xs font-medium leading-tight">
                                                                                {item.label}
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                    {selectedServices.includes('img') && item.id == 'img' && (
                                                                        <div className="mt-2 pl-8">
                                                                            <input
                                                                                type="number"
                                                                                placeholder="Quantidade de Imagens Adicionais..."
                                                                                value={imagensAdicionais}
                                                                                onChange={(e) => setImagensAdicionais(e.target.value)}
                                                                                onClick={(e) => e.stopPropagation()}
                                                                                className="w-full text-sm p-2 rounded-lg"
                                                                            />
                                                                        </div>
                                                                    )}

                                                                    {selectedServices.includes('vid') && item.id == 'vid' && (
                                                                        <div className="mt-2 pl-8">
                                                                            <input
                                                                                type="number"
                                                                                placeholder="Tempo em Minutos..."
                                                                                value={videoAdicional}
                                                                                onChange={(e) => setVideoAdicional(e.target.value)}
                                                                                onClick={(e) => e.stopPropagation()}
                                                                                className="w-full text-sm p-2 rounded-lg"
                                                                            />
                                                                        </div>
                                                                    )}

                                                                </div>
                                                            );
                                                    })}
                                                </div>

                                                <div className="mt-8 p-4 bg-primary bg-opacity-20 rounded-lg">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium text-primary">
                                                            Serviços Adicionais
                                                        </p>
                                                        <span className="px-3 py-1 bg-primary text-white rounded-full text-sm font-bold">
                                                            {selectedServices.length}
                                                        </span>
                                                    </div>
                                                </div>

                                            </CardContent>
                                        </Card>

                                    </div>

                                )}

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section id="control" className={`pb-25 z-9999 lg:pb-25 xl:pb-30 px-16 `}>

                <div className="w-full mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">

                    <div className={`flex justify-between pt-4 mx-10 `}>

                        <button
                            type="button"
                            onClick={handlePrevious}
                            className="inline-flex h-10 items-center gap-2 rounded-full bg-white border font-medium hover:bg-gray-100 gap-1 px-6 border-gray"
                            disabled={step === 1}
                        >
                            <svg className="fill-black" width="16" height="12" viewBox="06 05 05 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="" d="M6.3508 12.7499L11.2096 17.4615L10.1654 18.5383L3.42264 11.9999L10.1654 5.46148L11.2096 6.53833L6.3508 11.2499L21 11.2499L21 12.7499L6.3508 12.7499Z" />
                            </svg>
                            Anterior
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            className="inline-flex gap-2 h-10 items-center rounded-full bg-black px-6 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark"
                        >
                            {step === totalSteps ? 'Calcular' : 'Próximo'}
                            <svg
                                className="fill-white"
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                                    fill=""
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

        </>
    )
};

export default Simulacao;