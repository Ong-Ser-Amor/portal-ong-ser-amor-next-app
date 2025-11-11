'use client';

import { useState, useEffect, useCallback } from 'react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import Table from '@/components/ui/Table';
import { locationService } from '@/services/location/locationService';
import { Location, LocationPaginated } from '@/interfaces/Location';
import LocationForm from '@/components/features/location/LocationForm';


export default function LocationsPage() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 10
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLocationId, setSelectedLocationId] = useState<number | undefined>(undefined);

    const loadLocations = useCallback(async () => {
        try {
            setLoading(true);
            const data = await locationService.getLocations(pagination.currentPage, pagination.itemsPerPage);

            // Verifica se os dados têm a estrutura esperada de LocationPaginated
            if (data && 'data' in data && 'meta' in data) {
                const paginatedData = data as LocationPaginated;
                setLocations(paginatedData.data ?? []);
                setPagination({
                    currentPage: paginatedData.meta.currentPage,
                    totalPages: paginatedData.meta.totalPages,
                    itemsPerPage: paginatedData.meta.itemsPerPage
                });
            } else if (Array.isArray(data)) {
                setLocations(data);
            } else {
                setLocations([]);
            }

            setError(null);
        } catch (err) {
            setError('Erro ao carregar locais');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [pagination.currentPage, pagination.itemsPerPage]);

    useEffect(() => {
        loadLocations();
    }, [loadLocations]);

    const handlePageChange = (page: number) => {
        setPagination(prev => ({
            ...prev,
            currentPage: page
        }));
    };

    const handleEdit = (id: number) => {
        setSelectedLocationId(id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este local?')) {
            try {
                setLoading(true);
                await locationService.deleteLocation(id);
                loadLocations();
            } catch (err) {
                setError('Erro ao excluir local');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    const openNewLocationModal = () => {
        setSelectedLocationId(undefined);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            header: 'ID',
            accessor: (location: Location) => (
                <div className="text-sm font-medium text-gray-900">{location.id}</div>
            ),
            align: 'left' as const
        },
        {
            header: 'Nome',
            accessor: (location: Location) => (
                <div className="text-sm font-medium text-gray-900">{location.name}</div>
            ),
            align: 'left' as const
        },
        {
            header: 'Ações',
            accessor: (location: Location) => (
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => handleEdit(location.id)}
                        className="text-blue-600 hover:text-blue-900"
                    >
                        <FiEdit size={18} />
                    </button>
                    <button
                        onClick={() => handleDelete(location.id)}
                        className="text-red-600 hover:text-red-900"
                    >
                        <FiTrash2 size={18} />
                    </button>
                </div>
            ),
            align: 'right' as const
        }
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Locais</h1>
                <button
                    onClick={openNewLocationModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
                >
                    <FiPlus className="mr-2" /> Novo Local
                </button>
            </div>

            {error && (
                <div className="p-4 mb-4 bg-red-50 text-red-700 border border-red-200 rounded-md">
                    {error}
                </div>
            )}

            <Table
                columns={columns}
                data={locations}
                keyExtractor={(location) => location.id}
                isLoading={loading}
                emptyMessage="Nenhum local encontrado"
            />

            {/* Paginação */}
            {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    <nav className="flex items-center">
                        <button
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                            className="px-3 py-1 rounded-md mr-2 bg-gray-100 disabled:opacity-50"
                        >
                            Anterior
                        </button>

                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-1 rounded-md mx-1 ${page === pagination.currentPage
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.totalPages}
                            className="px-3 py-1 rounded-md ml-2 bg-gray-100 disabled:opacity-50"
                        >
                            Próxima
                        </button>
                    </nav>
                </div>
            )}

            {/* Modal de formulário */}
            <LocationForm
                locationId={selectedLocationId}
                isOpen={isModalOpen}
                onClose={closeModal}
                onSuccess={loadLocations}
            />
        </div>
    );
}