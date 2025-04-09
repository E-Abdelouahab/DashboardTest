"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function FormateursPage() {
  const [formateurs, setFormateurs] = useState([]);
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=30").then((res) => {
      const formatted = res.data.results.map((user) => ({
        name: `${user.name.first} ${user.name.last}`,
        phone: user.phone,
        email: user.email,
        sector: user.location.city,
        img: user.picture.thumbnail,
      }));
      setFormateurs(formatted);
    });
  }, []);

  const filtered = formateurs.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.email.toLowerCase().includes(search.toLowerCase());
    const matchSector =
      sectorFilter === "all" || f.sector === sectorFilter;
    return matchSearch && matchSector;
  });

  const sectors = ["all", ...new Set(formateurs.map((f) => f.sector))];
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="min-h-screen p-0" style={{ backgroundColor: "#f0f3ff" }}>
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
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {sectors.map((s, i) => (
            <option key={i} value={s}>
              {s === "all" ? "Tous les secteurs" : s}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200 text-gray-700 uppercase">
            <tr>
              <th className="px-6 py-3">Photo</th>
              <th className="px-6 py-3">Nom</th>
              <th className="px-6 py-3">Téléphone</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Secteur</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((f, i) => (
              <tr key={i} className="border-b hover:bg-gray-100 transition">
                <td className="px-6 py-4">
                  <img src={f.img} alt="avatar" className="rounded-full w-10 h-10" />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">{f.name}</td>
                <td className="px-6 py-4">{f.phone}</td>
                <td className="px-6 py-4">{f.email}</td>
                <td className="px-6 py-4">{f.sector}</td>
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
    </div>
  );
}
