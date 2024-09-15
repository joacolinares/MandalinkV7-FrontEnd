// MainSection.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import mandalink_logo from "@/assets/logos/mandalink_logo.svg";
import { IoDocumentTextOutline } from "react-icons/io5";

const MainSection = ({
  initialWallet,
  initialEarnings,
  initialCommissions,
  initialTlv,
  totalInvested,
  distributed,
}: {
  initialWallet?: number;
  initialEarnings?: number;
  initialCommissions?: number;
  initialTlv?: number;
  totalInvested?: number;
  distributed?: number;
}) => {
  const { t } = useTranslation();

  const [yourWallet, setYourWallet] = React.useState(initialWallet || 0);
  const [earnings, setEarnings] = React.useState(initialEarnings || 0);
  const [commissions, setCommissions] = React.useState(initialCommissions || 0);
  const [tlv, setTlv] = React.useState(initialTlv || 0);
  const [totalInvestedState, setTotalInvested] = React.useState(
    totalInvested || 0
  );
  const [distributedState, setDistributed] = React.useState(distributed || 0);

  return (
    <main className="flex  items-center justify-center flex-col ">
      <img
        src={mandalink_logo}
        alt="mandalink logo"
        className="filter invert brightness-0 w-[70%] h-[70%] mt-0"
      />

      <div className="w-[90%]  flex flex-col items-center justify-center mt-10  ">
        <div className="w-full flex flex-row justify-between gap-4">
          <button className="bg-c-violet  text-white font-light rounded-md shadow-lg transition text-sm items-center flex flex-row gap-2 hover:!bg-opacity-60 px-2 py-1.5">
            <IoDocumentTextOutline className="w-6 h-6" />
            <span className="text-xs">{t("landing.downloadHereEnglish")}</span>
          </button>
          <button className="bg-c-violet  text-white font-light rounded-md shadow-lg transition text-sm items-center flex flex-row gap-2 hover:!bg-opacity-60  px-2 py-1.5">
            <IoDocumentTextOutline className="  w-6 h-6" />
            <span className="text-xs"> {t("landing.downloadHereSpanish")}</span>
          </button>
        </div>

        <div className="w-full flex flex-col mt-4">
          <div className="w-full flex flex-row justify-between">
            <p>{t("landing.yourWallet")}</p>
            <p>
              {yourWallet} {" USDT"}
            </p>
          </div>
          <div className="w-full flex flex-row justify-between">
            <p>{t("landing.earnings")}</p>
            <p>
              {earnings} {" USDT"}
            </p>
          </div>
          <div className="w-full flex flex-row justify-between">
            <p>{t("landing.commissions")}</p>
            <p>
              {commissions} {" USDT"}
            </p>
          </div>
        </div>

        <h2 className="mt-8">{t("landing.availableForWithdrawal")} </h2>
        <div className="w-full flex flex-col mt-4">
          <div className="w-full flex flex-row justify-between">
            <p>TLV</p>
            <p>
              {tlv} {" USDT"}
            </p>
          </div>
          <div className="w-full flex flex-row justify-between">
            <p>{t("landing.totalInvested")}</p>
            <p>
              {totalInvestedState} {" USDT"}
            </p>
          </div>
          <div className="w-full flex flex-row justify-between">
            <p>{t("landing.totalDistributed")}</p>
            <p>
              {distributedState} {" USDT"}
            </p>
          </div>
        </div>
        <button className="bg-c-violet  text-white font-light rounded-md shadow-lg transition text-sm items-center flex flex-row gap-2 hover:!bg-opacity-60 px-10 py-1.5">
          <span className="text-sm"> {t("landing.withdraw")}</span>
        </button>
      </div>
    </main>
  );
};

export default MainSection;
