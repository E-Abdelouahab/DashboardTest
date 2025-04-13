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
        phone: '',
        email: '',
        web: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://fakerapi.it/api/v2/custom?_quantity=50&_locale=fr_FR&entreprises=company_name&phone=phone&email=company_email&web=website');
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
        (item.ville && item.ville.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Get current items from filtered data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Card view for mobile
    const renderCardView = () => (
        <div className="grid grid-cols-1 gap-4 sm:hidden">
            {currentItems.map((item, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                    <div className="flex justify-between mb-2">
                        <h3 className="font-semibold text-lg text-black">{item.entreprises}</h3>
                        <div className="flex space-x-2">
                            <button
                                onClick={(e) => handleEdit(item, e)}
                                className="touch-manipulation rounded-full p-2 bg-blue-100 text-blue-600"
                                aria-label="Edit"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => handleDelete(index, e)}
                                className="touch-manipulation rounded-full p-2 bg-red-100 text-red-600"
                                aria-label="Delete"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="font-medium">{item.phone}</span>
                        </div>
                        
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a href={`mailto:${item.email}`} className="text-blue-600 hover:underline truncate max-w-xs">
                                {item.email}
                            </a>
                        </div>
                        
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                            <a href={item.web} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-xs">
                                {item.web}
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="p-2 md:p-4">
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Liste des Entreprises</h1>
            
            {/* Search Input */}
            <div className="mb-6">
                <div className="relative max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Rechercher par nom d'entreprise ou ville..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl 
                        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                        transition-all duration-300 shadow-sm hover:shadow-md"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Mobile Card View */}
            {renderCardView()}

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto rounded-xl shadow-lg border border-gray-100">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-[#070c2c]">
                            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Entreprise</th>
                            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Téléphone</th>
                            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Email</th>
                            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Site Web</th>
                            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentItems.map((item, index) => (
                            <tr key={index} 
                                className="transform hover:scale-[1.01] hover:bg-gray-50 
                                transition-all duration-200 ease-in-out">
                                <td className="px-4 md:px-6 py-3 md:py-5 whitespace-nowrap">
                                    <div className="text-sm font-semibold text-black">{item.entreprises}</div>
                                </td>
                                <td className="px-4 md:px-6 py-3 md:py-5 whitespace-nowrap">
                                    <div className="text-sm text-black">{item.phone}</div>
                                </td>
                                <td className="px-4 md:px-6 py-3 md:py-5 whitespace-nowrap">
                                    <a href={`mailto:${item.email}`} 
                                        className="text-sm text-black hover:text-blue-800 transition-colors 
                                        duration-200 truncate max-w-xs block hover:underline">
                                        {item.email}
                                    </a>
                                </td>
                                <td className="px-4 md:px-6 py-3 md:py-5 whitespace-nowrap">
                                    <a href={item.web} target="_blank" rel="noopener noreferrer" 
                                        className="text-sm text-black hover:text-blue-800 transition-colors 
                                        duration-200 truncate max-w-xs block hover:underline">
                                        {item.web}
                                    </a>
                                </td>
                                <td className="px-4 md:px-6 py-3 md:py-5 whitespace-nowrap">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={(e) => handleEdit(item, e)}
                                            className="transform hover:scale-105 transition-transform duration-200
                                            inline-flex items-center px-2 md:px-3 py-1 md:py-2 border border-transparent text-xs md:text-sm 
                                            leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 
                                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            <svg className="w-4 h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            <span className="hidden md:inline">Edit</span>
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(index, e)}
                                            className="transform hover:scale-105 transition-transform duration-200
                                            inline-flex items-center px-2 md:px-3 py-1 md:py-2 border border-transparent text-xs md:text-sm 
                                            leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 
                                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                            <svg className="w-4 h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            <span className="hidden md:inline">Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty state message */}
            {filteredData.length === 0 && !loading && (
                <div className="text-center py-8 md:py-10">
                    <svg className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune entreprise trouvée</h3>
                    <p className="mt-1 text-sm text-gray-500">Essayez de modifier votre recherche ou d'actualiser la page.</p>
                </div>
            )}

            {/* Pagination */}
            {filteredData.length > 0 && (
                <div className="mt-4 flex justify-center flex-wrap">
                    <div className="inline-flex overflow-x-auto max-w-full py-2 px-1">
                        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`mx-1 px-3 py-1 border rounded-md mb-2 min-h-[40px] min-w-[40px] touch-manipulation ${
                                    currentPage === index + 1 ? 'bg-[#070c2c] text-white' : 'bg-white hover:bg-gray-50'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isModalOpen && currentItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
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
                        
                        <div className="grid grid-cols-1 gap-4">
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
                        
                        <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                            <button
                                onClick={handleCloseModal}
                                className="touch-manipulation min-h-[44px] min-w-[44px] px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleSaveChanges}
                                className="touch-manipulation min-h-[44px] min-w-[44px] px-4 py-2 bg-[#070c2c] text-white rounded-md hover:bg-[#0f1645] w-full sm:w-auto"
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