import { MandaLinkAddress, MandaLinkContract, USDTContract } from "@/utils/contracts";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { prepareContractCall, sendTransaction, waitForReceipt } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { client } from "@/client";
import { chain } from "@/chain";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card: React.FC<{ id: number, amount: string }> = ({ id, amount }) => {
  const { t } = useTranslation();
  const address = useActiveAccount();
  const [referral, setReferral] = useState<string | null>("");

  // Estado para manejar la compra
  const [isProcessing, setIsProcessing] = useState(false);  // Muestra el overlay
  const [transactionStatus, setTransactionStatus] = useState<"idle" | "processing" | "success" | "error">("idle"); // Muestra el mensaje

  const { data: user } = useReadContract({
    contract: MandaLinkContract,
    method: "users",
    params: address ? [address.address] : ["0x0000000000000000000000000000000000000000"]
  });

  const handleTransaction = async (ref: string) => {
    if (address) {
      try {
        setIsProcessing(true); // Empieza el proceso
        setTransactionStatus("processing");

        // APROVE
        const approvalToken = prepareContractCall({
          contract: USDTContract,
          method: "approve",
          params: [MandaLinkContract.address, BigInt(Number(value) * 10**6)],
          gasPrice: BigInt(150000000000)
        });

        const { transactionHash: approveHash } = await sendTransaction({
          transaction: approvalToken,
          account: address,
        });

        await waitForReceipt({
          client: client,
          chain: chain,
          transactionHash: approveHash
        });
        console.log("Aprovado")

        // COMPRA POOL
        // const transaction = prepareContractCall({
        //   contract: MandaLinkContract,
        //   method: "function joinPool(uint256 poolId, address referrer, address wallet)",
        //   params: [BigInt(id + 1), ref, address.address],
        //   gasPrice: BigInt(40000000000),
        // })

        // const { transactionHash: joinPoolHash } = await sendTransaction({
        //   transaction,
        //   account: address
        // });

        // await waitForReceipt({
        //   client: client,
        //   chain: chain,
        //   transactionHash: joinPoolHash
        // });


        const transaction = prepareContractCall({
          contract: MandaLinkContract,
          method: "function joinPool(uint256 poolId, address referrer, address wallet)",
          params: [BigInt(id + 1), ref, address.address],
          gasPrice: BigInt(40000000000)
        })

        const { transactionHash: joinPoolHash } = await sendTransaction({
          transaction,
          account: address
        })

        const joinPoolReceipt = await waitForReceipt({
          client: client,
          chain: chain,
          transactionHash: joinPoolHash
        })

        console.log(joinPoolReceipt)

        console.log("Comprado")

        // Si la compra fue exitosa
        setTransactionStatus("success");
        compraExitosa()

        setTimeout(() => {
          window.location.reload();  // Recarga después de mostrar éxito
        }, 2000);

      } catch (error) {
      //  console.error(error);
      //  compraError()
      console.log("ERORR!!!!!")
      console.log(error)
      alert("ERROR EN LA COMPRA")
      console.log(error)
      //  setTransactionStatus("error"); // En caso de error, muestra el mensaje
      } finally {
        setIsProcessing(false); // Detén el proceso
      }
    }
  };

  const handleJoinPool = async (id: number) => {
    if (user && user[0] != "0x0000000000000000000000000000000000000000") {
      handleTransaction("0x0000000000000000000000000000000000000000");
    } else {
      if (referral) {
        handleTransaction(referral);
      } else {
        alert("Por favor ingrese con un link de referido");
      }
    }
  };

  const [value, currency] = amount.split(" ");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setReferral(searchParams.get("REF"));
  }, []);


  const compraExitosa = () => toast.success('Compra realizada con exito', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const compraError = () => toast('Error en la compra', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  return (
    <>
     <ToastContainer />
      {isProcessing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
          <div className="text-white text-lg">
            {t("landing.buyText")}
          </div>
        </div>
      )}
      <div className="w-[45%] lg:w-[20%] flex flex-col items-center justify-center rounded-lg m-2 overflow-visible">
        <div className="w-full h-44 text-2xl font-semibold text-center bg-[#632667] rounded-lg px-2 py-4 flex flex-col justify-between relative">
          <div className="absolute flex flex-row top-2 justify-between w-full">
            <div className="w-6 h-6 border border-white flex items-center justify-center text-sm font-semibold rounded-md">
              <p className="text-white">{id + 1}</p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center"></div>
          <div className="mt-8 text-white">
            <div className="text-3xl font-bold">{value}</div>
            <div className="text-3xl font-bold">{currency}</div>
          </div>
        </div>
        {address && (
          <button
            className="mt-2 bg-[#632667] text-white text-base rounded-md px-2 py-1 w-full min-h-10 shadow-md hover:!bg-opacity-80 hover:outline outline-1"
            onClick={() => handleJoinPool(id)}
            disabled={isProcessing} // Desactiva el botón durante el procesamiento
          >
            {t("landing.buyPosition")}
          </button>
        )}
      </div>
    </>
  );
};

const SelectPoolSection: React.FC = () => {
  const { t } = useTranslation();

  const amounts: string[] = [
    "50 USDT",
    "100 USDT",
    "200 USDT",
    "300 USDT",
    "400 USDT",
    "500 USDT",
    "1000 USDT",
  ];

  return (
    <div className="SelectPoolSection w-full mt-20 flex flex-col items-center">
      <h1 className="w-full text-2xl font-bold mb-4 flex flex-col items-start">
        <span className="text-left">{t("landing.selectPool")}</span>
      </h1>
      <div className="flex flex-wrap justify-center">
        {amounts?.map((amount, index) => (
          <Card key={index} id={index} amount={amount} />
        ))}
      </div>
    </div>
  );
};

export default SelectPoolSection;
