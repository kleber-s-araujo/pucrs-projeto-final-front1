"use client"
import { Cliente, tipo } from "@/types/cliente";
import { useEffect, useState } from "react";
import { Plus, Upload, X } from 'lucide-react';
import clientService from "@/services/cliente";

const ClientPage: React.FC = () => {

    const cliente: Cliente = JSON.parse(localStorage.getItem("cliente") || "");

    const [tipoCliente, setTipo] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [requisitions, setRequisitions] = useState([
        { id: 1, title: 'Material de Escritório', status: 'Pendente', date: '2025-02-18' },
        { id: 2, title: 'Equipamento de TI', status: 'Aprovado', date: '2025-02-17' },
        { id: 3, title: 'Material de Limpeza', status: 'Em análise', date: '2025-02-16' },
        { id: 4, title: 'Equipamento de TI', status: 'Aprovado', date: '2025-02-17' },
        { id: 5, title: 'Equipamento de TI', status: 'Aprovado', date: '2025-02-17' },
        { id: 6, title: 'Equipamento de TI', status: 'Aprovado', date: '2025-02-17' }
    ]);
    const [newRequisition, setNewRequisition] = useState({ title: '', status: '', date: '' });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleImageUpload = (event) => {

        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                setProfileImage(reader.result);
                //Grava imagem no Perfil do Cliente
                const result = await clientService.updateClientImage(cliente.id, file);
                console.log(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddRequisition = () => {
        if (newRequisition.title && newRequisition.status && newRequisition.date) {
            setRequisitions([
                ...requisitions,
                { ...newRequisition, id: requisitions.length + 1 }
            ]);
            setNewRequisition({ title: '', status: '', date: '' });
            setIsDialogOpen(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pendente': return 'bg-yellow-100 text-yellow-800';
            case 'aprovado': return 'bg-green-100 text-green-800';
            case 'em análise': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const [tipos, setTipos] = useState<[tipo]>([{
        id: 1,
        lang: "",
        descricao: "",
    }]);
    useEffect(() => {

        clientService.getTipos().then((response) => {

            if (response.status == 200) {
                const tipos = response.data.tipoCliente;
                setTipos(tipos);
                setTipo( tipos.find((tipo) => tipo.id === cliente.tipo).descricao );
            }
        });

    }, []);

    return (
        <section className="pb-12.5 pt-10 lg:pb-25 lg:pt-25 xl:pb-10 xl:pt-25">
            <div className="relative z-1 mx-auto max-w-c-1390 px-7.5 pb-7.5">

                { /* <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div> */}

                <div className="w-full mx-auto p-4 animate-fadeIn">
                    {/* Profile Section */}
                    <div className="flex items-center gap-4 mb-6  transition-shadow duration-300 p-4 rounded-lg">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center transition-transform duration-300 hover:scale-105">
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


                    <div className="bg-gray-50 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                        {/* Requisitions Section 
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-medium">Minhas Requisições</h3>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-transform duration-300 hover:scale-105">
                                        <Plus className="w-5 h-5" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Nova Requisição</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <Input
                                            placeholder="Título"
                                            value={newRequisition.title}
                                            onChange={(e) => setNewRequisition({ ...newRequisition, title: e.target.value })}
                                        />
                                        <Input
                                            placeholder="Status"
                                            value={newRequisition.status}
                                            onChange={(e) => setNewRequisition({ ...newRequisition, status: e.target.value })}
                                        />
                                        <Input
                                            type="date"
                                            value={newRequisition.date}
                                            onChange={(e) => setNewRequisition({ ...newRequisition, date: e.target.value })}
                                        />
                                        <Button onClick={handleAddRequisition}>Adicionar</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        */}

                        {/* Table */}
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full border-collapse bg-white">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="p-4 text-left text-sm font-medium text-gray-600">Título</th>
                                        <th className="p-4 text-left text-sm font-medium text-gray-600">Status</th>
                                        <th className="p-4 text-left text-sm font-medium text-gray-600">Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requisitions.map((req) => (
                                        <tr
                                            key={req.id}
                                            className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <td className="p-4">{req.title}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(req.status)}`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="p-4">{new Date(req.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ClientPage;