import React from "react";
import { useTranslation } from "react-i18next";
import { showSuccessAlert } from "@/utils/notifications";
import { IoPaperPlane } from "react-icons/io5";

interface PushFundProps {
  totalPushFunds: number;
  contractAddress: string;
}

const PushFund: React.FC<PushFundProps> = ({
  totalPushFunds,
  contractAddress,
}) => {
  const { t } = useTranslation();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(contractAddress)
      .then(() => {
        showSuccessAlert("¡Dirección copiada!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="mt-20 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">{t("landing.pushFund")}</h1>
      <div className="text-xl mb-2">
        {t("landing.totalPushFunds")} {totalPushFunds}
      </div>
      <div className="flex flex-col w-full items-center">
        <div className="text-lg mb-2">{t("landing.contractAddress")}</div>
        <div
          className="border cursor-pointer  border-gray-300 rounded px-2 py-1 w-full mt-2 max-h-20 overflow-y-auto break-words"
          onClick={() =>
            window.open(
              `https://etherscan.io/address/${contractAddress}`,
              "_blank"
            )
          }
        >
          {contractAddress}
        </div>
        <div className="flex mt-2">
          <IoPaperPlane className="mr-2" />
        </div>
      </div>
    </div>
  );
};

export default PushFund;
