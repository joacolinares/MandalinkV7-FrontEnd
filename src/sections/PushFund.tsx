import React from "react";
import { useTranslation } from "react-i18next";
import { IoPaperPlane } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa";
import { MandaLinkAddress, USDTContract,PaymentAddress } from "@/utils/contracts";
import { useReadContract } from "thirdweb/react";

const PushFund: React.FC = () => {
  const { t } = useTranslation();

  const { data: contractBalance } = useReadContract({
    contract: USDTContract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: [PaymentAddress]
  }) 

  return (
    <div className="PushFund mt-20 flex flex-col items-center">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4">{t("landing.pushFund")}</h1>
      </div>
      <div className="mt-8">
        <div className="text-xl mb-2 flex items-center justify-center">
          <span className="text-center">{t("landing.totalPushFunds")}</span>
        </div>
        <div className="flex  flex-col w-full items-center">
          <div
            className="px-2 text-center py-1 w-full mt-2 max-h-20 overflow-y-auto break-words font-bold"
          >
            {Number(contractBalance) / 10**6} USDT
          </div>
        </div>
      </div>

      <div className="w-full flex mt-8 justify-between items-center">
        <a
          href={`https://polygonscan.com/address/${MandaLinkAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg mb-2 cursor-pointer"
        >
          {t("landing.contractAddress")}
        </a>
        <a
          href="https://telegram.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg mb-2 cursor-pointer"
        >
          <FaTelegram className="w-6 h-6 mr-2 cursor-pointer" />
        </a>
      </div>
    </div>
  );
};

export default PushFund;
