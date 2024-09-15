import React from "react";
import { useTranslation } from "react-i18next";

interface UserStats {
  totalUsers: number;
  paid: number;
  colorIndicator: "green" | "yellow"; // si agregan mas colores, hay que modificar el componente Indicator y landing.tsx
  positionOptions: string[];
}

interface StatisticsSectionProps {
  stats: UserStats[];
}

const Indicator: React.FC<{ color: "green" | "yellow" }> = ({ color }) => {
  return (
    <div
      className={`w-8 h-8 rounded-full ${
        color === "green" ? "bg-green-500" : "bg-yellow-500"
      }`}
    />
  );
};

const StatisticsCard: React.FC<{ stats: UserStats; index: number }> = ({
  stats,
  index,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center rounded-lg m-2">
      <div className="w-[12rem] h-48 text-2xl font-semibold text-center bg-c-violet rounded-lg px-2 py-4 flex flex-col justify-between relative">
        <div className="absolute top-2 right-2">
          <Indicator color={stats.colorIndicator} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-white flex items-center justify-center text-sm font-semibold text-c-violet rounded-full">
            {index + 1}
          </div>
        </div>
        <div className="mt-8 text-white">
          <div>{t("landing.totalUsers")}</div>
          <div className="text-3xl font-bold">{stats.totalUsers}</div>
        </div>
        <div className="text-white">
          {t("landing.paid")} {stats.paid}
        </div>
      </div>
      <select className="mt-2 bg-c-violet text-white text-base rounded px-2 py-1 w-[12rem]">
        {stats.positionOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ stats }) => {
  const { t } = useTranslation();
  return (
    <div className="mt-20 flex flex-col items-center">
      <h1 className="w-full text-2xl font-bold mb-4 flex flex-col items-start">
        <span>{t("landing.statistics")}</span>
      </h1>
      <div className="flex flex-wrap justify-center">
        {stats.map((stat, index) => (
          <StatisticsCard key={index} stats={stat} index={index} />
        ))}
      </div>
    </div>
  );
};

export default StatisticsSection;
