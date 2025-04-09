'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer,Tooltip } from 'recharts';

const AnalyticsDonutChart = () => {
  const tabs = ["Formateurs", "Entreprises", "Formations"];
  const filters = ["ce mois ci", "mois dernier", "cette année", "année dernière"];
  const subfilters = ["Secteur d'activité", "Âge", "Ville"];
  const colors = ["#000", "#4962F5", "#f55bdd"];

  const chartData = {
    Formateurs: [
      { name: "Dossier en attente", value: 20 },
      { name: "Inscrits", value: 50 },
      { name: "Refusés", value: 30 }
    ],
    Entreprises: [
      { name: "Dossier en attente", value: 15 },
      { name: "Inscrits", value: 60 },
      { name: "Refusés", value: 25 }
    ],
    Formations: [
      { name: "Dossier en attente", value: 10 },
      { name: "Inscrits", value: 70 },
      { name: "Refusés", value: 20 }
    ]
  };

  const [selectedTab, setSelectedTab] = useState("Formateurs");
  const [selectedPeriod, setSelectedPeriod] = useState("ce mois ci");
  const [selectedSubfilter, setSelectedSubfilter] = useState("Secteur d'activité");
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [subfilterDropdown, setSubfilterDropdown] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);

  return (
    <div className="bg-white shadow-md  rounded-sm p-6">
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

      {/* Chart and subfilter */}
      <div className="flex items-center justify-between">
        {/* Left dropdown (subfilter) */}
        <div className="relative w-1/4">
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
              padding: '8px'
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
          <div className="text-2xl font-bold">+ 50</div>
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

export default AnalyticsDonutChart;
