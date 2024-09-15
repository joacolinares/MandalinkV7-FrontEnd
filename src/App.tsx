// App.jsx
import { useTranslation } from "react-i18next";
import Main from "./sections/MainSection";
import SelectPoolSection from "./sections/SelectPoolSection";
import StatisticsSection from "./sections/StatisticsSection";
import ReferralsSection from "./sections/ReferralsSection";
/* import { ConnectButton } from "thirdweb/react";
import { client } from "@/client"; */

//En app.tsx se llaman los datos necesarios y se le pasan a los componentes, si se debe armar un objeto o un array de objetos, se hace aquí y se le pasa a los demás componentes
export function App() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
  };

  //El colorIndicator es la bolita verde o amarilla, como no conozco la lógica que define ese color, dejo este array con las propiedades necesarias para cada carta de estadísticas, para usar esto crean la lógica para definir si el indicador va a ser green o yellow, ponen los datos necesarios en un array con estas propiedades  y lo envían al componente StatisticsSection.tsx y el componente se encarga de mapearlas
  const statisticsData: any = [
    {
      totalUsers: 1000,
      paid: 500,
      colorIndicator: "green",
      positionOptions: [{ position: "option1" }, { position: "option2" }],
    },
    {
      totalUsers: 800,
      paid: 300,
      colorIndicator: "yellow",
      positionOptions: [
        { position: "option3" },
        { position: "option4" },
        { position: "option5" },
      ],
    },
    {
      totalUsers: 600,
      paid: 200,
      colorIndicator: "green",
      positionOptions: [{ position: "option6" }],
    },
    {
      totalUsers: 900,
      paid: 400,
      colorIndicator: "yellow",
      positionOptions: [{ position: "option7" }, { position: "option8" }],
    },
    {
      totalUsers: 700,
      paid: 350,
      colorIndicator: "green",
      positionOptions: [
        { position: "option9" },
        { position: "option10" },
        { position: "option11" },
      ],
    },
    {
      totalUsers: 500,
      paid: 250,
      colorIndicator: "yellow",
      positionOptions: [{ position: "option12" }],
    },
    {
      totalUsers: 400,
      paid: 150,
      colorIndicator: "green",
      positionOptions: [
        { position: "option13" },
        { position: "option14" },
        { position: "option15" },
        { position: "option16" },
      ],
    },
  ];

  const referralData = {
    totalReferrals: 0,
    investmentLink:
      "https://www.mandalik.io/?REF=0x70uhdz74yfzO3hewq3puqy3p29ulpdu",
    referrals: [
      {
        level: 1,
        percentage: "10%",
        value: 0,
        downloadLink: "https://example.com/download1",
      },
      {
        level: 2,
        percentage: "3%",
        value: 0,
        downloadLink: "https://example.com/download2",
      },
      {
        level: 3,
        percentage: "2%",
        value: 0,
        downloadLink: "https://example.com/download3",
      },
      {
        level: 4,
        percentage: "1%",
        value: 0,
        downloadLink: "https://example.com/download4",
      },
      {
        level: 5,
        percentage: "1%",
        value: 0,
        downloadLink: "https://example.com/download5",
      },
      {
        level: 6,
        percentage: "1%",
        value: 0,
        downloadLink: "https://example.com/download6",
      },
      {
        level: 7,
        percentage: "2%",
        value: 0,
        downloadLink: "https://example.com/download7",
      },
    ],
  };

  return (
    <section className="px-4 w-full flex justify-center">
      <div className="xl:max-w-[1200px]">
        <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-2 z-50">
          <h1>{t("landing.connectWallet")}</h1>
          <div className="flex gap-2">
            <button
              onClick={() => changeLanguage("es")}
              className="px-2 py-1 text-sm"
            >
              Esp
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className="px-2 py-1 text-sm"
            >
              Eng
            </button>
            {/*  <ConnectButton
              client={client}
              connectButton={{
                label: t("landing.connectWallet"),
                className:
                  "!bg-c-violet !h-8 !text-white !font-light !py-1 !px-1 !rounded-md !shadow-lg !hover:bg-purple-600 !transition !text-sm ",
              }}
            /> */}
          </div>
        </nav>
        <Main
          initialWallet={10}
          initialEarnings={20}
          initialCommissions={30}
          initialTlv={1000}
          totalInvested={2000}
          distributed={1500}
        />
        <SelectPoolSection />
        <StatisticsSection stats={statisticsData} />;
        <ReferralsSection data={referralData} />;<div className="h-52"></div>
      </div>
    </section>
  );
}
