"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import SectionHeader from "@/components/Common/SectionHeader";
import React, { useState } from "react";
import areaData from "./areaData";
import { Check } from 'lucide-react';
import lightingOptions from "./iluminacaoData";
import aditionalData from "./aditionalData";

const Simulacao: React.FC = () => {

    /* Seletor Multi-Step */
    const [step, setStep] = useState(1);
    const [stepTitle, setStepTitle] = useState<string>('Dados do Projeto');
    const totalSteps = 5;
    const handleNext = () => {
        let newStep: number = step;
        if (step < totalSteps) {
            newStep = step + 1;
            setStep(newStep);
        }
        changeTitle(newStep);
    };
    const handlePrevious = () => {
        let newStep: number = step;
        if (step > 1) {
            newStep = step - 1;
            setStep(newStep);
        }
        changeTitle(newStep);
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

    /* Seção 1: Dados do Projeto */
    const [radioValue, setRadioValue] = useState<string>('option1');
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(event.target.value);
    };


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
    const [packageValue, setPackage] = useState<string>('basic');
    const [imagensAdicionais, setImagensAdicionais] = useState<string>('0');
    const [hasImagensAdicionais, setHasImagensAdicionais] = useState<boolean>(false);
    const [videoAdicional, setVideoAdicional] = useState<string>('0');
    const [hasVideoAdicional, setHasVideoAdicional] = useState<boolean>(false);
    const [render360, setRender360] = useState<boolean>(false);

    /* Serviços Adicionais */
    const flattenedServices = aditionalData.reduce((acc, category) => {
        // Add category title as a special object
        acc.push({ isTitle: true, title: category.title });
        // Add rooms
        acc.push(...category.rooms);
        return acc;
    }, [] as Array<any>);
    console.log(flattenedServices);

    return (
        <section id="simulation" className="py-25 lg:py-25 xl:py-30">
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

                            { /*  Dados do Projeto  */ }
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
                                                    id="m2Interior"
                                                    name="m2Interior"
                                                    type="number"
                                                    required
                                                    placeholder="Ex.: 66"
                                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                            </div>
                                            <div className="flex">
                                                <span className="w-50 flex items-center me-4">M² do Terreno:</span>
                                                <input
                                                    id="m2Interior"
                                                    name="m2Interior"
                                                    type="number"
                                                    required
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
                                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            )}

                            { /*  Ambientes  */ }
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
                                </div>
                            )}

                            { /*  Iluminação  */ }
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

                                </div>
                            )}


                            { /*  Pacote  */ }
                            {step === 4 && (

                                <div>

                                    <div className="flex justify-center gap-8 p-8">

                                        <div onClick={(e) => setPackage('basic')}
                                            className={`shadow-md rounded-lg p-6 m-4 w-full max-w-sm border-2 cursor-pointer
                                                        transition-all duration-300 transform hover:scale-105
                                                        ${packageValue === 'basic' ? 'text-primaryho bg-primary bg-opacity-5 border-primary' : 'bg-white'}`}>
                                            <h2 className="m-3 text-xl font-bold text-center mb-4">Basico</h2>
                                            <ul className="mt-6 list-none p-0 mb-2">
                                                <li key={1} className="p-2 rounded-md text-gray-700">• Máx. 3 Imagens</li>
                                                <li key={2} className="p-2 rounded-md text-gray-700">• Qualidade Standard</li>
                                                <li key={2} className="p-2 rounded-md text-gray-700">• Apenas 1 Ambiente</li>
                                            </ul>
                                        </div>

                                        <div onClick={(e) => setPackage('standard')}
                                            className={`shadow-md rounded-lg p-6 m-4 w-full max-w-sm border-2 cursor-pointer
                                                        transition-all duration-300 transform hover:scale-105
                                                        ${packageValue === 'standard' ? 'text-primaryho bg-primary bg-opacity-5 border-primary' : 'bg-white'}`}>
                                            <h2 className="m-3 text-xl font-bold text-center mb-4">Padrão</h2>
                                            <ul className="mt-6 list-none p-0 mb-2">
                                                <li key={1} className="p-2 rounded-md text-gray-700">• Máx. 5 Imagens</li>
                                                <li key={2} className="p-2 rounded-md text-gray-700">• Qualidade Standard</li>
                                                <li key={2} className="mb-2 p-2 rounded-md text-gray-700">• Até 2 Ambientes</li>
                                            </ul>
                                        </div>

                                        <div onClick={(e) => setPackage('premium')}
                                            className={`shadow-md rounded-lg p-6 m-4 w-full max-w-sm border-2 cursor-pointer
                                                        transition-all duration-300 transform hover:scale-105
                                                        ${packageValue === 'premium' ? 'text-primaryho bg-primary bg-opacity-5 border-primary' : 'bg-white'}`}>
                                            <h2 className="m-3 text-xl font-bold text-center mb-4">Premium</h2>
                                            <ul className="mt-6 list-none p-0 mb-2">
                                                <li key={1} className="p-2 rounded-md text-gray-700">• Máx. 10 Imagens</li>
                                                <li key={2} className="p-2 rounded-md text-gray-700">• Qualidade Superior do Render</li>
                                                <li key={2} className="p-2 rounded-md text-gray-700">• Até 3 Ambientes</li>
                                            </ul>
                                        </div>

                                    </div>

                                    <div className="p-10">

                                        <div className={`
                                                p-4 rounded-lg border-2 
                                                ${ render360 ?
                                                'border-primary bg-primary bg-opacity-5' :
                                                'border-gray'
                                            }
                                            `}>
                                            <div className="flex items-center space-x-3 cursor-pointer"
                                                onClick={() => setRender360(!render360) }>
                                                <div className={`
                                                        flex items-center justify-center w-5 h-5 rounded-md
                                                        transition-colors duration-300
                                                        ${ render360 ? 'bg-primary' : 'bg-gray-100'}
                                                    `}>
                                                    { render360 ? (
                                                        <Check className="w-3 h-3 text-white" />
                                                    ) : null}
                                                </div>                                                
                                                <span className="text-sm font-medium">Render em 360°</span>
                                            </div>

                                        </div>

                                        <div className={`
                                                mt-6 p-4 rounded-lg border-2 
                                                ${ hasImagensAdicionais ?
                                                'border-primary bg-primary bg-opacity-5' :
                                                'border-gray'
                                            }
                                            `}>
                                            <div className="flex items-center space-x-3 cursor-pointer"
                                                onClick={() => setHasImagensAdicionais(!hasImagensAdicionais) }>
                                                <div className={`
                                                        flex items-center justify-center w-5 h-5 rounded-md
                                                        transition-colors duration-300
                                                        ${ hasImagensAdicionais ? 'bg-primary' : 'bg-gray-100'}
                                                    `}>
                                                    { hasImagensAdicionais ? (
                                                        <Check className="w-3 h-3 text-white" />
                                                    ) : null}
                                                </div>                                                
                                                <span className="text-sm font-medium">Imagens Adicionais</span>
                                            </div>
                                            { hasImagensAdicionais && (
                                                <div className="mt-2 pl-8">
                                                    <input
                                                        type="number"
                                                        placeholder="Quantidade de Imagens Adicionais"
                                                        value={imagensAdicionais}
                                                        onChange={(e) => setImagensAdicionais(e.target.value)}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="w-full text-sm p-2 rounded-lg"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className={`
                                                mt-6 p-4 rounded-lg border-2 
                                                ${ hasVideoAdicional ?
                                                'border-primary bg-primary bg-opacity-5' :
                                                'border-gray'
                                            }
                                            `}>
                                            <div className="flex items-center space-x-3 cursor-pointer"
                                                onClick={() => setHasVideoAdicional(!hasVideoAdicional) }>
                                                <div className={`
                                                        flex items-center justify-center w-5 h-5 rounded-md
                                                        transition-colors duration-300
                                                        ${ hasVideoAdicional ? 'bg-primary' : 'bg-gray-100'}
                                                    `}>
                                                    { hasVideoAdicional ? (
                                                        <Check className="w-3 h-3 text-white" />
                                                    ) : null}
                                                </div>                                                
                                                <span className="text-sm font-medium">Vídeo</span>
                                            </div>
                                            { hasVideoAdicional && (
                                                <div className="mt-2 pl-8">
                                                    <input
                                                        type="number"
                                                        placeholder="Tempo em Minutos"
                                                        value={videoAdicional}
                                                        onChange={(e) => setVideoAdicional(e.target.value)}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="w-full text-sm p-2 rounded-lg"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                </div>

                            )}

                            { /*  Serviços Adicionais  */ }
                            {step === 5 && (
                                
                                <div className="space-y-3">
                                    <Card className="w-full mx-auto">
                                        <CardContent>
                                            <div className="grid grid-cols-3 gap-4">

                                                <div className="col-span-3">                                                    
                                                    <span>
                                                        Algumas ações fazem parte do nosso workflow e já estarão inclusas em nossos serviços.
                                                        Além delas, você pode escolher alguns serviços que gostaria que fosse adicionado à sua renderização:
                                                    </span>
                                                </div> 

                                                { flattenedServices.map((item, index) => {
                                                                                                        
                                                    if (item.isTitle) {
                                                        return (
                                                            <div key={item.title} className="col-span-3">
                                                                <h3 className="font-semibold text-lg border-b pb-2 mt-4 first:mt-0">
                                                                    
                                                                </h3>
                                                            </div>
                                                        );
                                                    }
                                                    
                                                    const isSelected = selectedRooms.includes(item.id) || item.type == 'fixed';
                                                    if ( !item.isTitle ) 
                                                        return (
                                                            <div
                                                                key={item.id}
                                                                onClick={() => handleRoomToggle(item.id)}
                                                                className={`relative p-3 rounded-lg border-2 cursor-pointer
                                                                    transition-all duration-300 transform hover:scale-105
                                                                    ${ isSelected ?
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
                                </div>

                            )}

                            <div className="flex justify-between pt-4">

                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    className="inline-flex h-10 items-center gap-2 rounded-full bg-white border font-medium hover:bg-gray-100 gap-1 px-6 border-gray"
                                    disabled={step === 1}
                                >
                                    <svg className="fill-black" width="16" height="12" viewBox="06 05 05 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="" d="M6.3508 12.7499L11.2096 17.4615L10.1654 18.5383L3.42264 11.9999L10.1654 5.46148L11.2096 6.53833L6.3508 11.2499L21 11.2499L21 12.7499L6.3508 12.7499Z"/>
                                    </svg>
                                    Anterior
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={step === totalSteps}
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
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
};

export default Simulacao;