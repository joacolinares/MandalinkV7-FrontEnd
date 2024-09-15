import React from "react";

interface Position {
  position: string;
}

interface UserStats {
  totalUsers: number;
  paid: number;
  colorIndicator: "green" | "yellow"; // Ensure this is strictly typed
  positionOptions: Position[]; // Add options to UserStats
}

interface StatisticsSectionProps {
  stats: UserStats[];
}

const Indicator: React.FC<{ color: "green" | "yellow" }> = ({ color }) => {
  return (
    <div
      className={`w-4 h-4 rounded-full ${
        color === "green" ? "bg-green-500" : "bg-yellow-500"
      }`}
    />
  );
};

const StatisticsCard: React.FC<{ stats: UserStats }> = ({ stats }) => {
  return (
    <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg m-2">
      <div className="flex items-center">
        <Indicator color={stats.colorIndicator} />
        <div className="text-xl font-semibold ml-2">
          TOTAL USERS {stats.totalUsers.toString().padStart(4, "0")}
        </div>
      </div>
      <select className="mt-2 border border-gray-300 rounded px-2 py-1">
        {stats?.positionOptions?.map((pos, index) => (
          <option key={index} value={pos.position}>
            {pos.position}
          </option>
        ))}
      </select>
      <div>PAGADOS {stats.paid.toString().padStart(4, "0")}</div>
    </div>
  );
};

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ stats }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">ESTADISTICAS</h1>
      <div className="flex flex-wrap justify-center">
        {stats.map((stat, index) => (
          <StatisticsCard key={index} stats={stat} />
        ))}
      </div>
    </div>
  );
};

export default StatisticsSection;
