"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Entreprises() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [editFormData, setEditFormData] = useState({
        entreprises: '',
        ville: '',
        pays: '',
        phone: '',
        email: '',
        web: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://fakerapi.it/api/v2/custom?_quantity=50&_locale=fr_FR&entreprises=company_name&ville=city&pays=country&phone=phone&email=company_email&web=website');
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = (index, e) => {
        e.stopPropagation();
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
    };

    const handleEdit = (item, e) => {
        e.stopPropagation();
        setCurrentItem(item);
        setEditFormData({
            entreprises: item.entreprises,
            ville: item.ville,
            pays: item.pays,
            phone: item.phone,
            email: item.email,
            web: item.web
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveChanges = () => {
        const updatedData = data.map(item => {
            if (item === currentItem) {
                return { ...item, ...editFormData };
            }
            return item;
        });
        
        setData(updatedData);
        setIsModalOpen(false);
        setCurrentItem(null);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    // Filter data based on search term (company name or city)
    const filteredData = data.filter(item =>
        item.entreprises.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ville.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get current items from filtered data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Liste des Entreprises</h1>
            
            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Rechercher par nom d'entreprise ou ville..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entreprise</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ville</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site Web</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.entreprises}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.ville}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.pays}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 truncate max-w-xs">
                                    <a href={`mailto:${item.email}`} className="hover:underline">{item.email}</a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 truncate max-w-xs">
                                    <a href={item.web} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.web}</a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm flex flex-wrap gap-2">
                                    <button
                                        onClick={(e) => handleEdit(item, e)}
                                        className="touch-manipulation min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md 
                                        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        style={{ WebkitTapHighlightColor: 'transparent' }}
                                        aria-label="Edit item"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e) => handleDelete(index, e)}
                                        className="touch-manipulation min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md 
                                        hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                        style={{ WebkitTapHighlightColor: 'transparent' }}
                                        aria-label="Delete item"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty state message */}
            {filteredData.length === 0 && !loading && (
                <div className="text-center py-10">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune entreprise trouvée</h3>
                    <p className="mt-1 text-sm text-gray-500">Essayez de modifier votre recherche ou d'actualiser la page.</p>
                </div>
            )}

            {/* Pagination */}
            {filteredData.length > 0 && (
                <div className="mt-4 flex justify-center flex-wrap">
                    {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`mx-1 px-4 py-2 border rounded-md mb-2 min-h-[44px] min-w-[44px] ${
                                currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {isModalOpen && currentItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Modifier l'entreprise</h3>
                            <button 
                                onClick={handleCloseModal}
                                className="touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-500 hover:text-gray-700"
                                aria-label="Close modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-entreprise">Nom de l'entreprise</label>
                                <input
                                    id="edit-entreprise"
                                    type="text"
                                    name="entreprises"
                                    value={editFormData.entreprises}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-ville">Ville</label>
                                <input
                                    id="edit-ville"
                                    type="text"
                                    name="ville"
                                    value={editFormData.ville}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-pays">Pays</label>
                                <input
                                    id="edit-pays"
                                    type="text"
                                    name="pays"
                                    value={editFormData.pays}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-phone">Téléphone</label>
                                <input
                                    id="edit-phone"
                                    type="text"
                                    name="phone"
                                    value={editFormData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-email">Email</label>
                                <input
                                    id="edit-email"
                                    type="email"
                                    name="email"
                                    value={editFormData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-web">Site Web</label>
                                <input
                                    id="edit-web"
                                    type="text"
                                    name="web"
                                    value={editFormData.web}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={handleCloseModal}
                                className="touch-manipulation min-h-[44px] min-w-[44px] px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleSaveChanges}
                                className="touch-manipulation min-h-[44px] min-w-[44px] px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}