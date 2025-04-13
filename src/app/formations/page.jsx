"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Formations() {
    // State variables to manage the component's data, loading status, and modal state
    const [data, setData] = useState([]);  // Stores the list of data items
    const [loading, setLoading] = useState(true);  // Tracks the loading state
    const [currentPage, setCurrentPage] = useState(1);  // Tracks the current page for pagination
    const [isModalOpen, setIsModalOpen] = useState(false);  // Determines if the modal is open
    const [currentItem, setCurrentItem] = useState(null);  // Stores the current item being edited
    const [editFormData, setEditFormData] = useState({  // Stores the data of the item being edited
        name: '',
        phone: '',
        web: ''
    });
    const [searchTerm, setSearchTerm] = useState('');  // Used for searching/filtering the list
    const itemsPerPage = 10;  // Number of items per page for pagination

    // Fetch data from the API when the component is mounted
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching mock data from the faker API
                const response = await axios.get('https://fakerapi.it/api/v2/custom?_quantity=50&_locale=fr_FR&name=name&phone=phone&web=website&date=dateTime');
                setData(response.data.data);  // Set the fetched data to the state
                setLoading(false);  // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);  // Log any error
                setLoading(false);  // Set loading to false in case of an error
            }
        };

        fetchData();  // Call the function to fetch the data
    }, []);  // Empty dependency array ensures this effect runs only once (on mount)

    // Handles deletion of an item
    const handleDelete = (index, e) => {
        e.stopPropagation();  // Prevent the click event from propagating
        const newData = data.filter((_, i) => i !== index);  // Filter out the deleted item
        setData(newData);  // Update the state with the new filtered data
    };

    // Handles opening the modal and setting the current item to edit
    const handleEdit = (item, e) => {
        e.stopPropagation();  // Prevent the click event from propagating
        setCurrentItem(item);  // Set the current item for editing
        setEditFormData({
            name: item.name,
            phone: item.phone,
            web: item.web
        });  // Set initial form data for editing
        setIsModalOpen(true);  // Open the modal
    };

    // Closes the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);  // Close the modal
        setCurrentItem(null);  // Reset the current item
    };

    // Handles changes to the form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value  // Update the specific form field with the new value
        }));
    };

    // Saves the changes to the edited item
    const handleSaveChanges = () => {
        const updatedData = data.map(item => {
            if (item === currentItem) {
                return { ...item, ...editFormData };  // Merge the edited data into the item
            }
            return item;  // Return the item unmodified if it's not the current item
        });
        setData(updatedData);  // Update the state with the modified data
        setIsModalOpen(false);  // Close the modal
        setCurrentItem(null);  // Reset the current item
    };

    // Handles pagination by setting the current page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Filters data based on the search term (case-insensitive)
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate the current items based on the page number and items per page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Loading spinner if data is being fetched
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-screen-xl mx-auto">
            {/* Page title */}
            <h1 className="text-[#070c2c] text-xl md:text-2xl font-bold mb-4 md:mb-6">
                Liste des Formations
            </h1>
            {/* Search input for filtering the list */}
            <div className="mb-4 flex flex-col sm:flex-row justify-center gap-2">
                <input
                    type="text"
                    placeholder="Rechercher par nom..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}  // Update search term on input change
                    className="w-full sm:max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Cards view for mobile devices */}
            <div className="space-y-4 md:hidden">
                {currentItems.map((item, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4 space-y-2">
                        <div><span className="font-semibold">Name:</span> {item.name}</div>
                        <div><span className="font-semibold">Phone:</span> {item.phone}</div>
                        <div><span className="font-semibold">Website:</span> {item.web}</div>
                        <div><span className="font-semibold">Date:</span> {new Date(item.date.date).toLocaleString()}</div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <button
                                onClick={(e) => handleEdit(item, e)}  // Open the edit modal
                                className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={(e) => handleDelete(index, e)}  // Delete the item
                                className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table view for larger screens (md+) */}
            <div className="hidden md:block overflow-x-auto mt-6">
                <table className="min-w-full bg-white shadow-md rounded-lg text-sm">
                    <thead className="bg-[#070c2c] text-white uppercase">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold">Name</th>
                            <th className="px-4 py-3 text-left font-semibold">Phone</th>
                            <th className="px-4 py-3 text-left font-semibold">Website</th>
                            <th className="px-4 py-3 text-left font-semibold">Date</th>
                            <th className="px-4 py-3 text-left font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((item, index) => (
                            <tr key={index} className="transform transition-all duration-200 ease-in-out hover:scale-[1.01] hover:bg-gray-50">
                                <td className="px-4 py-3">{item.name}</td>
                                <td className="px-4 py-3">{item.phone}</td>
                                <td className="px-4 py-3">{item.web}</td>
                                <td className="px-4 py-3">{new Date(item.date.date).toLocaleString()}</td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={(e) => handleEdit(item, e)}  // Open the edit modal
                                            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(index, e)}  // Delete the item
                                            className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination controls */}
            <div className="mt-6 flex justify-center flex-wrap gap-2">
                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}  // Set the current page
                        className={`px-3 py-2 text-sm rounded-md min-w-[36px] transition-colors duration-200 ${
                            currentPage === index + 1
                                ? 'bg-[#070c2c] text-white'
                                : 'bg-white border border-[#070c2c] text-[#070c2c] hover:bg-[#070c2c] hover:text-white'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Edit Modal */}
            {isModalOpen && currentItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md sm:max-w-lg md:max-w-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg sm:text-xl font-medium">Edit Item</h3>
                            <button
                                onClick={handleCloseModal}  // Close the modal
                                className="text-gray-500 hover:text-gray-700"
                                aria-label="Close modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal form to edit the current item */}
                        <div className="space-y-4">
                            {['name', 'phone', 'web'].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
                                    <input
                                        type="text"
                                        name={field}
                                        value={editFormData[field]}
                                        onChange={handleInputChange}  // Handle input change for editing
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="text"
                                    disabled
                                    value={new Date(currentItem.date.date).toLocaleString()}  // Show the date of the current item
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={handleCloseModal}  // Close the modal without saving
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveChanges}  // Save the changes made to the item
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
