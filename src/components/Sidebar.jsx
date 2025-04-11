"use client"

// export default function Sidebar() {
//     return (
//       <aside className="w-64 h-screen bg-[#070c2c] text-white fixed left-0 top-0 p-6 shadow-lg">
//         <h1 className="text-2xl font-bold mb-10 flex items-center gap-2">
//           <span className="text-purple-400">🎓</span>
//           <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">Scenius Lab</span>
//         </h1>
//         <nav className="flex flex-col gap-4">
//           {/* Changed hover:bg-white/10 to hover:bg-[#3d5be3] in all links */}
//           <a href="/" className="flex items-center gap-3 p-2 hover:bg-[#3d5be3] rounded-lg transition-all">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
//             <span>Aperçu</span>
//           </a>
//           <a href="/formateurs" className="flex items-center gap-3 p-2 hover:bg-[#3d5be3] rounded-lg transition-all">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
//             <span>Formateurs</span>
//           </a>
//           <a href="#" className="flex items-center gap-3 p-2 hover:bg-[#3d5be3] rounded-lg transition-all">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
//             <span>Entreprises</span>
//           </a>
//           <a href="#" className="flex items-center gap-3 p-2 hover:bg-[#3d5be3] rounded-lg transition-all">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
//             <span>Formations</span>
//           </a>
//           <a href="#" className="flex items-center gap-3 p-2 hover:bg-[#3d5be3] rounded-lg transition-all">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
//             <span>Missions</span>
//           </a>
//           <a href="#" className="flex items-center gap-3 p-2 hover:bg-[#3d5be3] rounded-lg transition-all">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"/></svg>
//             <span>Demandes</span>
//           </a>
//         </nav>
//       </aside>
//     );
//   }
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
