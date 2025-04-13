'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Dropdown component for selecting period or subfilter
const Dropdown = ({ selected, options, onSelect, label }) => (
  <div className="relative">
    <button
      onClick={() => onSelect(prev => !prev)}
      className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 flex items-center"
    >
      {selected}
      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
        <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" />
      </svg>
    </button>
    {label && (
      <div className="absolute right-0 bg-white mt-2 shadow rounded w-40 z-10">
        {options.map(option => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            {option}
          </button>
        ))}
      </div>
    )}
  </div>
);

// Main chart component
const DonutChart = ({ data, colors, selectedTab, selectedSegment, setSelectedSegment }) => (
  <div className="w-full sm:w-2/3 h-64">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          onClick={(_, index) => setSelectedSegment(index)}
          onMouseEnter={(_, index) => setSelectedSegment(index)}
          onMouseLeave={() => setSelectedSegment(null)}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
              opacity={selectedSegment === null || selectedSegment === index ? 1 : 0.5}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${value}`, name]}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

// Legend component
const Legend = ({ data, colors }) => (
  <div className="flex flex-wrap justify-center mt-6 space-x-4 sm:space-x-6">
    {data.map((item, index) => (
      <div key={index} className="flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: colors[index % colors.length] }}
        />
        <span className="text-sm text-gray-700">{item.name}</span>
      </div>
    ))}
  </div>
);

// Main AnalyticsDonutChart component
const AnalyticsDonutChart = () => {
  const tabs = ["Formateurs", "Entreprises", "Formations"];
  const filters = ["ce mois ci", "mois dernier", "cette année", "année dernière"];
  const [subfilters, setSubfilters] = useState(["Âge", "Ville"]);
  const colors = ["#f79b6b", "#4962F5", "#f55bdd"];

  const [chartData, setChartData] = useState({
    Formateurs: [],
    Entreprises: [],
    Formations: []
  });
  const [selectedTab, setSelectedTab] = useState("Formateurs");
  const [selectedPeriod, setSelectedPeriod] = useState("ce mois ci");
  const [selectedSubfilter, setSelectedSubfilter] = useState("Ville");
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [subfilterDropdown, setSubfilterDropdown] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);

  // Fetch data on component mount and when tab or period changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://my-json-server.typicode.com/E-Abdelouahab/mockjson/dashboard2');
        if (!response.data || !response.data.Formateurs) {
          console.error('dashboard2 not found or malformed:', response.data);
          return;
        }
        setChartData(filterDataByPeriod(response.data, selectedPeriod));
        updateSubfilters(response.data[selectedTab]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedPeriod, selectedTab]);

  const filterDataByPeriod = (data, period) => {
    const periodKeyMapping = {
      "ce mois ci": "cemois",
      "mois dernier": "moisdernier",
      "cette année": "cetteannee",
      "année dernière": "anneederniere",
    };
    const periodKey = periodKeyMapping[period];
    if (!periodKey) return { Formateurs: [], Entreprises: [], Formations: [] };

    return {
      Formateurs: data.Formateurs?.[periodKey] || [],
      Entreprises: data.Entreprises?.[periodKey] || [],
      Formations: data.Formations?.[periodKey] || []
    };
  };

  const updateSubfilters = (tabData) => {
    if (!tabData) return;
    setSubfilters(["Âge", "Ville"]);
  };

  return (
    <div className="bg-white shadow-md rounded-sm p-4 w-full">
      {/* Tabs and Period Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-wrap sm:flex-nowrap space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`pb-1 text-sm font-semibold ${selectedTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <Dropdown
          selected={selectedPeriod}
          options={filters}
          onSelect={setSelectedPeriod}
          label={filterDropdown}
        />
      </div>

      {/* Chart Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <Dropdown
          selected={selectedSubfilter}
          options={subfilters}
          onSelect={setSelectedSubfilter}
          label={subfilterDropdown}
        />

        <DonutChart
          data={chartData[selectedTab]}
          colors={colors}
          selectedTab={selectedTab}
          selectedSegment={selectedSegment}
          setSelectedSegment={setSelectedSegment}
        />

        <div className="text-center w-full sm:w-1/3">
          <div className="text-blue-600 text-sm font-medium flex justify-center items-center gap-1">
            <svg width="16" height="16" fill="none">
              <path d="M6 9l4-4 4 4" stroke="currentColor" strokeWidth="2" />
            </svg>
            +16%
          </div>
          <div className="text-2xl font-bold">+ 50</div>
        </div>
      </div>

      {/* Legend */}
      <Legend data={chartData[selectedTab]} colors={colors} />
    </div>
  );
};

export default AnalyticsDonutChart;
