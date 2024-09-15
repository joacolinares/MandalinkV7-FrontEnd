import { showSuccessAlert } from "@/utils/notifications";
import React from "react";

interface Referral {
  level: number;
  percentage: string; // e.g., "10%"
  value: number;
  downloadLink: string;
}

interface ReferralData {
  totalReferrals: number;
  investmentLink: string;
  referrals: Referral[];
}

interface ReferralsProps {
  data: ReferralData;
}

const Referrals: React.FC<ReferralsProps> = ({ data }) => {
  const { totalReferrals, investmentLink, referrals } = data;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(investmentLink)
      .then(() => {
        showSuccessAlert("¡Link copiado!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err); // Handle errors if needed
      });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">REFERIDOS</h1>
      <div className="text-xl mb-2">
        TOTAL REFERIDOS {totalReferrals.toFixed(6)}
      </div>
      <div className="flex flex-col w-full max-w-md">
        {referrals.map((referral) => (
          <div
            key={referral.level}
            className="flex justify-between items-center border-b py-2"
          >
            <div>{`Nivel ${referral.level}: ${referral.percentage}`}</div>
            <div className="flex items-center">
              <span className="mr-2">{referral.value}</span>
              <a
                href={referral.downloadLink}
                className="text-blue-500 hover:underline"
              >
                Descargar
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div>Inversión total de referencia</div>
        <input
          type="text"
          value={investmentLink}
          readOnly
          className="border border-gray-300 rounded px-2 py-1 w-full mt-2"
        />
        <button
          className="mt-2 bg-purple-500 text-white rounded px-4 py-2"
          onClick={handleCopy}
        >
          Copiar
        </button>
      </div>
    </div>
  );
};

export default Referrals;
