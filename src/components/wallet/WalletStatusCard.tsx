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

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Wallet Status
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Current wallet connection
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            wallet.isConnected
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-red-500/15 text-red-400"
          }`}
        >
          {wallet.isConnected ? "Connected" : "Disconnected"}
        </span>
      </div>

      {!wallet.isConnected ? (
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-zinc-400">
            Connect your wallet to view account details.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          <InfoRow
            label="Address"
            value={shortAddress}
            action={
              <button
                onClick={handleCopy}
                className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            }
          />

          <InfoRow
            label="Network"
            value={wallet.chain?.name ?? "Unknown"}
          />

          <InfoRow
            label="Chain ID"
            value={wallet.chainId?.toString() ?? "-"}
          />

          <InfoRow
            label="Balance"
            value={
              wallet.isBalanceLoading
                ? "Loading..."
                : wallet.balance
                ? `${Number(wallet.balance.formatted).toFixed(4)} ${
                    wallet.balance.symbol
                  }`
                : "0"
            }
          />
        </div>
      )}
    </Card>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  action?: React.ReactNode;
}

function InfoRow({
  label,
  value,
  action,
}: InfoRowProps) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
        <span className="font-medium text-white">
          {value}
        </span>

        {action}
      </div>
    </div>
  );
}