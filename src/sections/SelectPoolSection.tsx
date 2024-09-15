import React from "react";

const Card: React.FC<{ amount: string }> = ({ amount }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg m-2">
      <div className="text-xl font-semibold">{amount}</div>
      <button className="mt-2 bg-transparent text-blue-500 border border-blue-500 rounded px-4 py-2">
        BUY POSITION
      </button>
    </div>
  );
};

const SelectPoolSection: React.FC = () => {
  const amounts: string[] = [
    "50 USDT",
    "100 USDT",
    "200 USDT",
    "300 USDT",
    "400 USDT",
    "500 USDT",
    "1.000 USDT",
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">ELIJE POOL</h1>
      <div className="flex flex-wrap justify-center">
        {amounts.map((amount) => (
          <Card key={amount} amount={amount} />
        ))}
      </div>
    </div>
  );
};

export default SelectPoolSection;
