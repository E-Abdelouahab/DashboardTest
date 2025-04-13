'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const AnalyticsDonutChart = () => {
  // Tabs representing different categories to display data for
  const tabs = ["Formateurs", "Entreprises", "Formations"];
  // Period filters (for example: "this month", "last month")
  const filters = ["ce mois ci", "mois dernier", "cette année", "année dernière"];
  // Subfilters for segmenting data (for example: "Age", "City")
  const [subfilters, setSubfilters] = useState(["Âge", "Ville"]);
  // Color palette for the donut chart segments
  const colors = ["#f79b6b", "#4962F5", "#f55bdd"];

  // State to store the chart data for each tab (Formateurs, Entreprises, Formations)
  const [chartData, setChartData] = useState({
    Formateurs: [],
    Entreprises: [],
    Formations: []
  });
  // State for selected tab (Formateurs, Entreprises, Formations)
  const [selectedTab, setSelectedTab] = useState("Formateurs");
  // State for selected period (e.g., "this month")
  const [selectedPeriod, setSelectedPeriod] = useState("ce mois ci");
  // State for selected subfilter (e.g., "Age")
  const [selectedSubfilter, setSelectedSubfilter] = useState("Ville");
  // States for managing dropdown visibility for period and subfilter selection
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [subfilterDropdown, setSubfilterDropdown] = useState(false);
  // State for storing the segment that is clicked or hovered on
  const [selectedSegment, setSelectedSegment] = useState(null);

  // Effect to fetch data whenever the selected period or tab changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from an external API
        const response = await axios.get('https://my-json-server.typicode.com/E-Abdelouahab/mockjson/dashboard2');
        if (!response.data || !response.data.Formateurs) {
          console.error('dashboard2 not found or malformed:', response.data);
          return;
        }

        // Filter the fetched data based on the selected period
        setChartData(filterDataByPeriod(response.data, selectedPeriod));
        updateSubfilters(response.data[selectedTab]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedPeriod, selectedTab]);  // Runs on selectedPeriod or selectedTab change

  // Function to filter data based on the selected period
  const filterDataByPeriod = (data, period) => {
    const periodKeyMapping = {
      "ce mois ci": "cemois",
      "mois dernier": "moisdernier",
      "cette année": "cetteannee",
      "année dernière": "anneederniere",
    };

    const periodKey = periodKeyMapping[period];
    if (!periodKey) {
      return { Formateurs: [], Entreprises: [], Formations: [] };
    }

    // Return filtered data for Formateurs, Entreprises, and Formations based on the period
    return {
      Formateurs: data.Formateurs?.[periodKey] || [],
      Entreprises: data.Entreprises?.[periodKey] || [],
      Formations: data.Formations?.[periodKey] || []
    };
  };

  // Function to update the available subfilters based on selected tab data
  const updateSubfilters = (tabData) => {
    if (!tabData) return;
    setSubfilters(["Âge", "Ville"]);  // Set subfilters based on tab data
  };

  return (
    <div className="bg-white shadow-md rounded-sm p-4 w-full">
      {/* Tabs and Period Selector (Responsive) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Tabs on the left */}
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

        {/* Period Dropdown on the right */}
        <div className="relative self-start sm:self-auto">
          <button
            onClick={() => setFilterDropdown(!filterDropdown)}
            className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 flex items-center"
          >
            {selectedPeriod}
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
              <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          {filterDropdown && (
            <div className="absolute right-0 bg-white mt-2 shadow rounded w-40 z-10">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setSelectedPeriod(f);
                    setFilterDropdown(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Subfilter Dropdown */}
        <div className="relative w-full sm:w-1/4">
          <button
            onClick={() => setSubfilterDropdown(!subfilterDropdown)}
            className="bg-gray-100 px-4 py-2 rounded-md text-sm text-gray-700 w-full text-left flex justify-between items-center"
          >
            {selectedSubfilter}
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
              <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          {subfilterDropdown && (
            <div className="absolute mt-2 w-full bg-white shadow rounded z-10">
              {subfilters.map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setSelectedSubfilter(f);
                    setSubfilterDropdown(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Donut Chart */}
        <div className="w-full sm:w-2/3 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData[selectedTab]}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                onClick={(_, index) => setSelectedSegment(index)}
                onMouseEnter={(_, index) => setSelectedSegment(index)}
                onMouseLeave={() => setSelectedSegment(null)}
              >
                {chartData[selectedTab].map((entry, index) => (
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

        {/* Stats on the right */}
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

      {/* Legend Section */}
      <div className="flex flex-wrap justify-center mt-6 space-x-4 sm:space-x-6">
        {chartData[selectedTab].map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-sm text-gray-700">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDonutChart;
