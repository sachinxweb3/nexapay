"use client";

import TokenLogo from "@/components/ui/TokenLogo";

export type AssetOption = {
  symbol: string;
  balance: number;
  address?: string;
  chainId?: number;
};

type Props = {
  assets: AssetOption[];
  value: string;
  onChange: (symbol: string) => void;
};

export default function AssetSelector({
  assets,
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-400">
        Asset
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-500"
      >
        <option value="">Select Asset</option>

        {assets.map((asset) => (
          <option
            key={`${asset.symbol}-${asset.address ?? "native"}`}
            value={asset.symbol}
          >
            {asset.symbol} • {asset.balance.toFixed(4)}
          </option>
        ))}
      </select>

      {value && (
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <TokenLogo
            symbol={value}
            size={36}
          />

          <span className="font-medium text-white">
            {value}
          </span>
        </div>
      )}
    </div>
  );
}