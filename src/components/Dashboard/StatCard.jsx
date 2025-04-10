"use client";
import { useRef, useEffect, useState } from "react";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Check,
} from "lucide-react";

export default function StatCard({
  label,
  value,
  percentage,
  color,
  period,
  onPeriodChange,
}) {
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isPositive = (percentage || 0) > 0;

  // Human-readable to API key mapping
  const periodKeyMapping = {
    "ce mois ci": "cemois",
    "mois dernier": "moisdernier",
    "cette année": "cetteannee",
    "année dernière": "anneederniere",
  };

  // Reverse mapping: API key to human-readable label
  const keyToLabelMapping = Object.entries(periodKeyMapping).reduce(
    (acc, [label, key]) => {
      acc[key] = label;
      return acc;
    },
    {}
  );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const selectPeriod = (selectedKey) => {
    setIsDropdownOpen(false);
    if (onPeriodChange) {
      onPeriodChange(selectedKey);
    }
  };

  const accentColor = isPositive ? "bg-green-500" : "bg-red-500";
  const borderColor = color || (isPositive ? "border-green-300" : "border-red-300");

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 w-full relative ${borderColor} border`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${accentColor}`}></div>
          <p className="text-sm font-medium text-gray-700">{label}</p>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center bg-white text-gray-700 py-2 pl-3 pr-2 rounded-xl shadow-md transition-all duration-200 border border-gray-200 hover:shadow-lg hover:border-blue-200 group"
          >
            <div className="bg-blue-50 p-1 rounded-lg mr-2">
              <Calendar className="h-4 w-4 text-blue-500" />
            </div>
            <span className="text-sm font-medium mr-1 capitalize">
              {keyToLabelMapping[period] || period}
            </span>
            <div
              className={`ml-1 p-1 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-all duration-200 ${
                isDropdownOpen ? "bg-blue-100" : ""
              }`}
            >
              <ChevronDown
                className={`h-3 w-3 text-gray-500 group-hover:text-blue-500 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180 text-blue-500" : ""
                }`}
              />
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-2xl shadow-xl bg-white border border-gray-100 z-50">
              <div className="pt-3 pb-2 px-2 max-h-64 overflow-y-auto">
                {Object.entries(periodKeyMapping).map(([label, key]) => (
                  <button
                    key={key}
                    onClick={() => selectPeriod(key)}
                    className={`w-full text-left px-3 py-2.5 text-sm rounded-xl transition-all duration-200 my-1 flex items-center justify-between ${
                      period === key
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-lg mr-2 flex items-center justify-center ${
                          period === key ? "bg-white/20" : "bg-gray-100"
                        }`}
                      >
                        <Calendar
                          className={`h-4 w-4 ${
                            period === key ? "text-white" : "text-gray-500"
                          }`}
                        />
                      </div>
                      <span className="capitalize">{label}</span>
                    </div>
                    {period === key && (
                      <div className="bg-white rounded-full p-0.5">
                        <Check className="h-3 w-3 text-blue-500" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h2 className="text-4xl font-bold text-gray-800">{value}</h2>
          <div className="flex items-center space-x-2 mt-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                isPositive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {isPositive
                ? `+${Math.abs(percentage)}%`
                : `-${Math.abs(percentage)}%`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
