"use client"
import SectionHeader from '@/components/Common/SectionHeader';
import { Requisicao, RequisicoesData } from '@/types/requisicao';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from "@/components/Common/Loader";
import React, { useEffect, useState } from 'react';
import clientService from '@/services/cliente';
import { Cliente } from '@/types/cliente';

const ResultPage: React.FC = () => {

    const router = useRouter();
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [resultVal, setResultVal] = useState<number>(0.00);
    const [paymentRadio, setPaymentRadio] = useState<string>('option1');

    //const data: Requisicao = JSON.parse(localStorage.getItem("navigationData") || "");
    const searchParams = useSearchParams();
    const encodedData = searchParams.get('requisicao');
    const data: RequisicoesData = encodedData ? JSON.parse(decodeURIComponent(encodedData)) : null;

    const [enviando, setEnviando] = useState<boolean>(false);
    const enviaRequisicao = () => {
        
        if ( !enviando )
        {
            setEnviando(true);

            data.valor = resultVal;
            
            // Envia a Requisição e Aguarda Resposta
            clientService.createRequisicao(data).then((retorno) => {
                console.log(retorno);
                //Habilita novamente após retorno
                setEnviando(false);
            });
        }
        setEnviando(false);
    }

    const doCalculation = () => {

        //Valor Base
        const baseVal = data?.pacote == 'basic' ? 350 : data?.pacote == 'standard' ? 600 : 800;

        //Valor por m²
        const m2val = data?.tipoProjeto == 'option1' ? (data?.m2Interno * 4.47) :
            (data?.m2Edificacao * 3.50 + data?.m2Terreno * 2, 27);

        //Ambientes        
        var extraRooms = data?.ambientes.length - (data?.pacote === 'basic' ? 1 : data?.pacote === 'standard' ? 2 : 4);
        const adtAmb = extraRooms > 0 ? extraRooms * 325 : 0;

        //Iluminação
        var extraLight = data?.iluminacoes.length - (data?.pacote === 'basic' ? 2 : data?.pacote === 'standard' ? 3 : 5);
        const adtLight = extraLight > 0 ? extraLight * 89 : 0;

        //Serviços Adicionais
        var adtService = 0;
        if (data?.servicosAdicionais.includes('img'))
            adtService = data?.imagensAdicionais * 89;

        if (data?.servicosAdicionais.includes('vid'))
            adtService += data?.tempoVideo * 299;

        var otherServices = data?.servicosAdicionais.filter(service => service !== 'img' && service !== 'vid');
        adtService += otherServices.length > 0 ? otherServices.length * 69 : 0;

        //Final Result        
        const result = baseVal + m2val + adtAmb + adtLight + adtService;
        setResultVal(result);
    }

    const handlePaymentRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentRadio(event.target.value);
    };

    useEffect(() => {
        
        setTimeout(() => setLoading(false), 1000);
        
        const storedCliente = localStorage.getItem("cliente");
        if (storedCliente) {
          try {
            const parsedCliente = JSON.parse(storedCliente);
            setCliente(parsedCliente);
          } catch (error) {
            console.error('Error parsing client data:', error);
          }
        }
        
        doCalculation();
        
    }, []);

    const CurrencyFormatter = (amount: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(amount);
    }

    return (

        <>
            <section id="calculation" className={`w-full z-[99] mt-20 mb-20 pt-30 lg:pt-25 xl:pt-30 transition-opacity duration-500 ease-in-out opacity-100`}>

                {loading ? <Loader /> :

                    <>
                        <div className="w-full mx-auto max-w-c-1500 px-4 md:px-8 xl:px-0 -mt-10">
                            <SectionHeader
                                headerInfo={{
                                    title: "investimento",
                                    subtitle: "Investimento na valorização do seu projeto e no seu portifólio",
                                    description: `OBS: Este valor pode sofrer uma leve variação após a validação por um dos nosso especialistas.`,
                                }}
                            />
                        </div>

                        <div className="w-full mx-auto max-w-c-1500 px-4 md:px-8 xl:px-0 mt-10 transition-opacity duration-500 ease-in-out opacity-100">
                            <h1 className="text-center mb-4 text-7xl font-bold text-yellow transition-opacity duration-500 ease-in-out opacity-100">
                                {CurrencyFormatter(resultVal)}
                            </h1>
                        </div>


                        <div className="w-full mx-auto max-w-c-1500 px-10 md:px-8 xl:px-0 mt-10 justify-center transition-opacity duration-500 ease-in-out opacity-100">
                            <div className=" m-4 gap-4 px-20  grid grid-cols-2">
                                <div className="flex gap-3 col-span-1">
                                    <div className="w-full flex justify-center gap-3 ">
                                        <input
                                            id="payment-radio1"
                                            type="radio"
                                            value="option1"
                                            checked={paymentRadio === 'option1'}
                                            onChange={handlePaymentRadio}
                                            name="payment-radio-group"
                                            className="mt-1 w-5 h-5 transform hover:scale-110  transition-all duration-300 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 " />
                                        <div>
                                            <h3 className="text-lg font-medium mb-2">À vista com 5% de desconto</h3>
                                            <ul className="text-gray-600 space-y-1">
                                                <li>• 60% no início do projeto {CurrencyFormatter((resultVal * 0.95 * 0.6))}</li>
                                                <li>• 40% na entrega {CurrencyFormatter((resultVal * 0.95 * 0.4))}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 col-span-1">
                                    <div className="w-full flex justify-center gap-3 ">
                                        <input
                                            id="payment-radio2"
                                            type="radio"
                                            value="option2"
                                            checked={paymentRadio === 'option2'}
                                            onChange={handlePaymentRadio}
                                            name="payment-radio-group"
                                            className="mt-1 w-5 h-5 transform hover:scale-110  transition-all duration-300 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 " />
                                        <div>
                                            <h3 className="text-lg font-medium">Parcelado</h3>
                                            <p className="text-gray-600">• Até 3x sem juros</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {cliente == null ? <></> :
                            <>
                                <div className="mt-20 mx-auto max-w-c-1500 px-4 md:px-8 xl:px-0 mt-10 transition-opacity duration-500 ease-in-out opacity-100">
                                    <div className="flex items-center justify-center text-center mb-4 font-bold">
                                        <button 
                                            className="flex items-center transform hover:scale-110  transition-all duration-300 shadow-md justify-center rounded-full bg-primary px-7.5 py-4 text-white hover:bg-primaryho"
                                            onClick={enviaRequisicao}>
                                            Enviar Solicitação de Renderização
                                        </button>
                                    </div>
                                </div>

                            </>
                        }

                    </>
                }

            </section>
        </>
    );
};

export default ResultPage;