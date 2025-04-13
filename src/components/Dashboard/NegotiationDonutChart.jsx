'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const NegotiationDonutChart = () => {
  // Tabs and filter options
  const tabs = ["Négociations", "Missions"];
  const filters = ["ce mois ci", "mois dernier", "cette année", "année dernière"];
  const colors = ["#f79b6b", "#4962F5", "#f55bdd"];

  // State for storing chart data, selected tab, period, and other UI state
  const [chartData, setChartData] = useState({
    Négociations: [],
    Missions: [],
  });

  const [selectedTab, setSelectedTab] = useState("Négociations");
  const [selectedPeriod, setSelectedPeriod] = useState("ce mois ci");
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [filterDropdown, setFilterDropdown] = useState(false);

  // Fetch chart data when the component mounts or selected period changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get(
          'https://my-json-server.typicode.com/E-Abdelouahab/mockjson/dashboard1'
        );
        // Filter the data based on the selected period
        const filtered = filterDataByPeriod(response.data, selectedPeriod);
        setChartData(filtered);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback data if the API request fails
        setChartData({
          Négociations: [
            { name: "En attente du traitement", value: 30 },
            { name: "En cours", value: 50 },
            { name: "Échoués", value: 20 },
          ],
          Missions: [
            { name: "En attente du traitement", value: 40 },
            { name: "En cours", value: 40 },
            { name: "Échoués", value: 20 },
          ],
        });
      }
    };

    fetchData();
  }, [selectedPeriod]); // Re-fetch data when the selected period changes

  // Helper function to filter data based on the selected period
  const filterDataByPeriod = (data, period) => {
    // Mapping periods to corresponding data keys
    const mapping = {
      "ce mois ci": "cemois",
      "mois dernier": "moisdernier",
      "cette année": "cetteannee",
      "année dernière": "anneederniere",
    };

    const key = mapping[period];
    if (!key) return { Négociations: [], Missions: [] };

    // Return the filtered data for the selected period
    if (
      data.Négociations?.[key] &&
      data.Missions?.[key]
    ) {
      return {
        Négociations: data.Négociations[key],
        Missions: data.Missions[key],
      };
    }

    return { Négociations: [], Missions: [] };
  };

  return (
    <div className="bg-white shadow-md rounded-sm p-4 w-full">
      {/* Tabs and Period Filter Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Tabs for switching between "Négociations" and "Missions" */}
        <div className="flex flex-wrap sm:flex-nowrap space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)} // Change the selected tab
              className={`pb-1 text-sm font-semibold ${selectedTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Period Dropdown for selecting the time range */}
        <div className="relative self-start sm:self-auto">
          <button
            onClick={() => setFilterDropdown(!filterDropdown)} // Toggle the dropdown visibility
            className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 flex items-center"
          >
            {selectedPeriod}
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
              <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          {/* Dropdown menu to select a period */}
          {filterDropdown && (
            <div className="absolute right-0 bg-white mt-2 shadow rounded w-40 z-10">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setSelectedPeriod(f); // Set the selected period
                    setFilterDropdown(false); // Close the dropdown
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

      {/* Chart and Stats Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Donut Chart */}
        <div className="w-full sm:w-2/3 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData[selectedTab]} // Use the data for the selected tab
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                onClick={(_, index) => setSelectedSegment(index)} // Handle segment click
                onMouseEnter={(_, index) => setSelectedSegment(index)} // Highlight segment on hover
                onMouseLeave={() => setSelectedSegment(null)} // Reset on mouse leave
              >
                {chartData[selectedTab].map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]} // Apply color to each segment
                    opacity={selectedSegment === null || selectedSegment === index ? 1 : 0.5} // Highlight selected segment
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ payload }) =>
                  payload && payload.length ? (
                    <div className="bg-white p-2 shadow rounded border">
                      <p className="text-sm">{`${payload[0].name}: ${payload[0].value}%`}</p>
                    </div>
                  ) : null
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Section */}
        <div className="text-center w-full sm:w-1/3">
          <div className="text-blue-600 text-sm font-medium flex justify-center items-center gap-1">
            <svg width="16" height="16" fill="none">
              <path d="M6 9l4-4 4 4" stroke="currentColor" strokeWidth="2" />
            </svg>
            +16% {/* Displaying a percentage change */}
          </div>
          <div className="text-2xl font-bold">+ 32</div> {/* Displaying a stat */}
        </div>
      </div>

      {/* Legend Section */}
      <div className="flex flex-wrap justify-center mt-6 space-x-4 sm:space-x-6">
        {chartData[selectedTab].map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }} // Display color indicator
            />
            <span className="text-sm text-gray-700">{item.name}</span> {/* Display label */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NegotiationDonutChart;
