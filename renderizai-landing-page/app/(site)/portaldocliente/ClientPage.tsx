"use client"
import { Cliente, tipo } from "@/types/cliente";
import { useEffect, useState, useCallback } from "react";
import { Plus, Upload, X } from 'lucide-react';
import clientService from "@/services/cliente";
import Loader from "@/components/Common/Loader";
import { RequisicoesData } from "@/types/requisicao";
import { useRouter } from "next/navigation";

const ClientPage: React.FC = () => {

    const router = useRouter(); 
    const [cliente, setCliente] = useState<Cliente>({
        id: 0,
        nome: "",
        email: "",
        senha: "",
        tipo: 0,
        dataRegistro: new Date(),
        fotoPerfil: ""
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [tipoCliente, setTipo] = useState("");
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [requisitions, setRequisitions] = useState<RequisicoesData[]>([]);
    const [tipos, setTipos] = useState<tipo[]>([{
        id: 1,
        lang: "",
        descricao: "",
    }]);

    const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
        
            const imageResult = reader.result as string;
            setProfileImage(imageResult);
            
            try {
                
                const result = await clientService.updateClientImage(cliente.id, file);
                if (result.status === 200) {
                    const updatedCliente = {
                        ...cliente,
                        fotoPerfil: result.data.filename
                    };
                    setCliente(updatedCliente);
                    localStorage.setItem("cliente", JSON.stringify(updatedCliente));
                    console.log('Imagem Atualizada!');
                }
            } catch (error) {
                console.error('Error updating image:', error);
            }
        };
        reader.readAsDataURL(file);
    }, [cliente.id]);

    const getStatusColor = useCallback((status: string) => {
        switch (status.toLowerCase()) {
            case 'pendente': return 'bg-yellow-100 text-yellow-800';
            case 'aprovado': return 'bg-green-100 text-green-800';
            case 'em análise': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }, []);

    const openRequisition = (id: number) => {
        
        //router.push(`/portaldocliente/detalhes/${id}`);
        console.log(requisitions);
        debugger        
        router.push(`/portaldocliente/detalhes?requisicao=${ JSON.stringify(requisitions[id]) }`);

    };

    // Load initial client data
    useEffect(() => {
        const storedClient = localStorage.getItem("cliente");
        if (storedClient && cliente.nome === "") {
            setCliente(JSON.parse(storedClient));            
        }
    }, []);

    // Load tipos, profile image, and requisitions
    useEffect(() => {

        const loadData = async () => {
            try {
                if (cliente.id === 0) return;

                const [tiposResponse, imageResponse] = await Promise.all([
                    !tipoCliente ? clientService.getTipos() : null,
                    !profileImage ? clientService.getImageURL(cliente.fotoPerfil) : null
                ]);

                if (tiposResponse) {
                    const tipos = tiposResponse.data.tipoCliente;
                    setTipos(tipos);
                    const currentTipo = tipos.find((tipo) => tipo.id === cliente.tipo);
                    if (currentTipo) {
                        setTipo(currentTipo.descricao);
                    }
                }

                if (imageResponse) {
                    setProfileImage(imageResponse.data.imageUrl);
                }

                const requisicoesResponse = await clientService.getRequisicoes(cliente.id);
                if (requisicoesResponse) {
                    const requisicoes: RequisicoesData[] = requisicoesResponse.data.map(element => ({
                        id: element.id,
                        titulo: element.titulo,
                        descricao: element.descricao,
                        dataRegistro: element.dataRegistro,
                        status: element.status,
                        prioridade: element.prioridade,
                        pacote: element.pacote,
                        tipoProjeto: element.tipoProjeto,
                        m2Interno: element.m2Interno,
                        m2Edificacao: element.m2Edificacao,
                        m2Terreno: element.m2Terreno,
                        proporcao: element.proporcao,
                        ambientes: JSON.parse(element.ambientes),
                        servicosAdicionais: JSON.parse(element.servicosAdicionais),
                        iluminacoes: JSON.parse(element.iluminacoes),
                        renderizador: element.renderizador,
                        valor: element.valor
                    }));
                    setRequisitions(requisicoes);
                }

            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();

    }, [cliente.id, cliente.tipo, cliente.fotoPerfil, tipoCliente, profileImage, requisitions]);

    return (
        <section className="pb-12.5 pt-10 lg:pb-25 lg:pt-25 xl:pb-10 xl:pt-25">
            <div className="relative z-1 mx-auto max-w-c-1390 px-7.5 pb-7.5">
                {loading ? (
                    <div className="w-full mx-auto -mt-40">
                        <Loader />
                    </div>
                ) : (
                    <div>
                        <div className="w-full mx-auto p-6 animate-fadeIn">
                            {/* Profile Section */}
                            <div className="flex items-center gap-4 mb-6 transition-shadow duration-300 p-4 rounded-lg">
                                <div className="relative group">
                                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                                        {profileImage ? (
                                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-white">
                                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                        <label className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                                            <Upload className="w-8 h-8 text-white" />
                                            <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                        </label>
                                    </div>
                                </div>
                                <div className="transform transition-all duration-300 hover:translate-x-2">
                                    <h2 className="text-xl font-medium">{cliente.nome}</h2>
                                    <p className="text-gray-600">{tipoCliente}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                                <div className="overflow-x-auto rounded-lg border border-gray-200">
                                    <table className="w-full border-collapse bg-white">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="p-4 text-left text-sm font-medium text-gray-800">ID</th>
                                                <th className="p-4 text-left text-sm font-medium text-gray-600">Título</th>
                                                <th className="p-4 text-left text-sm font-medium text-gray-600">Data de Criação</th>
                                                <th className="p-4 text-left text-sm font-medium text-gray-600">Status</th>
                                                <th className="p-4 text-left text-sm font-medium text-gray-600">Investimento</th>
                                                <th className="p-4 text-left text-sm font-medium text-gray-600"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { requisitions.map((req, index) => (
                                                <tr
                                                    key={req.id}
                                                    onClick={() => openRequisition(index)}
                                                    className="border-t cursor-pointer border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                                                >
                                                    <td className="p-4">{req.id}</td>
                                                    <td className="p-4">{req.titulo}</td>
                                                    <td className="p-4">{req.dataRegistro.toString().substring(0, 10)}</td>
                                                    <td className="p-4">
                                                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(req.status)}`}>
                                                            {req.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`px-3`}>
                                                            {req.valor}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            imageRendering="optimizeQuality"
                                                            fill="none"
                                                            width={22}
                                                            height={22}
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            viewBox="0 0 312 511.42"
                                                        >
                                                            <path fill="lightgray" d="M35.54 0 312 252.82 29.84 511.42 0 478.8l246.54-225.94L5.7 32.62z" />
                                                        </svg>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ClientPage;