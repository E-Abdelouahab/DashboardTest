"use client";
import { useState, useEffect } from "react";
import StatCard from "@/components/Dashboard/StatCard";
import AnalyticsDonutChart from "@/components/Dashboard/AnalyticsDonutChart";
import NegotiationDonutChart from "@/components/Dashboard/NegotiationDonutChart";
import PeriodSelector from "@/components/Dashboard/PeriodSelector";

export default function Home() {
  const [data, setData] = useState(null);
  const [selectedPeriod1, setSelectedPeriod1] = useState("cemois");
  const [selectedPeriod2, setSelectedPeriod2] = useState("cemois");
  const [selectedPeriod3, setSelectedPeriod3] = useState("cemois");
  const [loading, setLoading] = useState(true); // Adding loading state

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/E-Abdelouahab/mockjson/dashboard3")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false); // Handle error and stop loading
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    ); // Spinner while data is loading
  }

  const formateurStats = data.Formateurs[selectedPeriod1]?.[0] || { total: 0, percent: 0 };
  const entrepriseStats = data.Entreprises[selectedPeriod2]?.[0] || { total: 0, percent: 0 };
  const formationStats = data.Formations[selectedPeriod3]?.[0] || { total: 0, percent: 0 };

  const onChangeGlobalPeriod = (period) => {
    setSelectedPeriod1(period);
    setSelectedPeriod2(period);
    setSelectedPeriod3(period);
  };

  return (
    <div className="space-y-8">
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Bouton de sélection de période */}
          <div className="text-sm px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none w-auto">
            <PeriodSelector value={selectedPeriod1} onChange={onChangeGlobalPeriod} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              label="Formateurs"
              value={formateurStats.total.toLocaleString()}
              percentage={formateurStats.percent}
              color="text-green-500 border-3 border-green-600"
              period={selectedPeriod1}
              onPeriodChange={setSelectedPeriod1}
            />
            <StatCard
              label="Entreprises"
              value={entrepriseStats.total.toLocaleString()}
              percentage={entrepriseStats.percent}
              color="text-green-500 border-3 border-sky-500"
              period={selectedPeriod2}
              onPeriodChange={setSelectedPeriod2}
            />
            <StatCard
              label="Formations"
              value={formationStats.total.toLocaleString()}
              percentage={formationStats.percent}
              color="text-green-500 border-3 border-fuchsia-500"
              period={selectedPeriod3}
              onPeriodChange={setSelectedPeriod3}
            />
          </div>

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
