"use client"

import { useState, useEffect } from 'react';

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState('/');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  const handleLinkClick = (href) => {
    setActiveLink(href); // Set the active link
    setIsOpen(false); // Close the sidebar on mobile after clicking a link
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] bg-[#3d5be3] text-white p-2 rounded-full shadow-lg"
      >
        {isOpen ? '✖' : '☰'}
      </button>

      <aside
        className={`w-72 h-screen bg-[#070c2c] text-white fixed top-0 p-6 shadow-lg transition-transform transform z-[50] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static`}
      >
        <h1 className="text-2xl font-bold mb-10 flex items-center gap-2">
          <span className="text-white">🎓</span>
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            Scenius Lab
          </span>
        </h1>

        {/* Section Title */}
        <div className="text-xs font-semibold text-center text-white/80 mb-3 border border-transparent rounded-full bg-gradient-to-r from-purple-400 to-blue-500 p-[1px]">
          <div className="bg-[#070c2c] rounded-full py-1 px-4">Scenius Platform Data</div>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          {[
            { name: 'Aperçu', href: '/', icon: '📊' },
            { name: 'Formateurs', href: '/formateurs', icon: '🧑‍🏫' },
            { name: 'Entreprises', href: '/entreprises', icon: '🏢' },
            { name: 'Formations', href: '/formations', icon: '📚' },
          ].map(({ name, href, icon }) => (
            <a
              key={name}
              href={href}
              onClick={() => handleLinkClick(href)}
              className={`flex items-center justify-between gap-3 p-3 rounded-xl transition-all ${
                activeLink === href ? 'bg-[#3d5be3]' : 'bg-[#0e133a] hover:bg-[#1d2a67]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{icon}</span>
                <span>{name}</span>
              </div>
              <span className="text-white/60">›</span>
            </a>
          ))}
        </nav>

        {/* Business Manager Section */}
        <div className="text-xs font-semibold text-center text-white/80 mt-8 mb-3 border border-transparent rounded-full bg-gradient-to-r from-purple-400 to-blue-500 p-[1px]">
          <div className="bg-[#070c2c] rounded-full py-1 px-4">Scenius Business Manager</div>
        </div>

        <nav className="flex flex-col gap-2">
          {[
            { name: 'Demandes de mise en relation', href: '#', icon: '💬' },
            { name: 'Missions', href: '#', icon: '🗂' },
            { name: 'Demandes d’annulation', href: '#', icon: '❌' },
          ].map(({ name, href, icon }) => (
            <a
              key={name}
              href={href}
              onClick={() => handleLinkClick(href)}
              className={`flex items-center justify-between gap-3 p-3 rounded-xl transition-all ${
                activeLink === href ? 'bg-[#3d5be3]' : 'bg-[#0e133a] hover:bg-[#1d2a67]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{icon}</span>
                <span>{name}</span>
              </div>
              <span className="text-white/60">›</span>
            </a>
          ))}
        </nav>

        {/* Communication Section */}
        <div className="text-xs font-semibold text-center text-white/80 mt-8 mb-3 border border-transparent rounded-full bg-gradient-to-r from-purple-400 to-blue-500 p-[1px]">
          <div className="bg-[#070c2c] rounded-full py-1 px-4">Scenius Communication</div>
        </div>

        <a
          href="#"
          onClick={() => handleLinkClick('#')}
          className={`flex items-center justify-between gap-3 p-3 rounded-xl transition-all ${
            activeLink === '#' ? 'bg-[#3d5be3]' : 'bg-[#0e133a] hover:bg-[#1d2a67]'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">📰</span>
            <span>Blog</span>
          </div>
          <span className="text-white/60">›</span>
        </a>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-[40] lg:hidden"
        ></div>
      )}
    </>
  );
}
