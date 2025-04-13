"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function FormateursPage() {
  // États principaux
  const [formateurs, setFormateurs] = useState([]);
  const [search, setSearch] = useState("");
  const [villeFilter, setVilleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  // États pour le modal de modification
  const [showModal, setShowModal] = useState(false);
  const [currentFormateur, setCurrentFormateur] = useState(null);
  const [updatedFormateur, setUpdatedFormateur] = useState({
    name: "",
    phone: "",
    email: "",
    ville: "",
    img: "",
  });

  // Récupération des données depuis l'API externe
  useEffect(() => {
    setLoading(true);
    axios.get("https://randomuser.me/api/?results=30").then((res) => {
      const formatted = res.data.results.map((user) => ({
        name: `${user.name.first} ${user.name.last}`,
        phone: user.phone,
        email: user.email,
        ville: user.location.city,
        img: user.picture.thumbnail,
      }));
      setFormateurs(formatted);
      setLoading(false);
    });
  }, []);

  // Affichage du loader pendant le chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Filtrage par recherche et ville
  const filtered = formateurs.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.email.toLowerCase().includes(search.toLowerCase());
    const matchVille = villeFilter === "all" || f.ville === villeFilter;
    return matchSearch && matchVille;
  });

  // Calcul des villes uniques pour le filtre
  const villes = ["all", ...new Set(formateurs.map((f) => f.ville))];
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Changement de page
  const handlePageChange = (page) => setCurrentPage(page);

  // Ouvre le modal avec les infos à modifier
  const openEditModal = (formateur) => {
    setCurrentFormateur(formateur);
    setUpdatedFormateur({ ...formateur });
    setShowModal(true);
  };

  // Gère les changements dans le formulaire de modification
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFormateur((prev) => ({ ...prev, [name]: value }));
  };

  // Sauvegarde les modifications
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormateurs = formateurs.map((f) =>
      f === currentFormateur ? updatedFormateur : f
    );
    setFormateurs(updatedFormateurs);
    setShowModal(false);
  };

  // Supprime un formateur avec confirmation
  const handleDelete = (formateurToDelete) => {
    const confirmDelete = window.confirm(
      `\u26A0\uFE0F \u00CAtes-vous s\u00FBr de vouloir supprimer ${formateurToDelete.name} ?`
    );
    if (confirmDelete) {
      const updatedFormateurs = formateurs.filter((f) => f !== formateurToDelete);
      setFormateurs(updatedFormateurs);
    }
  };

  return (
    <div className="min-h-screen p-3" style={{ backgroundColor: "#f0f3ff" }}>
      {/* Titre */}
      <h1 className="text-[#070c2c] text-xl md:text-2xl font-bold mb-4 md:mb-6">
        Liste des formateurs
      </h1>

      {/* Filtres de recherche et de ville */}
      <div className="mb-4 flex flex-col sm:flex-row justify-center gap-2 ">
        <input
          type="text"
          placeholder="Rechercher par nom ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 "
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

      {/* Affichage mobile en cartes */}
      <div className="block sm:hidden">
        {paginated.map((f, i) => (
          <div key={i} className="flex flex-col items-center mb-4 p-4 bg-white rounded-lg shadow-md">
            <img src={f.img} alt="avatar" className="w-24 h-24 rounded-full mb-2" />
            <h2 className="text-lg font-semibold text-gray-900">{f.name}</h2>
            <p className="text-sm text-gray-600">Téléphone: {f.phone}</p>
            <p className="text-sm text-gray-600">Email: {f.email}</p>
            <p className="text-sm text-gray-600">Ville: {f.ville}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => openEditModal(f)}
                className="p-2 rounded-full border border-[#070c2c] text-[#070c2c] bg-white hover:bg-[#3d5be3] hover:text-white shadow transition-all duration-300"
                title="Modifier"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(f)}
                className="p-2 rounded-full border border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white shadow transition-all duration-300"
                title="Supprimer"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Affichage bureau en tableau */}
      <div className="hidden sm:block overflow-x-auto rounded-2xl shadow bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#070c2c] text-white uppercase">
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
              <tr
                key={i}
                className="border-b hover:scale-[1.01] hover:bg-gray-50 transition-all duration-200 ease-in-out"
              >
                <td className="px-6 py-4">
                  <img
                    src={f.img}
                    alt="avatar"
                    className="rounded-full w-10 h-10 container mx-auto justify-center"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 text-center">
                  {f.name}
                </td>
                <td className="px-6 py-4 text-center">{f.phone}</td>
                <td className="px-6 py-4 text-center">{f.email}</td>
                <td className="px-6 py-4 text-center">{f.ville}</td>
                <td className="px-6 py-4 flex gap-2 container mx-auto justify-center">
                  <button
                    onClick={() => openEditModal(f)}
                    className="p-2 rounded-full border border-[#070c2c] text-[#070c2c] bg-white hover:bg-[#3d5be3] hover:text-white shadow transition-all duration-300"
                    title="Modifier"
                  >
                    ✏️
                  </button>
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

      {/* Pagination améliorée */}
      <div className="flex justify-center mt-6">
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

      {/* Modal de modification */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
          <div className="bg-gradient-to-br from-white via-[#f0f3ff] to-[#e4e9ff] p-6 rounded-2xl shadow-2xl w-[90%] max-w-md border border-[#d1d5db]">
            <h2 className="text-2xl font-bold text-[#070c2c] mb-6 text-center">
              ✏️ Modifier Formateur
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  name="name"
                  value={updatedFormateur.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#3d5be3]"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Téléphone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={updatedFormateur.phone}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#3d5be3]"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={updatedFormateur.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#3d5be3]"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Ville
                </label>
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
