'use client';

import { ChevronDown, LogOut, Pencil } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function TopBar() {
  // State to track if the dropdown menu is open
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Ref to handle clicking outside of the dropdown
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dropdown menu
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    // Add event listener for clicking outside
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener on component unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center w-full px-6 py-4 bg-white border-b border-gray-100">
      {/* Left: Greeting section */}
      <div className="m-4 text-lg font-medium text-gray-800 text-center md:text-left">
        Bonjour <span className="italic text-[#3B5EFF]">Badre Zouhir</span>
      </div>

      {/* Right: Profile section with Dropdown */}
      <div className="relative flex items-center md:ml-auto" ref={dropdownRef}>
        {/* Profile Avatar and Dropdown Trigger */}
        <div
          className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 p-[1px] rounded-full cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility
        >
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
            {/* User Avatar */}
            <img src="/avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full object-cover mr-3" />

            {/* User Info (Name and Email) */}
            <div className="hidden md:block text-sm leading-tight">
              <div className="font-semibold text-gray-800">Badre Zouhir</div>
              <div className="text-gray-500 text-xs">badre@scenius-lab.com</div>
            </div>

            {/* Dropdown Indicator */}
            <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
          </div>
        </div>

        {/* Dropdown Menu (conditionally rendered based on dropdownOpen state) */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
            {/* Dropdown items */}
            <ul className="py-2">
              {/* Edit Profile Option */}
              <li>
                <button
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => alert('Edit Profile clicked')} // Placeholder for actual edit logic
                >
                  <Pencil className="w-4 h-4 mr-2" /> Edit Profile
                </button>
              </li>
              {/* Logout Option */}
              <li>
                <button
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  onClick={() => alert('Logging out...')} // Placeholder for actual logout logic
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
