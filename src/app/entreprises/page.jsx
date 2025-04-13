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
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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

    // Get total pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
                            <th className="px-6 py-4 text-center font-semibold">Entreprise</th>
                            <th className="px-6 py-4 text-center font-semibold">Téléphone</th>
                            <th className="px-6 py-4 text-center font-semibold">Email</th>
                            <th className="px-6 py-4 text-center font-semibold">Web</th>
                            <th className="px-6 py-4 text-center font-semibold">Actions</th>
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
                    {/* Pagination améliorée */}
                    <button
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={`mx-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                            currentPage === 1
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-white text-[#070c2c] border border-[#070c2c] hover:bg-[#070c2c] hover:text-white"
                        }`}
                    >
                        ← Précédent
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((page) => {
                            return (
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 2 && page <= currentPage + 2)
                            );
                        })
                        .reduce((acc, page, i, arr) => {
                            if (i > 0 && page - arr[i - 1] > 1) {
                                acc.push({ type: "ellipsis", key: `ellipsis-${page}` });
                            }
                            acc.push({ type: "page", number: page, key: `page-${page}` });
                            return acc;
                        }, [])
                        .map((item) =>
                            item.type === "ellipsis" ? (
                                <span key={item.key} className="px-2 py-2 text-gray-500">
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={item.key}
                                    onClick={() => handlePageChange(item.number)}
                                    className={`mx-1 px-4 py-2 rounded-lg font-medium transition transform hover:scale-105 duration-200 ${
                                        currentPage === item.number
                                            ? "bg-[#070c2c] text-white shadow-lg"
                                            : "bg-white text-[#070c2c] border border-[#070c2c] hover:bg-[#070c2c] hover:text-white"
                                    }`}
                                >
                                    {item.number}
                                </button>
                            )
                        )}

                    <button
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={`mx-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                            currentPage === totalPages
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-white text-[#070c2c] border border-[#070c2c] hover:bg-[#070c2c] hover:text-white"
                        }`}
                    >
                        Suivant →
                    </button>
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
