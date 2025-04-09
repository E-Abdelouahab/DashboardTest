'use client';

import { ChevronDown, LogOut, Pencil } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function TopBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // No typing here in JS

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center w-full px-6 py-4 bg-white border-b border-gray-100">
      {/* Left: Greeting */}
      <div className="m-4 text-lg font-medium text-gray-800">
        Bonjour <span className="italic text-[#3B5EFF]">Badre Zouhir</span>
      </div>

      {/* Right: Profile + Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <div
          className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 p-[1px] rounded-full cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
          <img src="/avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full object-cover mr-3" />

            <div className="text-sm leading-tight">
              <div className="font-semibold text-gray-800">Badre Zouhir</div>
              <div className="text-gray-500 text-xs">badre@scenius-lab.com</div>
            </div>
            <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
          </div>
        </div>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
            <ul className="py-2">
              <li>
                <button
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => alert('Edit Profile clicked')}
                >
                  <Pencil className="w-4 h-4 mr-2" /> Edit Profile
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  onClick={() => alert('Logging out...')}
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
