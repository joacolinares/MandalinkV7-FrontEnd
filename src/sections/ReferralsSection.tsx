import { showSuccessAlert } from "@/utils/notifications";
import React from "react";
import { useTranslation } from "react-i18next";
interface Referral {
  level: number;
  percentage: string;
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
  const { t } = useTranslation();
  const { totalReferrals, investmentLink, referrals } = data;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(investmentLink)
      .then(() => {
        showSuccessAlert("¡Link copiado!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="mt-20 flex flex-col items-center ">
      <h1 className="w-full text-2xl font-bold mb-4 flex flex-col items-start">
        <span>{t("landing.referred")}</span>
      </h1>
      <div className="text-xl  flex flex-col items-center gap-2 mb-2">
        <span>{t("landing.totalReferred")}</span>
        <span className="text-2xl font-bold">{totalReferrals}</span>
      </div>
      <div className="flex flex-col w-full ">
        {referrals.map((referral) => (
          <div
            key={referral.level}
            className="flex justify-between items-center border-b py-2"
          >
            <div>{`${t("landing.level")} ${referral.level}: ${
              referral.percentage
            }`}</div>
            <div className="flex items-center">
              <span className="mr-2">{referral.value}</span>
              <a
                href={referral.downloadLink}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("landing.download")}
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 w-[100%] ">
        <div>{t("landing.totalReferralInvestment")}</div>
        <div className="border border-gray-300 rounded px-2 py-1 w-full mt-2 max-h-20 overflow-y-auto break-words">
          {investmentLink}
        </div>
        <button
          className="mt-2 bg-purple-500 text-white rounded px-4 py-2"
          onClick={handleCopy}
        >
          {t("landing.copy")}
        </button>
      </div>
    </div>
  );
};

export default Referrals;
