"use client";
import { useState, useEffect } from "react";
import StatCard from "@/components/Dashboard/StatCard";
import AnalyticsDonutChart from "@/components/Dashboard/AnalyticsDonutChart";
import NegotiationDonutChart from "@/components/Dashboard/NegotiationDonutChart";
import PeriodSelector from "@/components/Dashboard/PeriodSelector";

export default function Home() {
  // State variables
  const [data, setData] = useState(null);  // Stores fetched data
  const [selectedPeriod1, setSelectedPeriod1] = useState("cemois");  // Period for formateur stats
  const [selectedPeriod2, setSelectedPeriod2] = useState("cemois");  // Period for entreprise stats
  const [selectedPeriod3, setSelectedPeriod3] = useState("cemois");  // Period for formation stats
  const [loading, setLoading] = useState(true);  // Loading state, defaults to true

  // Fetch data on component mount
  useEffect(() => {
    fetch("https://my-json-server.typicode.com/E-Abdelouahab/mockjson/dashboard3")
      .then((res) => res.json())  // Convert response to JSON
      .then((json) => {
        setData(json);  // Set the fetched data to state
        setLoading(false);  // Stop loading once data is fetched
      })
      .catch((err) => {
        console.error("Error fetching data:", err);  // Handle errors
        setLoading(false);  // Stop loading in case of error
      });
  }, []);  // Empty dependency array ensures it runs only once when the component mounts

  // Show a loading spinner while the data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Extract statistics for formateurs, entreprises, and formations based on selected periods
  const formateurStats = data.Formateurs[selectedPeriod1]?.[0] || { total: 0, percent: 0 };
  const entrepriseStats = data.Entreprises[selectedPeriod2]?.[0] || { total: 0, percent: 0 };
  const formationStats = data.Formations[selectedPeriod3]?.[0] || { total: 0, percent: 0 };

  // Handler to change periods for all stats
  const onChangeGlobalPeriod = (period) => {
    setSelectedPeriod1(period);
    setSelectedPeriod2(period);
    setSelectedPeriod3(period);
  };

  return (
    <div className="space-y-8">
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Period selector button */}
          <div className="text-sm px-3 py-1 w-auto flex items-right justify-end mb-4">
            <PeriodSelector value={selectedPeriod1} onChange={onChangeGlobalPeriod} />
          </div>

          {/* Stat cards displaying formateur, entreprise, and formation stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              label="Formateurs"
              value={formateurStats.total.toLocaleString()}  // Format total value with commas
              percentage={formateurStats.percent}
              color="text-green-500 border-3 border-green-600"
              period={selectedPeriod1}
              onPeriodChange={setSelectedPeriod1}  // Update period for formateurs
            />
            <StatCard
              label="Entreprises"
              value={entrepriseStats.total.toLocaleString()}  // Format total value with commas
              percentage={entrepriseStats.percent}
              color="text-green-500 border-3 border-sky-500"
              period={selectedPeriod2}
              onPeriodChange={setSelectedPeriod2}  // Update period for entreprises
            />
            <StatCard
              label="Formations"
              value={formationStats.total.toLocaleString()}  // Format total value with commas
              percentage={formationStats.percent}
              color="text-green-500 border-3 border-fuchsia-500"
              period={selectedPeriod3}
              onPeriodChange={setSelectedPeriod3}  // Update period for formations
            />
          </div>

          {/* Donut charts for negotiations and analytics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-1 flex-auto">
            <div>
              <NegotiationDonutChart />
            </div>
            <div>
              <AnalyticsDonutChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
