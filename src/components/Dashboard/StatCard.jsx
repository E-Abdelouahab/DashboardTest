"use client"
import { useState, useRef, useEffect } from "react";
import { Calendar, TrendingUp, TrendingDown, ChevronDown, Check } from "lucide-react";

export default function StatCard({ label, value, percentage, color }) {
  const [period, setPeriod] = useState("ce mois ci");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get last 12 months
  const getLastMonths = () => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
      months.push(monthName);
    }
    return months;
  };

  const periods = getLastMonths();

  // Generate dynamic data for each period
  const data = periods.reduce((acc, month, index) => {
    acc[month] = {
      value: typeof value === 'string' ? 
        String(Math.floor(parseInt(value.replace(/\s+/g, '')) * (1 - index * 0.05))).replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 
        Math.floor(value * (1 - index * 0.05)),
      percentage: Math.floor(percentage * (1 - index * 0.1))
    };
    return acc;
  }, {});

  const currentValue = data[period]?.value || value;
  const currentPercentage = data[period]?.percentage || percentage;

  const isPositive = currentPercentage > 0;

  // Rest of your existing code remains the same until the dropdown content
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const selectPeriod = (selected) => {
    setPeriod(selected);
    setIsDropdownOpen(false);
  };

  const gradientColor = "from-white-50 to-white-100";
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
            <span className="text-sm font-medium mr-1">{period}</span>
            <div className={`ml-1 p-1 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-all duration-200 ${isDropdownOpen ? 'bg-blue-100' : ''}`}>
              <ChevronDown className={`h-3 w-3 text-gray-500 group-hover:text-blue-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-blue-500' : ''}`} />
            </div>
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-2xl shadow-xl bg-white border border-gray-100 z-50">
              <div className="pt-3 pb-2 px-2">
                <div className="px-2 mb-2">

                </div>
                
                <div className="max-h-64 overflow-y-auto">
                  {periods.map((monthPeriod) => (
                    <button
                      key={monthPeriod}
                      onClick={() => selectPeriod(monthPeriod)}
                      className={`w-full text-left px-3 py-2.5 text-sm rounded-xl transition-all duration-200 my-1 flex items-center justify-between ${
                        period === monthPeriod 
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md" 
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-lg mr-2 flex items-center justify-center ${
                          period === monthPeriod ? "bg-white/20" : "bg-gray-100"
                        }`}>
                          <Calendar className={`h-4 w-4 ${period === monthPeriod ? "text-white" : "text-gray-500"}`} />
                        </div>
                        <span>{monthPeriod}</span>
                      </div>
                      {period === monthPeriod && (
                        <div className="bg-white rounded-full p-0.5">
                          <Check className="h-3 w-3 text-blue-500" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h2 className="text-4xl font-bold text-gray-800">{currentValue}</h2>
          <div className="flex items-center space-x-2 mt-2">
            <span 
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {isPositive ? 
                <TrendingUp className="w-3 h-3 mr-1" /> : 
                <TrendingDown className="w-3 h-3 mr-1" />
              }
              {isPositive ? `+${Math.abs(currentPercentage)}%` : `-${Math.abs(currentPercentage)}%`}
            </span>
          </div>
        </div>
        
       
      </div>
    </div>
  );
}
