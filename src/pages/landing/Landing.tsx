import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Main from "../../sections/MainSection";
import SelectPoolSection from "../../sections/SelectPoolSection";
import StatisticsSection from "../../sections/StatisticsSection";
import ReferralsSection from "../../sections/ReferralsSection";
import Select from "react-select";
import { SingleValue } from "react-select";
import PushFund from "@/sections/PushFund";
import engFlag from "@/assets/icons/eng.png";
import espFlag from "@/assets/icons/esp.png";

import { ConnectButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { client } from "@/client";
import { MandaLinkAddress, MandaLinkContract, USDTContract,PaymentAddress,MandaLinkContract2 } from "@/utils/contracts";
import { chain } from "@/chain";

//En Landing.tsx se llaman los datos necesarios y se le pasan a los componentes, si se debe armar un objeto o un array de objetos, se hace aquí y se le pasa a los demás componentes que muestran esa información
export function Landing() {
  const address = useActiveAccount()

  const { t, i18n } = useTranslation();

  const { data: walletBalance } = useReadContract({
    contract: USDTContract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: address ? [address.address] : ["0x0000000000000000000000000000000000000000"]
  }) 

  const { data: user } = useReadContract({
    contract: MandaLinkContract,
    method: "function users(address) view returns (address referrer, uint256 directReferrals, uint256 missedOpportunities, uint256 payedExtra, uint256 totalTree)",
    params: address ? [address.address] : ["0x0000000000000000000000000000000000000000"]
  })

  const { data: contractBalance } = useReadContract({
    contract: USDTContract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: [PaymentAddress]
  })

  const { data: totalInvested } = useReadContract({
    contract: MandaLinkContract,
    method: "function totalPayed() view returns (uint256)",
    params: []
  });

  const { data: distributed } = useReadContract({
    contract: MandaLinkContract,
    method: "function totalDistributed() view returns (uint256)",
    params: []
  });

  //BUSAR MANERA DE HACER OPTIMIZADO, NO PUDE HACERLO YA QUE DENTRO DE USEEFFECT NO ME DEJA USAR HOOKS
  const { data: infoLevel1 } =  useReadContract({
    contract: MandaLinkContract2,
    method: "referralsByLevel",
    params: [address ? address.address : "0x0000000000000000000000000000000000000000", BigInt(0)],
  });
  const { data: infoLevel2 } =  useReadContract({
    contract: MandaLinkContract2,
    method: "referralsByLevel",
    params: [address ? address.address : "0x0000000000000000000000000000000000000000", BigInt(1)],
  });
  const { data: infoLevel3 } =  useReadContract({
    contract: MandaLinkContract2,
    method: "referralsByLevel",
    params: [address ? address.address : "0x0000000000000000000000000000000000000000", BigInt(2)],
  });
  const { data: infoLevel4 } =  useReadContract({
    contract: MandaLinkContract2,
    method: "referralsByLevel",
    params: [address ? address.address : "0x0000000000000000000000000000000000000000", BigInt(3)],
  });
  const { data: infoLevel5 } =  useReadContract({
    contract: MandaLinkContract2,
    method: "referralsByLevel",
    params: [address ? address.address : "0x0000000000000000000000000000000000000000", BigInt(4)],
  });
  const { data: infoLevel6 } =  useReadContract({
    contract: MandaLinkContract2,
    method: "referralsByLevel",
    params: [address ? address.address : "0x0000000000000000000000000000000000000000", BigInt(5)],
  });
  const { data: infoLevel7 } =  useReadContract({
    contract: MandaLinkContract2,
    method: "referralsByLevel",
    params: [address ? address.address : "0x0000000000000000000000000000000000000000", BigInt(6)],
  });


  const { data: infoLevel1Money } =  useReadContract({
    contract: MandaLinkContract2,
    method: "amountInvestInLevels",
    params: [address ? address.address : "0x0000000000000000000000000000000000000000", BigInt(0)],
  });
  const { data: infoLevel2Money } =  useReadContract({
    contract: MandaLinkContract2,
    method: "amountInvestInLevels",
    params: [address ? address.address : "0x0000000000000000000000000000000000000000", BigInt(1)],
  });
  const { data: infoLevel3Money } =  useReadContract({
    contract: MandaLinkContract2,
    method: "amountInvestInLevels",
    params: [address ? address.address : "0x0000000000000000000000000000000000000000", BigInt(2)],
  });
  const { data: infoLevel4Money } =  useReadContract({
    contract: MandaLinkContract2,
    method: "amountInvestInLevels",
    params: [address ? address.address : "0x0000000000000000000000000000000000000000", BigInt(3)],
  });
  const { data: infoLevel5Money } =  useReadContract({
    contract: MandaLinkContract2,
    method: "amountInvestInLevels",
    params: [address ? address.address : "0x0000000000000000000000000000000000000000", BigInt(4)],
  });
  const { data: infoLevel6Money } =  useReadContract({
    contract: MandaLinkContract2,
    method: "amountInvestInLevels",
    params: [address ? address.address : "0x0000000000000000000000000000000000000000", BigInt(5)],
  });
  const { data: infoLevel7Money } =  useReadContract({
    contract: MandaLinkContract2,
    method: "amountInvestInLevels",
    params: [address ? address.address : "0x0000000000000000000000000000000000000000", BigInt(6)],
  });



  const [referralLevels, setReferralLevels] = useState<any[]>([]);

  // UseEffect para almacenar los valores en referralLevels
  useEffect(() => {
    const levels = [
      {
        people: infoLevel1 ? Number(infoLevel1) : 0,
        money: infoLevel1Money ? Number(infoLevel1Money) : 0,
      },
      {
        people: infoLevel2 ? Number(infoLevel2) : 0,
        money: infoLevel2Money ? Number(infoLevel2Money) : 0,
      },
      {
        people: infoLevel3 ? Number(infoLevel3) : 0,
        money: infoLevel3Money ? Number(infoLevel3Money) : 0,
      },
      {
        people: infoLevel4 ? Number(infoLevel4) : 0,
        money: infoLevel4Money ? Number(infoLevel4Money) : 0,
      },
      {
        people: infoLevel5 ? Number(infoLevel5) : 0,
        money: infoLevel5Money ? Number(infoLevel5Money) : 0,
      },
      {
        people: infoLevel6 ? Number(infoLevel6) : 0,
        money: infoLevel6Money ? Number(infoLevel6Money) : 0,
      },
      {
        people: infoLevel7 ? Number(infoLevel7) : 0,
        money: infoLevel7Money ? Number(infoLevel7Money) : 0,
      },
    ];
  
    setReferralLevels(levels);
  }, [infoLevel1, infoLevel2, infoLevel3, infoLevel4, infoLevel5, infoLevel6, infoLevel7, infoLevel1Money, infoLevel2Money, infoLevel3Money, infoLevel4Money, infoLevel5Money, infoLevel6Money, infoLevel7Money]);
  


  //Estos son los datos que se van a mostrar en statistics section
  const [totalUsers, setTotalUsers] = useState({
    totalUsersPosition1: 100,
    totalUsersPosition2: 200,
    totalUsersPosition3: 300,
    totalUsersPosition4: 400,
    totalUsersPosition5: 500,
    totalUsersPosition6: 600,
    totalUsersPosition7: 700,
  });
  const [paid, setPaid] = useState({
    paidPosition1: 500,
    paidPosition2: 300,
    paidPosition3: 200,
    paidPosition4: 400,
    paidPosition5: 350,
    paidPosition6: 250,
    paidPosition7: 150,
  });
  const [colorIndicator, setColorIndicator] = useState({
    colorIndicatorPosition1: "green",
    colorIndicatorPosition2: "yellow",
    colorIndicatorPosition3: "green",
    colorIndicatorPosition4: "yellow",
    colorIndicatorPosition5: "green",
    colorIndicatorPosition6: "yellow",
    colorIndicatorPosition7: "green",
  });
  const [positionOptions] = useState([
    ["option1", "option2", "option3", "option4", "option5"],
    ["option1", "option2", "option3", "option4", "option5"],
    ["option1", "option2", "option3", "option4", "option5"],
    ["option1", "option2", "option3", "option4", "option5"],
    ["option1", "option2", "option3", "option4", "option5"],
    ["option1", "option2", "option3", "option4", "option5"],
    ["option1", "option2", "option3", "option4", "option5"],
  ]);

  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
  };

  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const handleLanguageChange = (
    newValue: SingleValue<{ value: string; label: string; flag: string }> | null
  ) => {
    if (newValue) {
      const newLanguage = newValue.value;
      setCurrentLanguage(newLanguage);
      changeLanguage(newLanguage);
    }
  };

  //El colorIndicator es la bolita verde o amarilla, como no conozco la lógica que define ese color, dejo este array con las propiedades necesarias para cada carta de estadísticas, para usar esto crean la lógica para definir si el indicador va a ser green o yellow, ponen los datos necesarios en un array con estas propiedades  y lo envían al componente StatisticsSection.tsx y el componente se encarga de mapearlas
  const statisticsData = [
    {
      totalUsers: totalUsers.totalUsersPosition1,
      paid: paid.paidPosition1,
      colorIndicator: colorIndicator.colorIndicatorPosition1 as ColorIndicator,
      positionOptions: positionOptions[0],
    },
    {
      totalUsers: totalUsers.totalUsersPosition2,
      paid: paid.paidPosition2,
      colorIndicator: colorIndicator.colorIndicatorPosition2 as ColorIndicator,
      positionOptions: positionOptions[1],
    },
    {
      totalUsers: totalUsers.totalUsersPosition3,
      paid: paid.paidPosition3,
      colorIndicator: colorIndicator.colorIndicatorPosition3 as ColorIndicator,
      positionOptions: positionOptions[2],
    },
    {
      totalUsers: totalUsers.totalUsersPosition4,
      paid: paid.paidPosition4,
      colorIndicator: colorIndicator.colorIndicatorPosition4 as ColorIndicator,
      positionOptions: positionOptions[3],
    },
    {
      totalUsers: totalUsers.totalUsersPosition5,
      paid: paid.paidPosition5,
      colorIndicator: colorIndicator.colorIndicatorPosition5 as ColorIndicator,
      positionOptions: positionOptions[4],
    },
    {
      totalUsers: totalUsers.totalUsersPosition6,
      paid: paid.paidPosition6,
      colorIndicator: colorIndicator.colorIndicatorPosition6 as ColorIndicator,
      positionOptions: positionOptions[5],
    },
    {
      totalUsers: totalUsers.totalUsersPosition7,
      paid: paid.paidPosition7,
      colorIndicator: colorIndicator.colorIndicatorPosition7 as ColorIndicator,
      positionOptions: positionOptions[6],
    },
  ];

  const totalMoneyCollected = referralLevels.reduce((acc, level) => acc + level.money, 0);
  const totalPeople = referralLevels.reduce((acc, level) => acc + level.people, 0);

  const referralData = {
    totalReferrals: totalPeople, // Total de personas de todos los niveles
    totalMoneyCollected: totalMoneyCollected, // Suma total del dinero recaudado por todos los niveles
    investmentLink: `https://mandalink-v4.vercel.app/?REF=${address?.address}`,
    referrals: referralLevels.map((level, index) => ({
      level: index + 1,
      percentage:
        index === 0
          ? "10%"
          : index === 1
          ? "3%"
          : index === 2
          ? "2%"
          : index === 3 || index === 4 || index === 5
          ? "1%"
          : "2%", // Ajusta el porcentaje por nivel
      people: level.people, // Cantidad de personas en el nivel
      money: level.money,   // Cantidad de dinero en el nivel
      downloadLink: `https://example.com/download${index + 1}`,
    })),
  };

  console.log(referralData)

  const mainSectionData = {
    initialWallet: Number(walletBalance) / 10**6,
    initialEarnings: user ? Number(user[3]) / 10**6 : 0,
    initialCommissions: user ? Number(user[4]) / 10**6 : 0,
    initialTlv: Number(contractBalance) / 10**6,
    totalInvested: Number(totalInvested) / 10**6,
    distributed: Number(distributed) / 10**6,
  };

  // Opciones para el select de lenguaje
  const languageOptions = [
    { value: "en", label: "Eng", flag: engFlag },
    { value: "es", label: "Esp", flag: espFlag },
  ];

  return (
    <section className="Landing gradient-background px-4 w-full flex justify-center">
      <div className="max-w-[100%] md:max-w-[60%] xl:max-w-[60%] 2xl:max-w-[40%]">
        <nav className="fixed top-0 right-0 w-full flex justify-between md:w-auto items-center px-4 py-2 z-50">
          <div className="flex items-center gap-2 ">
            <img
              src={currentLanguage === "en" ? engFlag : espFlag}
              alt={`${currentLanguage} flag`}
              className="w-6 h-4"
            />
            <Select
              value={
                languageOptions.find(
                  (option) => option.value === currentLanguage
                ) || null
              }
              onChange={handleLanguageChange}
              options={languageOptions}
              className="bg-transparent border-none text-sm focus:outline-none"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none",
                  color: "white",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "white",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: "transparent",
                  color: "black",
                }),
              }}
            />
          </div>
          <div className="flex gap-2">
            <ConnectButton
              client={client}
              chain={chain}
              connectButton={{
                label: t("landing.connectWallet"),
                className:
                  "!bg-c-violet-2 !bg-opacity-80 hover:!bg-opacity-80 !h-8 !text-white !font-light !py-1 !px-1 !rounded-md !shadow-lg  !transition !text-sm hover:!outline hover:!outline-1 hover:!outline-white",
              }}
            />
          </div>
        </nav>
        <Main {...mainSectionData} />
        <SelectPoolSection />

        <StatisticsSection stats={statisticsData} />
        <ReferralsSection data={referralData} />
        <PushFund />

        <div className="h-52"></div>
      </div>
    </section>
  );
}

type ColorIndicator = "green" | "yellow";
