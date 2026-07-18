"use client";

type Props = {
  totalValue: number;
  previousValue: number;
};

export default function PortfolioStats({
  totalValue,
  previousValue,
}: Props) {
  const change = totalValue - previousValue;

  const percent =
    previousValue > 0
      ? (change / previousValue) * 100
      : 0;

  const positive = change >= 0;

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-500">
          Portfolio Value
        </p>

        <h3 className="mt-2 text-3xl font-bold text-white">
          ${totalValue.toFixed(2)}
        </h3>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-500">
          24h Change
        </p>

        <h3
          className={`mt-2 text-3xl font-bold ${
            positive
              ? "text-emerald-400"
              : "text-red-400"
          }`}
        >
          {positive ? "+" : "-"}$
          {Math.abs(change).toFixed(2)}
        </h3>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-500">
          24h %
        </p>

        <h3
          className={`mt-2 text-3xl font-bold ${
            positive
              ? "text-emerald-400"
              : "text-red-400"
          }`}
        >
          {positive ? "+" : ""}
          {percent.toFixed(2)}%
        </h3>
      </div>
    </div>
  );
}