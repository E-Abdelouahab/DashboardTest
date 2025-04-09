"use client";
import StatCard from "@/components/Dashboard/StatCard";
import AnalyticsDonutChart from "@/components/Dashboard/AnalyticsDonutChart";
import NegotiationDonutChart from "@/components/Dashboard/NegotiationDonutChart";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              label="Formateur"
              value="15 000"
              percentage={11.05}
              color="text-green-500 border-3 border-green-600"
            />
            <StatCard
              label="Entreprises"
              value="13 452"
              percentage={11.05}
              color="text-green-500 border-3 border-sky-500"
              
            />
            <StatCard
              label="Formations"
              value="13 452"
              percentage={11.05}
              color="text-green-500 border-3 border-fuchsia-500"
           
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-1">
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
