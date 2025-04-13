"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Entreprises() {
    // =========== State Management ===========
    // Core data states
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    // Modal and editing states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [editFormData, setEditFormData] = useState({
        entreprises: '',
        phone: '',
        email: '',
        web: ''
    });
    
    // Search functionality state
    const [searchTerm, setSearchTerm] = useState('');

    // =========== Data Fetching ===========
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://fakerapi.it/api/v2/custom?_quantity=50&_locale=fr_FR&entreprises=company_name&phone=phone&email=company_email&web=website'
                );
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // =========== Event Handlers ===========
    // Handle delete operation
    const handleDelete = (index, e) => {
        e.stopPropagation();
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
    };

    // Handle edit operation
    const handleEdit = (item, e) => {
        e.stopPropagation();
        setCurrentItem(item);
        setEditFormData({
            entreprises: item.entreprises,
            phone: item.phone,
            email: item.email,
            web: item.web
        });
        setIsModalOpen(true);
    };

    // Modal control handlers
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
    };

    // Form input change handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Save changes handler
    const handleSaveChanges = () => {
        const updatedData = data.map(item => 
            item === currentItem ? { ...item, ...editFormData } : item
        );
        setData(updatedData);
        setIsModalOpen(false);
        setCurrentItem(null);
    };

    // Pagination handler
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // =========== Helper Functions ===========
    // Filter data based on search term
    const filteredData = data.filter(item =>
        item.entreprises.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.ville && item.ville.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Get current items for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // =========== Loading State ===========
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // =========== Render Functions ===========
    // Render mobile card view
    const renderCardView = () => (
        <div className="grid grid-cols-1 gap-4 sm:hidden">
            {currentItems.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <div className="mb-2">
                        <h3 className="font-semibold">{item.entreprises}</h3>
                        <p className="text-gray-600">Tél: {item.phone}</p>
                        <p className="text-gray-600">Email: {item.email}</p>
                        <p className="text-gray-600">Web: {item.web}</p>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={(e) => handleEdit(item, e)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Modifier
                        </button>
                        <button
                            onClick={(e) => handleDelete(index, e)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="p-2 md:p-4 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-[#070c2c] text-xl md:text-2xl font-bold">
                    Liste des Entreprises
                </h1>
                
                <div className="w-1/3">
                    <input 
                        type="text"
                        placeholder="Rechercher..."
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {renderCardView()}

            <div className="hidden sm:block overflow-x-auto rounded-xl shadow-lg border border-gray-100 bg-white">
                <table className="w-full">
                    <thead className="bg-[#070c2c] text-white uppercase">
                        <tr className="text-white-600">
                            <th className="px-6 py-4 text-left font-semibold">Entreprise</th>
                            <th className="px-6 py-4 text-left font-semibold">Téléphone</th>
                            <th className="px-6 py-4 text-left font-semibold">Email</th>
                            <th className="px-6 py-4 text-left font-semibold">Web</th>
                            <th className="px-6 py-4 text-right font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentItems.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">{item.entreprises}</td>
                                <td className="px-6 py-4">{item.phone}</td>
                                <td className="px-6 py-4">{item.email}</td>
                                <td className="px-6 py-4">{item.web}</td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={(e) => handleEdit(item, e)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(index, e)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredData.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">
                    Aucun résultat trouvé
                </div>
            )}

            {filteredData.length > 0 && (
                <div className="mt-6 flex justify-center space-x-2">
                    {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => paginate(i + 1)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                currentPage === i + 1
                                    ? 'bg-[#070c2c] text-white shadow-md'
                                    : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

            {isModalOpen && currentItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-xl shadow-xl w-96 max-w-md">
                        <h2 className="text-xl font-bold mb-6">Modifier l'entreprise</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="entreprises"
                                value={editFormData.entreprises}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nom de l'entreprise"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={editFormData.phone}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Téléphone"
                            />
                            <input
                                type="email"
                                name="email"
                                value={editFormData.email}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                name="web"
                                value={editFormData.web}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Site web"
                            />
                        </div>
                        <div className="mt-8 flex justify-end space-x-3">
                            <button
                                onClick={handleCloseModal}
                                className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleSaveChanges}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
