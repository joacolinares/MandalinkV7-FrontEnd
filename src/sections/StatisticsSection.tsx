import React, { useState } from "react";
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
      className={`w-6 h-6 rounded-full mr-3 ${
        color === "green" ? "bg-green-500" : "bg-yellow-500"
      }`}
    />
  );
};

const CustomSelect: React.FC<{ options: string[] }> = ({ options }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (direction: "up" | "down") => {
    setSelectedIndex((prev) => {
      if (direction === "up") {
        return (prev - 1 + options.length) % options.length;
      } else {
        return (prev + 1) % options.length;
      }
    });
  };

  return (
    <div className="mt-2 bg-c-violet text-white text-base  px-2 py-1 w-full rounded-md flex items-center justify-between">
      <div className="flex flex-col -my-1 ">
        <button
          onClick={() => handleChange("up")}
          className="text-sm leading-none"
        >
          &#9650;
        </button>
        <button
          onClick={() => handleChange("down")}
          className="text-sm leading-none "
        >
          &#9660;
        </button>
      </div>
      <div className="flex-grow text-center">{options[selectedIndex]}</div>
    </div>
  );
};

const StatisticsCard: React.FC<{ stats: UserStats; index: number }> = ({
  stats,
  index,
}) => {
  const { t } = useTranslation();
  return (
    <div className="w-[45%] flex flex-col items-center justify-center rounded-lg m-2 overflow-hidden">
      <div className="w-full h-44 text-2xl font-semibold text-center bg-c-violet rounded-lg px-2 py-4 flex flex-col justify-between relative">
        <div className="absolute flex flex-row top-2 justify-between w-full">
          <div className="w-6 h-6 border border-white flex items-center justify-center text-sm font-semibold  rounded-md">
            <p className="text-white">{index + 1}</p>
          </div>
          <Indicator color={stats.colorIndicator} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center"></div>
        <div className="mt-8 text-white">
          <div className="text-lg font-normal">{t("landing.totalUsers")}</div>
          <div className="text-3xl font-bold">{stats.totalUsers}</div>
        </div>
      </div>
      <CustomSelect options={stats.positionOptions} />
      <button className="mt-2 bg-c-violet active:bg-opacity-80 text-white text-base rounded-md px-2 py-1 w-full ">
        {t("landing.paid")} {stats.paid}
      </button>
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
