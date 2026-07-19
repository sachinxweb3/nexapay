"use client";

import { useState } from "react";

type TokenLogoProps = {
  symbol: string;
  size?: number;
};

const LOGOS: Record<string, string> = {
  ETH: "279",
  WETH: "279",
  BTC: "1",
  WBTC: "7598",
  USDC: "6319",
  USDT: "325",
  DAI: "9956",
  MATIC: "4713",
  POL: "32440",
  OP: "25244",
  ARB: "16547",
  LINK: "877",
  UNI: "12504",
  AAVE: "12645",
  PEPE: "29850",
  SHIB: "11939",
};

export default function TokenLogo({
  symbol,
  size = 40,
}: TokenLogoProps) {
  const [error, setError] = useState(false);

  const id = LOGOS[symbol.toUpperCase()];

  if (id && !error) {
    return (
      <img
        src={`https://assets.coingecko.com/coins/images/${id}/small.png`}
        alt={symbol}
        width={size}
        height={size}
        className="rounded-full"
        onError={() => setError(true)}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-full bg-zinc-700 font-bold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
    >
      {symbol.charAt(0).toUpperCase()}
    </div>
  );
}