import { MandaLinkContract } from "@/utils/contracts";
import { t } from "i18next";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useActiveAccount, useReadContract } from "thirdweb/react";

interface UserStats {
  totalUsers: number;
  paid: number;
  colorIndicator: "green" | "yellow";
  positionOptions: string[];
}

interface StatisticsSectionProps {
  stats: UserStats[];
}

const Indicator: React.FC<{ amount: number, id: number, shouldHighlightNextPool: any }> = ({ amount, id, shouldHighlightNextPool }) => (
  <div
    className={`w-6 h-6 rounded-full mr-3 ${
    // shouldHighlightNextPool || amount >= id ? "bg-green-500" : "bg-yellow-500"
    shouldHighlightNextPool &&  id + 1 >= 5|| amount >= id || (id === 6 && amount >= 5) ? "bg-green-500" : "bg-yellow-500"
    }`}
  />
);

const CustomSelect: React.FC<{ options: string[] }> = ({ options }) => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleChange = (direction: "up" | "down") => {
    setSelectedIndex((prev) =>
      direction === "up"
        ? (prev - 1 + options.length) % options.length
        : (prev + 1) % options.length
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="mt-2 bg-[#632667] text-white text-base px-2 py-1 w-full rounded-md flex items-center justify-between hover:outline hover:outline-1 hover:outline-white">
        <div className="flex flex-col my-1">
          <button
            onClick={() => handleChange("up")}
            className="text-sm leading-none"
          >
            &#9650;
          </button>
          <button
            onClick={() => handleChange("down")}
            className="text-sm leading-none"
          >
            &#9660;
          </button>
        </div>
        <div
          className="flex-grow text-center cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          {options.length > 0 ? Number(options[selectedIndex])  : t("landing.noPositions")}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black !text-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-c-violet-2 text-white rounded-lg p-4 m-4 h-96 w-96"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">
                {t("landing.list")}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className=" hover:text-gray-300 text-lg font-bold text-white"
              >
                &#x2715;
              </button>
            </div>

            <div className="h-[90%]  overflow-y-auto">
              {options.length > 0 ? (
                options.map((option, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 hover:rounded-md hover:bg-opacity-10"
                    onClick={() => {
                      setSelectedIndex(index);
                      setIsOpen(false);
                    }}
                  >
                    {Number(option)}
                  </div>
                ))
              ) : (
                <div className="text-center text-white">{t("landing.noPositions")}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};






const CustomSelect2: React.FC<{ options: string[], poolData: any }> = ({ options, poolData }) => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Filtrar opciones basadas en poolData[4]
  console.log("INFORMACIONNN")
  const filteredOptions = Number(poolData[4]) === 1 ? options.slice(1) : options;

  const handleChange = (direction: "up" | "down") => {
    setSelectedIndex((prev) =>
      direction === "up"
        ? (prev - 1 + filteredOptions.length) % filteredOptions.length
        : (prev + 1) % filteredOptions.length
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Función para formatear la opción mostrando solo los primeros y últimos 4 caracteres
  const formatOption = (option: string) => {
    return option === "Tu posición"
      ? option // No recortar si la opción es "Tu posición"
      : option.length > 8
      ? `${option.slice(0, 4)}...${option.slice(-4)}`
      : option; // Si la opción es menor de 8 caracteres, mostrar completa
  };

  return (
    <>
      <div className="mt-2 bg-[#632667] text-white text-base px-2 py-1 w-full rounded-md flex items-center justify-between hover:outline hover:outline-1 hover:outline-white">
        <div className="flex flex-col my-1">
          <button
            onClick={() => handleChange("up")}
            className="text-sm leading-none"
          >
            &#9650;
          </button>
          <button
            onClick={() => handleChange("down")}
            className="text-sm leading-none"
          >
            &#9660;
          </button>
        </div>
        <div
          className="flex-grow text-center cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          {filteredOptions.length > 0 ? formatOption(filteredOptions[selectedIndex]) : t("landing.noPositions")}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black !text-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-c-violet-2 text-white rounded-lg p-4 m-4 h-96 w-96"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">
                {t("landing.list")}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className=" hover:text-gray-300 text-lg font-bold text-white"
              >
                &#x2715;
              </button>
            </div>

            <div className="h-[90%]  overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 hover:rounded-md hover:bg-opacity-10"
                    onClick={() => {
                      setSelectedIndex(index);
                      setIsOpen(false);
                    }}
                  >
                    {formatOption(option)}
                  </div>
                ))
              ) : (
                <div className="text-center text-white">{t("landing.noPositions")}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};






const StatisticsCard: React.FC<{ stats: UserStats; index: number }> = ({
  stats,
  index,
}) => {
  const { t } = useTranslation();
 // const [filteredPositions, setFilteredPositions] = useState<string[]>([]);
  const address = useActiveAccount()

  const { data: poolData } = useReadContract({
    contract: MandaLinkContract,
    method: "pools",
    params: [BigInt(index)]
  })

  console.log("INDEX", index)
  console.log(poolData)

  const { data: userData } = useReadContract({
    contract: MandaLinkContract,
    method: "numberOfDirects",
    params: address ? [address.address] : ["0x0000000000000000000000000000000000000000"]
  })
  const { data: canPassInvestorPools } = useReadContract({
    contract: MandaLinkContract,
    method: "canPassInvestorPools",
    params: address ? [address.address] : ["0x0000000000000000000000000000000000000000"]
  })

         const { data: positionData1 } =  useReadContract({
           contract: MandaLinkContract,
           method: "positionsPerPool",
           params: address ? [address.address, BigInt(index), BigInt(0)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(0)]
         });
         const { data: positionData2 } =  useReadContract({
           contract: MandaLinkContract,
           method: "positionsPerPool",
           params: address ? [address.address, BigInt(index), BigInt(1)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(1)]
         });
         const { data: positionData3 } =  useReadContract({
           contract: MandaLinkContract,
           method: "positionsPerPool",
           params: address ? [address.address, BigInt(index), BigInt(2)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(2)]
         });
         const { data: positionData4 } =  useReadContract({
           contract: MandaLinkContract,
           method: "positionsPerPool",
           params: address ? [address.address, BigInt(index), BigInt(3)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(3)]
         });
         const { data: positionData5 } =  useReadContract({
           contract: MandaLinkContract,
           method: "positionsPerPool",
           params: address ? [address.address, BigInt(index), BigInt(4)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(4)]
         });
         const { data: positionData6 } =  useReadContract({
           contract: MandaLinkContract,
           method: "positionsPerPool",
           params: address ? [address.address, BigInt(index), BigInt(5)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(5)]
         });
         const { data: positionData7 } =  useReadContract({
           contract: MandaLinkContract,
           method: "positionsPerPool",
           params: address ? [address.address, BigInt(index), BigInt(6)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(6)]
         });
         const { data: positionData8 } =  useReadContract({
           contract: MandaLinkContract,
           method: "positionsPerPool",
           params: address ? [address.address, BigInt(index), BigInt(7)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(7)]
         });
         const { data: positionData9 } =  useReadContract({
           contract: MandaLinkContract,
           method: "positionsPerPool",
           params: address ? [address.address, BigInt(index), BigInt(8)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(8)]
         });
         const { data: positionData10 } =  useReadContract({
           contract: MandaLinkContract,
           method: "positionsPerPool",
           params: address ? [address.address, BigInt(index), BigInt(9)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(9)]
         });

         const filteredPositions = positionData1 === undefined
         ? [] // Si positionData1 es undefined, asigna un array vacío
         : [
             positionData1?.toString(),
             positionData2?.toString(),
             positionData3?.toString(),
             positionData4?.toString(),
             positionData5?.toString(),
             positionData6?.toString(),
             positionData7?.toString(),
             positionData8?.toString(),
             positionData9?.toString(),
             positionData10?.toString(),
           ].filter(position => position !== undefined && position !== "N/A");
       
       let displayOptions: any;
       console.log(filteredPositions)
       displayOptions = filteredPositions.length > 0 ? filteredPositions : [];



       const { data: getCanPass } =  useReadContract({
        contract: MandaLinkContract,
        method: "getCanPass",
        params: address ? [BigInt(index)] : [BigInt(index)]
      });

      console.log(index)
      console.log(getCanPass)



      const canPassOptions: string[] = getCanPass
      ? getCanPass.map((wallet: string) =>
          wallet === address?.address ? "Tu posición" : wallet
        )
      : [];

  return (
    <div className="w-[45%] lg:min-w-[9.3rem] lg:w-[20%] flex flex-col items-center justify-center rounded-lg m-2 overflow-visible">
      <div className="w-full h-44 text-2xl font-semibold text-center bg-[#632667] rounded-lg px-2 py-4 flex flex-col justify-between relative">
        <div className="absolute flex flex-row top-2 justify-between w-full">
          <div className="w-6 h-6 border border-white flex items-center justify-center text-sm font-semibold rounded-md">
            <p className="text-white">{index}</p>
          </div>
          <Indicator
            amount={userData ? Number(userData) : 0}
            id={index - 1}
            shouldHighlightNextPool={canPassInvestorPools}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center"></div>
        <div className="mt-8 text-white">
          <div className="text-lg font-normal">{t("landing.totalUsers")}</div>
          <div className="text-3xl font-bold">{poolData ? poolData[1].toString() : "0"}</div>
          <div style={{fontSize:"45%"}} className=" font-bold">{t("landing.newUsers")}: {poolData ? poolData[2].toString() : "0"}</div>
        </div>
      </div>
      <CustomSelect options={displayOptions} />  
      {poolData && poolData.length > 4 ? (
  <CustomSelect2 options={canPassOptions} poolData={poolData} />
) : (
  <p>Loading...</p>
)}
    </div>
  );
};


const StatisticsCard2: React.FC<{ stats: UserStats; index: number }> = ({
  stats,
  index,
}) => {
  const { t } = useTranslation();

  const address = useActiveAccount()

  const { data: poolData } = useReadContract({
    contract: MandaLinkContract,
    method: "pools",
    params: [BigInt(index)]
  })

  const { data: userData } = useReadContract({
    contract: MandaLinkContract,
    method: "numberOfDirects",
    params: address ? [address.address] : ["0x0000000000000000000000000000000000000000"]
  })


  const { data: canPassInvestorPools } = useReadContract({
    contract: MandaLinkContract,
    method: "canPassInvestorPools",
    params: address ? [address.address] : ["0x0000000000000000000000000000000000000000"]
  })


  const { data: positionData1 } =  useReadContract({
    contract: MandaLinkContract,
    method: "positionsPerPool",
    params: address ? [address.address, BigInt(index), BigInt(0)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(0)]
  });
  const { data: positionData2 } =  useReadContract({
    contract: MandaLinkContract,
    method: "positionsPerPool",
    params: address ? [address.address, BigInt(index), BigInt(1)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(1)]
  });
  const { data: positionData3 } =  useReadContract({
    contract: MandaLinkContract,
    method: "positionsPerPool",
    params: address ? [address.address, BigInt(index), BigInt(2)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(2)]
  });
  const { data: positionData4 } =  useReadContract({
    contract: MandaLinkContract,
    method: "positionsPerPool",
    params: address ? [address.address, BigInt(index), BigInt(3)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(3)]
  });
  const { data: positionData5 } =  useReadContract({
    contract: MandaLinkContract,
    method: "positionsPerPool",
    params: address ? [address.address, BigInt(index), BigInt(4)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(4)]
  });
  const { data: positionData6 } =  useReadContract({
    contract: MandaLinkContract,
    method: "positionsPerPool",
    params: address ? [address.address, BigInt(index), BigInt(5)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(5)]
  });
  const { data: positionData7 } =  useReadContract({
    contract: MandaLinkContract,
    method: "positionsPerPool",
    params: address ? [address.address, BigInt(index), BigInt(6)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(6)]
  });
  const { data: positionData8 } =  useReadContract({
    contract: MandaLinkContract,
    method: "positionsPerPool",
    params: address ? [address.address, BigInt(index), BigInt(7)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(7)]
  });
  const { data: positionData9 } =  useReadContract({
    contract: MandaLinkContract,
    method: "positionsPerPool",
    params: address ? [address.address, BigInt(index), BigInt(8)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(8)]
  });
  const { data: positionData10 } =  useReadContract({
    contract: MandaLinkContract,
    method: "positionsPerPool",
    params: address ? [address.address, BigInt(index), BigInt(9)] : ["0x0000000000000000000000000000000000000000", BigInt(index), BigInt(9)]
  });

  const filteredPositions = positionData1 === undefined
  ? [] // Si positionData1 es undefined, asigna un array vacío
  : [
      positionData1?.toString(),
      positionData2?.toString(),
      positionData3?.toString(),
      positionData4?.toString(),
      positionData5?.toString(),
      positionData6?.toString(),
      positionData7?.toString(),
      positionData8?.toString(),
      positionData9?.toString(),
      positionData10?.toString(),
    ].filter(position => position !== undefined && position !== "N/A");

let displayOptions: any;
console.log(filteredPositions)
displayOptions = filteredPositions.length > 0 ? filteredPositions : [];



const { data: getCanPass } =  useReadContract({
 contract: MandaLinkContract,
 method: "getCanPass",
 params: address ? [BigInt(index)] : [BigInt(index)]
});

console.log(index)
console.log(getCanPass)



const canPassOptions: string[] = getCanPass
? getCanPass.map((wallet: string) =>
   wallet === address?.address ? "Tu posición" : wallet
 )
: [];

  return (
    <div className="w-[45%] lg:min-w-[9.3rem] lg:w-[20%] flex flex-col items-center justify-center rounded-lg m-2 overflow-visible">
      <div className="w-full h-44 text-2xl font-semibold text-center bg-[#632667] rounded-lg px-2 py-4 flex flex-col justify-between relative">
        <div className="absolute flex flex-row top-2 justify-between w-full">
          <div className="w-6 h-6 border border-white flex items-center justify-center text-sm font-semibold rounded-md">
            <p className="text-white">{index}</p>
          </div>
          <Indicator
            amount={userData ? Number(userData) : 0}
            id={index - 1}
            shouldHighlightNextPool={canPassInvestorPools}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center"></div>
        <div className="mt-8 text-white">
          <div className="text-lg font-normal">{t("landing.totalUsers")}</div>
          <div className="text-3xl font-bold">{poolData ? poolData[1].toString() : "0"}</div>
          <div style={{fontSize:"45%"}} className=" font-bold">{t("landing.newUsers")}: {poolData ? poolData[2].toString() : "0"}</div>
        </div>
      </div>
      <CustomSelect options={displayOptions} />  
      {poolData && poolData.length > 4 ? (
  <CustomSelect2 options={canPassOptions} poolData={poolData} />
) : (
  <p>Loading...</p>
)}
    </div>
  );
};

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ stats }) => {
  const { t } = useTranslation();

    // Las primeras 4 cartas para "Networking"
    const networkingStats = stats.slice(0, 4);

    // Las siguientes 3 cartas para "Inversor"
    const inversorStats = stats.slice(4, 7);

    return (
      <div className="StatisticsSection mt-20 flex flex-col items-center">
        <h1 className="w-full text-2xl font-bold mb-4 flex flex-col items-start">
          <span>{t("landing.statistics")}</span>
        </h1>
  
        {/* Sección Networking */}
          <h2 className="text-lg font-semibold">Networking</h2>
          
        <div className="flex flex-wrap justify-center">
          {networkingStats.map((stat, index) => (
            <StatisticsCard key={index} stats={stat} index={index + 1} />
          ))}
        </div>
  
          <h2 className="text-lg font-semibold">{t("landing.investor")}</h2>

          <div className="flex justify-center space-x-4">
            {inversorStats.map((stat, index) => (
              <StatisticsCard2 key={index} stats={stat} index={index + 5} />
            ))}
          </div>
      </div>
    );
};

export default StatisticsSection;
