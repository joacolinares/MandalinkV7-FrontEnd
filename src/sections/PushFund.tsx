import React from "react";
import { useTranslation } from "react-i18next";
import { IoPaperPlane } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa";
interface PushFundProps {
  contractAddress: string;
}

const PushFund: React.FC<PushFundProps> = ({ contractAddress }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-20 flex flex-col items-center">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4">{t("landing.pushFund")}</h1>
      </div>
      <div className="mt-8">
        <div className="text-xl mb-2 flex items-center justify-center">
          <span className="text-center">{t("landing.totalPushFunds")}</span>
        </div>
        <div className="flex  flex-col w-full items-center">
          <div
            className="cursor-pointer px-2 text-center py-1 w-full mt-2 max-h-20 overflow-y-auto break-words"
            onClick={() =>
              window.open(
                `https://etherscan.io/address/${contractAddress}`,
                "_blank"
              )
            }
          >
            {contractAddress}
          </div>
        </div>
      </div>

      <div className="w-full flex mt-8 justify-between items-center">
        <a
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg mb-2 cursor-pointer"
        >
          {t("landing.contractAddress")}
        </a>
        <a
          href="https://example.com"
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
