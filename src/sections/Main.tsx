import { ConnectButton } from "thirdweb/react";
import { client } from "@/client";
import mandalink_logo from "@/assets/mandalink_logo.svg";
import { useTranslation } from "react-i18next";
import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";

const Main = () => {
  const { t, i18n } = useTranslation();

  const [yourWallet, setYourWallet] = React.useState<number | undefined>(10);
  const [earnings, setEarnings] = React.useState<number | undefined>(20);
  const [commissions, setCommissions] = React.useState<number | undefined>(30);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <main className="flex items-center justify-center flex-col">
      <div className="flex justify-between gap-2 flex-row top-0 right-0 mt-4 ">
        <h1>{t("landing.connectWallet")}</h1>
        <button onClick={() => changeLanguage("en")}>Eng</button>
        <button onClick={() => changeLanguage("es")}>Esp</button>
        <ConnectButton
          client={client}
          connectButton={{
            label: t("landing.connectWallet"),
            className:
              "!bg-c-violet !h-8 !text-white !font-light !py-1 !px-1 !rounded-md !shadow-lg !hover:bg-purple-600 !transition !text-sm ",
          }}
        />
      </div>

      <img
        src={mandalink_logo}
        alt="mandalink logo"
        className="filter invert brightness-0 w-[70%] h-[70%] mt-14"
      />

      <div className="w-full  flex flex-col items-center justify-center mt-10 outline-red-500 outline-dashed ">
        <div className="w-full flex flex-row justify-between gap-4">
          <button className="!bg-c-violet  !text-white !font-light !py-1 !px-1 !rounded-md !shadow-lg !hover:bg-purple-600 !transition !text-sm  flex flex-row gap-2">
            <IoDocumentTextOutline />
            {t("landing.downloadHereEnglish")}
          </button>
          <button className="!bg-c-violet  !text-white !font-light !py-1 !px-1 !rounded-md !shadow-lg !hover:bg-purple-600 !transition !text-sm flex flex-row gap-2">
            <IoDocumentTextOutline />
            {t("landing.downloadHereSpanish")}
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
      </div>
    </main>
  );
};

export default Main;
