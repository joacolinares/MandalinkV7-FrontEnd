import React from "react";
import { useTranslation } from "react-i18next";

//Recibe valor y moneda en este formato "50 USDT", separa eso en partes y las muestra
const Card: React.FC<{ amount: string }> = ({ amount }) => {
  const { t } = useTranslation();
  const [value, currency] = amount.split(" ");
  return (
    <div className=" flex flex-col items-center justify-center rounded-lg m-2 ">
      <div className="w-[8rem] h-32 text-2xl font-semibold text-center grey-purple-color rounded-lg px-2 py-4 flex flex-col justify-center">
        <span className="text-2xl font-bold break-words">{value}</span>
        <span className="text-lg">{currency}</span>
      </div>
      <button
        className="mt-2 grey-purple-color text-white text-base rounded-lg px-2 py-1 w-[8rem] shadow-md hover:!bg-opacity-80 hover:outline outline-1"
        onClick={() => alert("botón de compra de posición clickeado")} // Fixed arrow function syntax
      >
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
    "1000 USDT",
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
