"use client";

interface OverviewCardsProps {
  totalValue: number;
  previousValue: number;
  assets: number;
  topAsset?: string;
}

export default function OverviewCards({
  totalValue,
  previousValue,
  assets,
  topAsset,
}: OverviewCardsProps) {
  const change = totalValue - previousValue;

  const changePercent =
    previousValue === 0
      ? 0
      : (change / previousValue) * 100;

  return (
    <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {/* Portfolio Value */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:scale-[1.02]">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Portfolio Value
        </p>

        <h2 className="mt-4 text-4xl font-black text-white">
          ${totalValue.toFixed(2)}
        </h2>

        <p className="mt-3 text-sm text-zinc-400">
          Current wallet value
        </p>
      </div>

      {/* 24H Change */}

      <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-6 backdrop-blur-xl transition hover:scale-[1.02]">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          24H Change
        </p>

        <h2
          className={`mt-4 text-4xl font-black ${
            change >= 0
              ? "text-emerald-400"
              : "text-red-400"
          }`}
        >
          {change >= 0 ? "+" : ""}
          {changePercent.toFixed(2)}%
        </h2>

        <p className="mt-3 text-sm text-zinc-400">
          ${Math.abs(change).toFixed(2)}
        </p>
      </div>

      {/* Assets */}

      <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent p-6 backdrop-blur-xl transition hover:scale-[1.02]">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Assets
        </p>

        <h2 className="mt-4 text-4xl font-black text-cyan-300">
          {assets}
        </h2>

        <p className="mt-3 text-sm text-zinc-400">
          Tokens in wallet
        </p>
      </div>

      {/* Largest Holding */}

      <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-transparent p-6 backdrop-blur-xl transition hover:scale-[1.02]">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Largest Holding
        </p>

        <h2 className="mt-4 text-4xl font-black text-violet-300">
          {topAsset ?? "--"}
        </h2>

        <p className="mt-3 text-sm text-zinc-400">
          Highest value asset
        </p>
      </div>
    </div>
  );
}