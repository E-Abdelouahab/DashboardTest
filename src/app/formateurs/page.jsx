"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function FormateursPage() {
  const [formateurs, setFormateurs] = useState([]);
  const [search, setSearch] = useState("");
  const [villeFilter, setVilleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [currentFormateur, setCurrentFormateur] = useState(null);
  const [updatedFormateur, setUpdatedFormateur] = useState({
    name: "",
    phone: "",
    email: "",
    ville: "",
    img: "",
  });

  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=30").then((res) => {
      const formatted = res.data.results.map((user) => ({
        name: `${user.name.first} ${user.name.last}`,
        phone: user.phone,
        email: user.email,
        ville: user.location.city,
        img: user.picture.thumbnail,
      }));
      setFormateurs(formatted);
    });
  }, []);

  const filtered = formateurs.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.email.toLowerCase().includes(search.toLowerCase());
    const matchvill =
      villeFilter === "all" || f.ville === villeFilter;
    return matchSearch && matchvill;
  });

  const villes = ["all", ...new Set(formateurs.map((f) => f.ville))];
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const openEditModal = (formateur) => {
    setCurrentFormateur(formateur);
    setUpdatedFormateur({ ...formateur });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFormateur((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormateurs = formateurs.map((f) =>
      f === currentFormateur ? updatedFormateur : f
    );
    setFormateurs(updatedFormateurs);
    setShowModal(false);
  };

  const handleDelete = (formateurToDelete) => {
    const confirmDelete = window.confirm(`⚠️ Êtes-vous sûr de vouloir supprimer ${formateurToDelete.name} ?`);
    if (confirmDelete) {
      const updatedFormateurs = formateurs.filter(
        (f) => f !== formateurToDelete
      );
      setFormateurs(updatedFormateurs);
    }
  };

  return (
    <div className="min-h-screen p-3" style={{ backgroundColor: "#f0f3ff" }}>
      <h1 className="text-3xl font-bold mb-6 text-[#070c2c] mt-0">Liste des formateurs</h1>

      <div className="flex flex-wrap gap-4 items-center mb-4">
        <input
          type="text"
          placeholder="🔍 Rechercher par nom ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

<select
  value={villeFilter}
  onChange={(e) => setVilleFilter(e.target.value)}
  className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-purple-500"
>
  {villes.map((s, i) => (
            <option key={i} value={s}>
              {s === "all" ? "Tous les Villes" : s}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-white-200 text-gray-700 uppercase">
            <tr>
              <th className="px-6 py-3 text-center">Photo</th>
              <th className="px-6 py-3 text-center">Nom</th>
              <th className="px-6 py-3 text-center">Téléphone</th>
              <th className="px-6 py-3 text-center">Email</th>
              <th className="px-6 py-3 text-center">Ville</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((f, i) => (
              <tr key={i} className="border-b hover:bg-gray-100 transition">
                <td className="px-6 py-4">
                  <img src={f.img} alt="avatar" className="rounded-full w-10 h-10 container mx-auto justify-center" />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 text-center">{f.name}</td>
                <td className="px-6 py-4 text-center">{f.phone}</td>
                <td className="px-6 py-4 text-center">{f.email}</td>
                <td className="px-6 py-4 text-center">{f.ville
        
                }</td>
                <td className="px-6 py-4 flex gap-2 container mx-auto justify-center">
                {/* Edit Button */}
                <button
                  onClick={() => openEditModal(f)}
                  className="p-2 rounded-full border border-[#070c2c] text-[#070c2c] bg-white hover:bg-[#3d5be3] hover:text-white shadow transition-all duration-300"
                  title="Modifier"
                >
                  ✏️
                </button>
              
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(f)}
                  className="p-2 rounded-full border border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white shadow transition-all duration-300"
                  title="Supprimer"
                >
                  🗑️
                </button>
              </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => handlePageChange(n)}
            className={`mx-1 px-4 py-2 rounded-lg border transition ${
              currentPage === n
                ? "bg-[#070c2c] text-white"
                : "bg-white text-[#070c2c] border-[#070c2c] hover:bg-[#070c2c] hover:text-white"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Edit Modal */}
    {showModal && (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
      <div className="bg-gradient-to-br from-white via-[#f0f3ff] to-[#e4e9ff] p-6 rounded-2xl shadow-2xl w-[90%] max-w-md border border-[#d1d5db]">
        <h2 className="text-2xl font-bold text-[#070c2c] mb-6 text-center">✏️ Modifier Formateur</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="name"
              value={updatedFormateur.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#3d5be3]"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Téléphone</label>
            <input
              type="text"
              name="phone"
              value={updatedFormateur.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#3d5be3]"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={updatedFormateur.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#3d5be3]"
            />
          </div>
          <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">Ville</label>
      <input
        type="text"
        name="ville"
        value={updatedFormateur.ville}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#3d5be3]"
      />
    </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-200 text-[#070c2c] rounded-lg border border-gray-400 hover:bg-gray-300 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#070c2c] text-white rounded-lg border border-[#070c2c] hover:bg-[#3d5be3] transition"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
  
    </div>
  );
}
