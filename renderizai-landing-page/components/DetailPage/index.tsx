"use client"
import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, Clock, Home, Calendar, Square, Info, Paperclip, X, Download, Upload, File } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mensagem, RequisicoesData } from '@/types/requisicao';
import clientService from '@/services/cliente';
import { Cliente } from '@/types/cliente';
import { Arquivo } from '@/types/arquivo';
import Loader from '../Common/Loader';
import LoaderMini from '../Common/LoaderMini';

const DetailComponent = () => {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Mensagem[]>([]);
    const [showDetails, setShowDetails] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [cliente, setCliente] = useState<Cliente | null>(null);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const encodedData = searchParams.get('requisicao');
    const data = encodedData ? JSON.parse(decodeURIComponent(encodedData)) : null;
    if (data == null)
        router.push('/');

    const [requisition, setRequisition] = useState<RequisicoesData>({
        id: data.id,
        idCliente: data.idCliente,
        titulo: data.titulo,
        descricao: data.descricao,
        dataRegistro: data.dataRegistro,
        status: data.status,
        prioridade: data.prioridade,
        pacote: data.pacote,
        tipoProjeto: data.tipoProjeto,
        m2Interno: data.m2Interno,
        m2Edificacao: data.m2Edificacao,
        m2Terreno: data.m2Terreno,
        proporcao: data.proporcao,
        ambientes: data.ambientes,
        servicosAdicionais: data.servicosAdicionais,
        iluminacoes: data.iluminacoes,
        outraIluminacao: data.outraIluminacao,
        idRenderizador: data.idRenderizador,
        renderizador: data.renderizador,
        imagensAdicionais: data.imagensAdicionais,
        tempoVideo: data.tempoVideo,
        valor: data.valor
    });

    const handleSendMessage = () => {

        if ( message.trim()) {
            clientService.postMessage(requisition.id, cliente.id, message).then((response) => {

                if ( response.status == 201 ) {                   
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

    const handleFileUpload = (event) => {
        const uploadedFiles = event.target.files[0];
        const newFiles: Arquivo = {
            id: files.length + 1,
            tipo: 1,
            nome: uploadedFiles.name.toString(),
            dataRegistro: new Date()
        }
        setFiles([...files, newFiles]);
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
        const newFiles: Arquivo = {
            id: files.length + 1,
            tipo: 1,
            nome: droppedFile.name.toString(),
            dataRegistro: new Date()
        }
        setFiles([...files, newFiles]);
    };

    const removeFile = (fileId) => {
        setFiles(files => files.filter((file, i) => i !== fileId));
    };

    const downloadFile = (file: File) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    useEffect(() => {
        // Este código será executado sempre que files mudar
        console.log('Files atualizados:', files);
    }, [files]);

    useEffect(() => {

        //Carrega Mensagens
        clientService.getMensagens(data.id).then((response) => {

            if (response.status == 200) {
                
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

        const storedCliente = localStorage.getItem("cliente");
        if (storedCliente) {
        try {
            const parsedCliente = JSON.parse(storedCliente);
            setCliente(parsedCliente);
        } catch (error) {
            console.error('Error parsing client data:', error);
        }
        }

    }, []);

    return (

        <div className="min-h-screen mt-25 pt-12 bg-gray-50">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Project Information */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <h1 className="text-2xl text-gray-700">
                            <b>Solicitação:</b> {requisition.id} {" - "} {requisition.titulo}
                        </h1>
                        <button
                            onClick={() => setShowDetails(true)}
                            className="bg-black hover:bg-blackho text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
                        >
                            <Info size={18} />
                            Detalhes
                        </button>
                    </div>

                    {/* Status and Priority Badges */}
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600"><b>Status:</b></span>
                            <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">
                                {requisition.status}
                            </span>
                        </div>
                        { /* 
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Prioridade:</span>
                            <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">
                                Solicitada
                            </span>
                        </div>
                        */ }
                    </div>

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
                                <span className="font-medium">{requisition.dataRegistro.toString().substring(0, 10)}</span>
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
                                                onClick={() => console.log("Download: ", file.nome)}
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

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Actions Card */}
                    <div className="bg-white gap-4 rounded-xl shadow-md p-6">

                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Ações</h2>

                        <div className='flex justify-between gap-4'>
                            <button
                                onClick={() => setShowDetails(true)}
                                className="w-full bg-black hover:bg-blackho text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
                            >
                                <Info size={18} />
                                Detalhes
                            </button>
                            <button
                                onClick={() => setShowDetails(true)}
                                className="w-full bg-primary hover:bg-primaryho text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
                            >
                                <Info size={18} />
                                Detalhes
                            </button>
                        </div>

                    </div>

                    {/* Messages Card */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Mensagens</h2>
                        <div className="space-y-4">
                            {/* Messages List */}
                            <div className="h-64 overflow-y-auto space-y-3">
                                {messages.map((msg, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                                        <p className="text-gray-700">{msg.mensagem}</p>
                                        <span className="mt-6 text-xs text-gray-500">
                                            { new Date(msg.dataRegistro).toLocaleDateString() }
                                        </span>
                                        <br />
                                        <span className="text-xs text-gray-500">
                                            Enviado 
                                            { msg.enviadoPor == cliente?.id ? ' por Você' : ' pelo Renderizador' }
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
            </div>

            {/* Details Popup */}
            {showDetails && (
                <div className="fixed inset-0 bg-blck bg-opacity-80 flex items-center justify-center p-4 z-99999">
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

            { uploading && (
            <div className="fixed inset-0 bg-blck bg-opacity-70 flex items-center justify-center p-4 z-99999">
                <div className="grid grid-cols-4 bg-white rounded-lg shadow-xl w-full max-w-md py-6 items-center">
                    <div className="col-span-1"><LoaderMini /></div>
                    <div className="col-span-3"><span>Upload do arquivo em andamento...</span></div>
                </div>
            </div>
            )}

        </div>
    );
};

export default DetailComponent;