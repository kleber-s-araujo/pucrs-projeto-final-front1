"use client"
import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, Clock, Home, Calendar, Square, Info, Paperclip, X, Download, Upload, File, Delete, DeleteIcon, RemoveFormattingIcon, Trash, Trash2, CircleDollarSign, MessageCircleCodeIcon, MessageCircleCode, MessagesSquare, ActivityIcon, Option, Menu, Plus, PlusCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mensagem, RequisicoesData } from '@/types/requisicao';
import clientService from '@/services/cliente';
import { Cliente } from '@/types/cliente';
import { Arquivo } from '@/types/arquivo';
import LoaderMini from '../Common/LoaderMini';

const DetailComponent = () => {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Mensagem[]>([]);
    const [showDetails, setShowDetails] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [cliente, setCliente] = useState<Cliente | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [loadingData, setLoading] = useState(true);
    const [requisition, setRequisition] = useState<RequisicoesData>({
        id: 0,
        idCliente: 0,
        titulo: "",
        descricao: "",
        dataRegistro: new Date,
        status: "",
        prioridade: "",
        pacote: "",
        tipoProjeto: "",
        m2Interno: 0,
        m2Edificacao: 0,
        m2Terreno: 0,
        proporcao: "",
        ambientes: [],
        servicosAdicionais: [],
        iluminacoes: [],
        outraIluminacao: "",
        idRenderizador: 0,
        renderizador: "",
        imagensAdicionais: 0,
        tempoVideo: 0,
        valor: 0
    });

    const handleSendMessage = () => {

        if (message.trim()) {
            clientService.postMessage(requisition.id, cliente.id, message).then((response) => {

                if (response.status == 201) {
                    setMessages([...messages,
                    {
                        idMensagem: response.data.msgID,
                        enviadoPor: cliente.id,
                        mensagem: message,
                        dataRegistro: new Date(),
                        idRequisicao: requisition.id
                    }]);
                    setMessage('');
                }

            });
        }
    };

    const [files, setFiles] = useState<Arquivo[]>([]);
    const fileInputRef = useRef(null);

    const sendUploadFile = async (file: File) => {

        setUploading(true);

        try {

            clientService.postArquivo(requisition.id, cliente?.id, file).then((response) => {

                if (response.status == 201) {

                    const newFiles: Arquivo = {
                        nome: file.name,
                        idRequisicao: requisition.id,
                        tipo: 1,
                        sender: cliente.id,
                        dataRegistro: new Date() // response.data.dataRegistro
                    }
                    setFiles([...files, newFiles]);
                }
            });

        } catch (error) {
            console.log("Erro ao realizar upload", error.message);
        }
        finally {
            setUploading(false);
        }


    }

    const handleFileUpload = (event) => {
        const uploadedFiles = event.target.files[0];
        sendUploadFile(uploadedFiles);
        event.target.value = null;
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFile = e.dataTransfer.files[0];
        sendUploadFile(droppedFile);
    };

    const removeFile = (fileId) => {

        clientService.deletaArquivo(data.id, files[fileId].nome).then((response) => {

            if (response.status == 204) {
                alert("Arquivo Removido!");
                setFiles(files => files.filter((file, i) => i !== fileId));
            }

        });
    };

    const changeStatus = (nextStatus: string) => {
        //alert("Alterar Status para: " + nextStatus);
        if (nextStatus == "aprovado" && requisition.status !== "aprovação")
        {
            alert(`Aprovação e Pagamento apenas disponível quando a solicitação de Renderização estiver em "Aprovação Solicitada"! `);
            return;
        }

        if (nextStatus == "cancelado")
        {
            alert("Deseja realmente cancelar sua solicitação? Caso já tenha sido análisada será aplicada uma pequena multa...")
        }
    }

    const downloadFile = async (file: string) => {

        clientService.genURLArquivo(data.id, file).then(async (response) => {

            if (response.status == 200)
            {
                //const url = URL.createObjectURL(file);
                //const res = await fetch(response.data.url);
                //const blob = await res.blob();
                //const blobUrl = window.URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = response.data.url;
                a.download = file;
                a.style.display = 'none';
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.setAttribute('type', 'application/octet-stream');

                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                //window.URL.revokeObjectURL(blobUrl);   
            }
        });        
    };

    useEffect(() => {
        // Este código será executado sempre que files mudar
        console.log('Files atualizados:', files);
    }, [files]);

    const [currentStatus, setCurrentStatus] = useState({
        status: 0,
        descricao: ""
    });

    useEffect(() => {
        // Este código será executado sempre questatus mudar
        console.log('Status Atualizado:', currentStatus);
    }, [currentStatus]);

    useEffect(() => {
        
        setTimeout(() => setLoading(false), 1500);

        const encodedData = searchParams.get('requisicao');
        const data: RequisicoesData = encodedData ? JSON.parse(decodeURIComponent(encodedData)) : null;
        if (data == null)
            router.push('/');
        setRequisition(data);

        const status = clientService.getStatus(data.id).then((response) => {
            if (response?.status == 200) {
                //console.log(response.data.status[0]);
                setCurrentStatus(response.data.status[0]);
            }
        });

    }, []);

    useEffect(() => {

        
        try {

            //Carrega Mensagens
            clientService.getMensagens(data.id).then((response) => {

                if (response && response.status == 200) {

                    //setMessages([...messages, { text: message, timestamp: new Date() }]);
                    const Mensagens: Mensagem[] = response.data.map(element => ({
                        idMensagem: element.idMensagem,
                        idRequisicao: element.idRequisicao,
                        enviadoPor: element.enviadoPor,
                        dataRegistro: element.dataRegistro,
                        mensagem: element.mensagem
                    }));

                    setMessages(Mensagens);
                    console.log(response.data);
                }

            });

        } catch (error) {
            console.log("Não encontrou mensagens...");
        }

        const storedCliente = localStorage.getItem("cliente");
        if (storedCliente) {
            try {
                const parsedCliente = JSON.parse(storedCliente);
                setCliente(parsedCliente);
            } catch (error) {
                console.error('Error parsing client data:', error);
            }
        };

        try {

            //Carrega Arquivos
            clientService.getArquivos(data.id).then((response) => {

                if (response && response?.status == 200) {

                    const files: Arquivo[] = response.data.map(element => ({
                        nome: element.nome,
                        idRequisicao: element.idRequisicao,
                        tipo: element.tipo,
                        sender: element.sender,
                        dataRegistro: element.dataRegistro
                    }));
                    setFiles(files);
                }

            });

        } catch (error) {
            console.log("Não encontrou arquivos...");
        }

    }, []);

    return (


        <div className="min-h-screen mt-25 pt-12 bg-gray-50 px-40">

            { /* Status Stepper */}
            <div className="bg-white rounded-xl py-6 px-10 border shadow-sm space-y-6 mb-4">
                <ol className="lg:flex justify-beteen items-center w-full space-y-4 lg:space-y-0 lg:space-x-4">
                    <li className="relative ">
                        <a href="#" onClick={changeStatus} className="flex items-center font-medium w-full  ">
                            <span className={`w-6 h-6 border ${ currentStatus.status == 1 ? 'bg-blue-500 border-transparent' : 'bg-gray-50 border-gray-200' }   rounded-full flex justify-center items-center mr-2 text-sm text-white lg:w-8 lg:h-8`}>1</span>
                            <div className="block">
                                <h4 className={`text-base ${ currentStatus.status == 1 ? 'text-blue-500' : 'text-waterloo' } `}>Render Solicitado</h4>
                            </div>
                            <svg className={`w-5 h-5 ml-2 ${ currentStatus.status == 1 ? 'stroke-blue-500' : 'stroke-waterloo'} sm:ml-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg`}>
                                <path d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6" stroke-width="1.6" strokeLinecap="round" />
                            </svg>
                        </a>
                    </li>
                    <li className="relative  ">
                        <a className="flex items-center font-medium w-full">
                            <span className="w-6 h-6 bg-gray-50 border border-gray-200 rounded-full flex justify-center items-center mr-3 text-sm  lg:w-8 lg:h-8">2</span>
                            <div className="block">
                                <h4 className={`text-base ${ currentStatus.status == 2 ? 'text-blue-500' : 'text-waterloo'} `}>Solicitação em Análise</h4>
                            </div>
                            <svg className="w-5 h-5 ml-2 stroke-waterloo sm:ml-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6" stroke="stroke-current" stroke-width="1.6" stroke-linecap="round" />
                            </svg>
                        </a>
                    </li>
                    <li className="relative  ">
                        <a className="flex items-center font-medium w-full  ">
                            <span className="w-6 h-6 bg-gray-50 border border-gray-200 rounded-full flex justify-center items-center mr-3 text-sm  lg:w-8 lg:h-8">3</span>
                            <div className="block">
                                <h4 className="text-base text-waterloo">Renderização em Desenvolvimento</h4>
                            </div>
                            <svg className="w-5 h-5 ml-2 stroke-waterloo sm:ml-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6" stroke="stroke-current" stroke-width="1.6" stroke-linecap="round" />
                            </svg>
                        </a>
                    </li>
                    <li className="relative  ">
                        <a className="flex items-center font-medium w-full  ">
                            <span className="w-6 h-6 bg-gray-50 border border-gray-200 rounded-full flex justify-center items-center mr-3 text-sm  lg:w-8 lg:h-8">4</span>
                            <div className="block">
                                <h4 className="text-base text-waterloo">Aprovação Solicitada</h4>
                            </div>
                            <svg className="w-5 h-5 ml-2 stroke-waterloo sm:ml-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6" stroke="stroke-current" stroke-width="1.6" stroke-linecap="round" />
                            </svg>
                        </a>
                    </li>
                    <li className="relative  ">
                        <a className="flex items-center font-medium w-full  ">
                            <span className="w-6 h-6 bg-gray-50 border border-gray-200 rounded-full flex justify-center items-center mr-3 text-sm  lg:w-8 lg:h-8">5</span>
                            <div className="block">
                                <h4 className="text-base text-waterloo">Finalizado</h4>
                            </div>
                        </a>
                    </li>
                </ol>
            </div>

            <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 ">

                {/* Main Project Information */}
                <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm p-6 space-y-6 mb-20">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <h1 className="text-2xl text-gray-700">
                            <b>Solicitação:</b> {requisition.id} {" - "} {requisition.titulo}
                        </h1>
                        { /*
                        <button
                            onClick={() => setShowDetails(true)}
                            className="bg-black hover:bg-blackho text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2">
                            <Info size={18} />
                        </button>
                        */ }
                    </div>

                    {/* Status and Priority Badges */}
                    { /* 
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600"><b>Status:</b></span>
                            <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">
                                {requisition.status}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Prioridade:</span>
                            <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">
                                Solicitada
                            </span>
                        </div>
                        
                    </div>
                    */ }

                    {/* Project Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Home size={18} className="text-gray-500" />
                                <span className="text-gray-600"><b>Tipo de Projeto:</b></span>
                                <span className="font-medium">{requisition.tipoProjeto}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-gray-500" />
                                <span className="text-gray-600"><b>Data de Criação:</b></span>
                                <span className="font-medium">{requisition.dataRegistro.toString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Square size={18} className="text-gray-500" />
                                <span className="text-gray-600"><b>Metragem:</b></span>
                                <span className="font-medium">
                                    {requisition.tipoProjeto == 'Interiores' ?
                                        <span className="font-medium">{requisition.m2Interno} m²</span>
                                        : <span className="font-medium">{requisition.m2Edificacao} m² e {requisition.m2Terreno} m²</span>
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Descrição */}
                    <div>
                        <h2 className="mt-10 text-lg font-medium text-gray-700 mb-2"><b>Descrição:</b></h2>
                        <p className="text-gray-600 pl-2">
                            {requisition.descricao}
                        </p>
                    </div>

                    <div className="border-t pt-6">

                        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <MessagesSquare size={20} />
                            Mensagens
                        </h2>

                        <div className="space-y-4">
                            {/* Messages List */}
                            <div className="h-max-64 overflow-y-auto space-y-3">
                                {messages.map((msg, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                                        <p className="text-gray-700">{msg.mensagem}</p>
                                        <span className="mt-6 text-xs text-gray-500">
                                            {new Date(msg.dataRegistro).toLocaleString()}
                                        </span>
                                        <br />
                                        <span className="text-xs text-gray-500">
                                            Enviado
                                            {msg.enviadoPor == cliente?.id ? ' por Você' : ' pelo Renderizador'}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <div className="relative">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Digite sua mensagem..."
                                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows={3}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="absolute bottom-5 right-3 bg-black hover:bg-blackho text-white p-2 rounded-lg transition duration-200"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Actions Card */}
                    <div className="bg-white gap-4 rounded-xl border shadow-sm p-6">

                        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <Menu size={20} />
                            Ações
                        </h2>
                        <div className='flex gap-4'>
                            <button
                                onClick={() => setShowDetails(true)}
                                className="w-full border bg-black hover:bg-blackho text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
                            >
                                <PlusCircle size={18} />
                                Ver mais Detalhes
                            </button>
                        </div>
                        <div className='flex gap-4 mt-2'>
                            <button
                                onClick={() => changeStatus("cancelado")}
                                className="w-full border bg-white hover:bg-gray text-black font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
                            >
                                <Trash2 size={18} />
                                Solicitar Cancelamento
                            </button>
                        </div>

                        <div className='flex gap-4 mt-2'>
                            <button
                                onClick={(e) => changeStatus("aprovado")}
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
                            >
                                <CircleDollarSign size={18} />
                                Aprovar e Pagar
                            </button>
                        </div>


                    </div>

                    {/* Files Card */}
                    <div className="bg-white rounded-xl border shadow-sm p-6">

                        <h2 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
                            <Paperclip size={20} />
                            Arquivos
                        </h2>

                        {/* Upload Area */}
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                                multiple={false}
                            />
                            <div className="flex flex-col items-center gap-2">
                                <Upload size={24} className="text-gray-400" />
                                <p className="text-gray-600">
                                    Arraste arquivos aqui ou{' '}
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        selecione do computador
                                    </button>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Suporta qualquer tipo de arquivo até 1MB
                                </p>
                            </div>
                        </div>

                        {/* Files List */}
                        <div className="space-y-2">
                            {files.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition duration-150"
                                >
                                    <div className="flex items-center gap-3">
                                        <File size={20} className="text-gray-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">{file.nome}</p>
                                            <p className="text-xs text-gray-500">
                                                {
                                                    file.tipo == 1 ? 'Arquivo de Projeto' : file.tipo == 2 ? 'Preview' : 'Render Final'
                                                } • {file.dataRegistro.toString().substring(0, 10)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="p-2 hover:bg-gray-200 rounded-full transition duration-150"
                                            onClick={() => downloadFile(file.nome)}
                                        >
                                            <Download size={18} className="text-gray-600" />
                                        </button>

                                        <button
                                            className="p-2 hover:bg-gray-200 rounded-full transition duration-150"
                                            onClick={() => removeFile(index)}
                                        >
                                            <X size={18} className="text-gray-600" />
                                        </button>

                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* Details Popup */}
            {showDetails && (
                <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center p-4 z-99999">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">Detalhes do Projeto</h2>
                            <button
                                onClick={() => setShowDetails(false)}
                                className="text-gray-500 hover:text-gray-700" >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-4 space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-700 mb-3">Ambientes</h3>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        requisition.ambientes.length > 0 ?
                                            requisition.ambientes?.map((env, index) => (
                                                <span key={index} className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">
                                                    {env}
                                                </span>
                                            ))
                                            : <> </>
                                    }
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-700 mb-3">Iluminação</h3>
                                <div className="flex flex-wrap gap-2">
                                    {requisition.iluminacoes?.map((light, index) => (
                                        <span key={index} className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">
                                            {light}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="border-t p-4">
                            <button
                                onClick={() => setShowDetails(false)}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            { /* Pop-up Upload de Arquivo */ }
            { uploading && (
                <div className="fixed inset-0 bg-blck bg-opacity-70 flex items-center justify-center p-4 z-99999">
                    <div className="grid grid-cols-4 bg-white rounded-lg shadow-xl w-full max-w-md py-6 items-center">
                        <div className="col-span-1"><LoaderMini /></div>
                        <div className="col-span-3"><span>Upload do arquivo em andamento...</span></div>
                    </div>
                </div>
            )}

            { /* Loading dos Dados Iniciais */  }
            { loadingData && (
                <div className="fixed inset-0 bg-white bg-opacity-99 flex items-center justify-center p-4 z-99999">
                    <div className="grid grid-cols-4 bg-white rounded-lg shadow-xl w-full max-w-md py-6 items-center">
                        <div className="col-span-1"><LoaderMini /></div>
                        <div className="col-span-3"><span>Carregando Dados da Solicitação...</span></div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DetailComponent;