"use client"
import React from 'react';
import { MessageCircle, Check, X } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { motion } from 'framer-motion';
import { useRouter } from "next/router";

type RequisicoesData = {
    id: number,
    titulo: string,
    descricao: string,
    dataRegistro: Date,
    status: string,
    tipoProjeto: string,
    prioridade: string,
    m2Interno: number,
    ambientes: string[],
    servicosAdicionais: string[],
    iluminacoes: string[],
    renderizador: string
};

const DetailComponent = () => {

    const [message, setMessage] = useState('');
    const [requisition, setRequisition] = useState<RequisicoesData>({
        id: 1,
        titulo: "Sala de Estar",
        descricao: "Descrição detalhada sobre a solicitação aoisdjioasjdoiasjdioajsidosjiodj",
        dataRegistro: new Date(),
        status: "Em Análise",
        tipoProjeto: "Interiores",
        prioridade: "rejeitado",
        m2Interno: 10,
        ambientes: ["Cozinha", "Sala", "Hall de Entrada", "Quarto"],
        servicosAdicionais: ["360", "video"],
        iluminacoes: ["Iluminação geral por plafon / pendentes", "Iluminação com spots"],
        renderizador: "José"
    });

    const router = useRouter();
    const { req } = router.query;
    console.log(req);

    const handleApprove = () => {
        // Handle approval logic here
        console.log('Requisition approved');
    };

    const handleReject = () => {
        // Handle rejection logic here
        console.log('Requisition rejected');
    };

    const handleSendMessage = () => {
        // Handle message sending logic here
        console.log('Message sent to renderizador:', message);
        setMessage('');
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pendente':
                return 'bg-yellow-200 text-yellow-700 mt-6';
            case 'aprovado':
                return 'bg-green-200 text-white mt-6 ';
            case 'rejeitado':
                return 'bg-red-200 text-red-700 mt-6';
            default:
                return 'bg-gray-200 text-gray-700 mt-6';
        }
    };

    return (
        <>
            <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-20 xl:pb-30 xl:pt-20">
                <div className='grid grid-cols-7 gap-4 mx-7.5 lg:mx-35 xl:mx-60'>

                    <div className="col-span-5 relative z-1 mx-auto w-full pb-7.5 pt-10 lg:pt-15 xl:pt-20">

                        { /* Header Section */}
                        <div className="flex w-full">

                            <div className="w-full rounded-lg border border-gray-200 p-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Projeto de Renderização: {requisition.id} {" - "} {requisition.titulo} </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="w-full grid grid-cols-2">
                                            <div className="col-span-1">
                                                <div>
                                                    <p className="font-semibold mt-6">Tipo de Projeto:</p>
                                                    <p>{requisition.tipoProjeto}</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold mt-4">Data de Criação:</p>
                                                    <p>{new Date(requisition.dataRegistro).toLocaleDateString()}</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold mt-4">Metragem</p>
                                                    <p>{requisition.m2Interno}m²</p>
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <div>
                                                    <span className="font-semibold mt-4">Status: </span>
                                                    <Badge className={getStatusColor(requisition.status)}>
                                                        <span className="text-white text-sm">{requisition.status}</span>
                                                    </Badge>
                                                </div>
                                                <div>
                                                    <span className="font-semibold mt-4">Priodidade: </span>
                                                    <Badge className={getStatusColor(requisition.prioridade)}>
                                                        <span className="text-white text-sm">{requisition.status}</span>
                                                    </Badge>
                                                </div>
                                                <div>
                                                    <p className="font-semibold mt-4">Data de Registro</p>
                                                    <p>{new Date(requisition.dataRegistro).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                { /* Descrição */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Descrição</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="mt-4">
                                            <p>{requisition.descricao}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                        </div>

                        { /* Ambientes */}
                        <div className="flex w-full pt-4">
                            <div className="w-full rounded-lg border border-gray-200 p-8">

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Ambientes</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="mt-4">
                                            {requisition.ambientes.map((element, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-primary text-white text-md font-semibold mr-2 px-4 py-2 rounded-full dark:bg-blue-200 "
                                                >
                                                    {element}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                            </div>

                        </div>

                        { /* Iluminação */}
                        <div className="flex w-full pt-4">
                            <div className="w-full rounded-lg border border-gray-200 p-8">

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Iluminação</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="mt-4">
                                            {requisition.iluminacoes.map((element, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-primary text-white text-md font-semibold mr-2 px-4 py-2 rounded-full dark:bg-blue-200 "
                                                >
                                                    {element}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                            </div>

                        </div>

                    </div>

                    { /* Side */}
                    <div className="col-span-2 bg-white w-full pb-7.5 pt-10 lg:pt-15 xl:pt-20">
                        <div className="w-full rounded-lg border border-gray-200 p-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ações</CardTitle>
                                </CardHeader>
                            </Card>
                        </div>
                        <div className="w-full rounded-lg border border-gray-200 mt-4 pt-8 pl-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Mensagens</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Digite sua mensagem..."
                                        className="w-full border rounded-lg"
                                    />
                                    <div className="w-full justify-right">
                                        <button
                                            onClick={handleSendMessage}
                                            className="justify-right inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho" >
                                            <MessageCircle className="mr-2 h-4 w-4" />
                                            Enviar Mensagem
                                        </button>
                                    </div>

                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
};

export default DetailComponent;