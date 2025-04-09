'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const NegotiationDonutChart = () => {
  const tabs = ["Négociations", "Missions"];
  const filters = ["ce mois ci", "mois dernier", "cette année", "année dernière"];
  const colors = ["#f79b6b", "#4962F5", "#f55bdd"]; // orange, bleu, rose

  const [chartData, setChartData] = useState({
    "Négociations": [],
    "Missions": []
  });
  const [selectedTab, setSelectedTab] = useState("Négociations");
  const [selectedPeriod, setSelectedPeriod] = useState("ce mois ci");
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [filterDropdown, setFilterDropdown] = useState(false);

  useEffect(() => {
    // Fetch data from your API
    axios.get('https://my-json-server.typicode.com/E-Abdelouahab/mockjson/dashboard1')  // Replace with your actual API endpoint
      .then(response => {
        const data = response.data;
        console.log('Fetched data:', data);
        // Set data after filtering based on the default selected period
        setChartData(filterDataByPeriod(data, selectedPeriod));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Optionally, handle the error by setting default data or showing a message
        setChartData({
          "Négociations": [
            { name: "En attente du traitement", "value": 30 },
            { name: "En cours", value: 50 },
            { name: "Échoués", value: 20 }
          ],
          "Missions": [
            { name: "En attente du traitement", value: 40 },
            { name: "En cours", value: 40 },
            { name: "Échoués", value: 20 }
          ]
        });
      });
  }, [selectedPeriod]);  // Re-fetch data when the selected period changes

  const filterDataByPeriod = (data, period) => {
    // Map period to correct key in the API data
    const periodKeyMapping = {
      "ce mois ci": "cemois",
      "mois dernier": "moisdernier",
      "cette année": "cetteannee",
      "année dernière": "anneederniere",
    };

    const periodKey = periodKeyMapping[period]; // Map period to the correct key

    if (!periodKey) {
      console.error('Invalid period selected');
      return { "Négociations": [], "Missions": [] }; // Return empty data if period is invalid
    }

    const filteredData = { ...data };

    // Check if the period exists in the data
    if (
      filteredData.Négociations && 
      filteredData.Négociations[periodKey] && 
      filteredData.Missions && 
      filteredData.Missions[periodKey]
    ) {
      filteredData.Négociations = filteredData.Négociations[periodKey];
      filteredData.Missions = filteredData.Missions[periodKey];
    } else {
      console.error('No data available for the selected period');
      return { "Négociations": [], "Missions": [] }; // Return empty data if no data for the selected period
    }

    return filteredData;
  };

  return (
    <div className="bg-white shadow-md rounded-sm p-6">
      {/* Tabs */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`pb-2 text-lg font-semibold ${
                selectedTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Period Dropdown */}
        <div className="relative">
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

      {/* Chart and stats */}
      <div className="flex items-center justify-between">
        {/* Donut Chart */}
        <div className="w-2/3 h-64">
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
                  >
                    <text
                      x={0}
                      y={0}
                      textAnchor="middle"
                      fill="#333"
                      fontSize={12}
                    >
                      {`${entry.name}: ${entry.value}%`}
                    </text>
                  </Cell>
                ))}
              </Pie>
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload.length) {
                    return (
                      <div className="bg-white p-2 shadow rounded border">
                        <p className="text-sm">{`${payload[0].name}: ${payload[0].value}%`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="text-center w-1/3">
          <div className="text-blue-600 text-sm font-medium flex justify-center items-center gap-1">
            <svg width="16" height="16" fill="none">
              <path d="M6 9l4-4 4 4" stroke="currentColor" strokeWidth="2" />
            </svg>
            +16%
          </div>
          <div className="text-2xl font-bold">+ 32</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-6">
        {chartData[selectedTab].map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index] }}
            />
            <span className="text-sm text-gray-700">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NegotiationDonutChart;
