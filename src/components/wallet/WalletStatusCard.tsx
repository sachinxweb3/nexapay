"use client";

import { useState } from "react";

import Card from "@/components/ui/Card";
import { useWallet } from "@/hooks/useWallet";

export function WalletStatusCard() {
  const wallet = useWallet();

  const [copied, setCopied] = useState(false);

  const shortAddress = wallet.address
    ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`
    : "";

  async function handleCopy() {
    if (!wallet.address) return;

    await navigator.clipboard.writeText(wallet.address);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card>
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">
            Wallet
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Overview
          </h2>

        </div>

        <div
          className={`rounded-full border px-4 py-2 text-sm font-semibold ${
            wallet.isConnected
              ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
              : "border-red-500/30 bg-red-500/15 text-red-400"
          }`}
        >
          {wallet.isConnected ? "🟢 Connected" : "🔴 Offline"}
        </div>

      </div>

      {!wallet.isConnected ? (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">

          <div className="mb-4 text-5xl">
            👛
          </div>

          <h3 className="text-xl font-semibold text-white">
            Wallet Not Connected
          </h3>

          <p className="mt-3 text-zinc-400">
            Connect your wallet to access portfolio,
            balances and transaction history.
          </p>

        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            <StatCard
              title="Network"
              value={wallet.chain?.name ?? "Unknown"}
              color="emerald"
            />

            <StatCard
              title="Chain ID"
              value={wallet.chainId?.toString() ?? "-"}
              color="cyan"
            />

            <StatCard
              title="Balance"
              value={
                wallet.isBalanceLoading
                  ? "Loading..."
                  : wallet.balance
                  ? `${Number(wallet.balance.formatted).toFixed(4)} ${wallet.balance.symbol}`
                  : "0"
              }
              color="violet"
            />

            <StatCard
              title="Status"
              value="Active"
              color="orange"
            />

          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  Wallet Address
                </p>

                <h3 className="mt-2 text-lg font-semibold text-white">
                  {shortAddress}
                </h3>

              </div>

              <button
                onClick={handleCopy}
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:scale-105"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>

            </div>

          </div>
        </>
      )}
    </Card>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  color: "emerald" | "cyan" | "violet" | "orange";
}

function StatCard({
  title,
  value,
  color,
}: StatCardProps) {
  const colors = {
    emerald:
      "from-emerald-500/20 to-emerald-400/5 border-emerald-500/20",
    cyan:
      "from-cyan-500/20 to-cyan-400/5 border-cyan-500/20",
    violet:
      "from-violet-500/20 to-violet-400/5 border-violet-500/20",
    orange:
      "from-orange-500/20 to-orange-400/5 border-orange-500/20",
  };

  return (
    <div
      className={`rounded-2xl border bg-gradient-to-br p-5 ${colors[color]}`}
    >
      <p className="text-xs uppercase tracking-widest text-zinc-500">
        {title}
      </p>

      <h3 className="mt-3 text-xl font-bold text-white break-all">
        {value}
      </h3>
    </div>
  );
}