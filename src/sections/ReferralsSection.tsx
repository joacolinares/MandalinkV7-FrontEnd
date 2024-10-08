import { MandaLinkContract } from "@/utils/contracts";
import { showSuccessAlert } from "@/utils/notifications";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useActiveAccount, useReadContract } from "thirdweb/react";

interface Referral {
  level: number;
  money: number;
  people: number;
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

const Referrals: React.FC<any> = ({ data }) => {
  const { t } = useTranslation();
  const address = useActiveAccount()

  const { data: userData } = useReadContract({
    contract: MandaLinkContract,
    method: "function users(address) view returns (address referrer, uint256 directReferrals, uint256 missedOpportunities, uint256 payedExtra, uint256 totalTree)",
    params: address ? [address.address] : ["0x0000000000000000000000000000000000000000"]
  })



  

  const { investmentLink, referrals,totalReferrals } = data;

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
    <div className="Referrals mt-20 flex flex-col items-center ">
      <h1 className="w-full text-2xl font-bold mb-4 flex flex-col items-start">
        <span>{t("landing.referred")}</span>
      </h1>
      <div className="text-xl  flex flex-col items-center gap-2 mb-2">
        <span>{t("landing.totalReferred")}</span>
        <span className="text-2xl font-bold">
          {userData ? totalReferrals : 0}
        </span>
      </div>
      <div className="flex flex-col w-full ">
        {referrals.map((referral: any) => (
          <div
            key={referral.level}
            className="flex justify-between items-center py-2"
          >
            <div>{`${t("landing.level")} ${referral.level}: ${
              referral.percentage
            }`}</div>
            <div className="flex items-center">
              <span style={{display:"inline-block"}} className="mr-3 font-bold">{t("landing.people")} {referral.people}</span>
              <span style={{display:"inline-block"}} className="mr-3 font-bold">{t("landing.money")} {referral.money / 1000000}$</span>

              {/*<div className="flex items-center">
                <a
                  href={referral.downloadLink}
                  className="text-white font-light text-xs bg-[#632667] rounded px-2 py-1 flex items-center hover:outline outline-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("landing.download")}
                  <svg
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 10L12 15L17 10"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15V3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 16V21H3V16"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>*/}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 w-full">
        <div className="flex justify-between my-4">
          <span className="font-bold">
            {t("landing.totalReferralInvestment")}
          </span>
          <span className="font-bold">
            {userData ? Number(userData[4]) / 10 ** 6 : 0} USDT
          </span>
        </div>

        {address && (
          <>
            <div className=" bg-[#632667] rounded px-2 py-1 w-full mt-2 max-h-20 overflow-y-auto break-words">
              {investmentLink}
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="text-center bg-[#632667] text-white rounded px-4 py-2 hover:outline outline-1"
                onClick={handleCopy}
              >
                {t("landing.copy")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Referrals;
