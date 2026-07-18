"use client";

import Card from "@/components/ui/Card";
import { useTransactions } from "@/hooks/useTransactions";

export function TransactionHistory() {
  const { transactions, loading } = useTransactions();

  return (
    <Card>
      <div>
        <h2 className="text-2xl font-bold text-white">
          Recent Transactions
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Live on-chain activity
        </p>
      </div>

      {loading ? (
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
          Loading transactions...
        </div>
      ) : transactions.length === 0 ? (
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
          No transactions found.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.hash}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-800/70"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {tx.asset}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    {new Date(
                      tx.metadata.blockTimestamp
                    ).toLocaleString()}
                  </p>
                </div>

                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-300">
                  {formatCategory(tx.category)}
                </span>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-zinc-500">
                    Value
                  </p>

                  <p className="mt-1 text-2xl font-bold text-white">
                    {tx.value} {tx.asset}
                  </p>
                </div>

                <a
                  href={`https://basescan.org/tx/${tx.hash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
                >
                  View on Basescan →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function formatCategory(category: string) {
  switch (category.toLowerCase()) {
    case "external":
      return "External";

    case "erc20":
      return "ERC-20";

    case "internal":
      return "Internal";

    default:
      return category;
  }
}