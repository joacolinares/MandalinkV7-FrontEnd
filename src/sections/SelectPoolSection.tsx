import React from "react";
import { useTranslation } from "react-i18next";

const Card: React.FC<{ amount: string }> = ({ amount }) => {
  const { t } = useTranslation();
  const [value, currency] = amount.split(" ");
  return (
    <div className=" flex flex-col items-center justify-center rounded-lg m-2 ">
      <div className="w-[8rem] h-32 text-2xl font-semibold text-center bg-c-violet rounded-lg px-2 py-4 flex flex-col justify-center">
        <span className="text-2xl font-bold break-words">{value}</span>
        <span className="text-lg">{currency}</span>
      </div>
      <button className="mt-2 bg-c-violet text-white text-base rounded-lg px-2 py-1 w-[8rem]">
        {t("landing.buyPosition")}
      </button>
    </div>
  );
};

const SelectPoolSection: React.FC = () => {
  const { t } = useTranslation();
  const amounts: string[] = [
    "50 USDT",
    "100 USDT",
    "200 USDT",
    "300 USDT",
    "400 USDT",
    "400 USDT",
    "400000 USDT",
  ];

  return (
    <div className="w-full mt-20 flex flex-col items-center">
      <h1 className="w-full text-2xl font-bold mb-4 flex flex-col items-start">
        <span className="text-left">{t("landing.selectPool")}</span>
      </h1>
      <div className="flex flex-wrap justify-center">
        {amounts?.map((amount) => (
          <Card key={amount} amount={amount} />
        ))}
      </div>
    </div>
  );
};

export default SelectPoolSection;
