"use client";

import Card from "@/components/ui/Card";
import { useMemo } from "react";
import {
  Wallet,
  Coins,
  Globe,
  TrendingUp,
} from "lucide-react";

import { useWallet } from "@/hooks/useWallet";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useTokenPrices } from "@/hooks/useTokenPrices";

export function OverviewStats() {
  const wallet = useWallet();
  const { balances } = useTokenBalances();
  const { prices, loading } = useTokenPrices();

  const nativeBalance = wallet.balance
    ? Number(wallet.balance.formatted)
    : 0;

  const nativePrice =
    wallet.chain?.id === 137
      ? prices?.polygon ?? 0
      : prices?.ethereum ?? 0;

  const totalValue = useMemo(() => {
    if (!prices) {
      return nativeBalance * nativePrice;
    }

    let total = nativeBalance * nativePrice;

    for (const token of balances) {
      const balance = Number(token.balance);

      let price = 0;

      switch (token.symbol as string) {
        case "USDC":
          price = prices.usdCoin;
          break;

        case "USDT":
          price = prices.tether;
          break;

        case "ETH":
        case "WETH":
          price = prices.ethereum;
          break;

        default:
          price = 0;
      }

      total += balance * price;
    }

    return total;
  }, [balances, nativeBalance, nativePrice, prices]);

  const stats = [
    {
      title: "Portfolio Value",
      value: loading ? "..." : `$${totalValue.toFixed(2)}`,
      subtitle: wallet.isConnected
        ? "Live Wallet"
        : "Connect Wallet",
      icon: TrendingUp,
      color: "text-emerald-400",
    },
    {
      title: "Assets",
      value: String(balances.length + (nativeBalance > 0 ? 1 : 0)),
      subtitle: "Detected Assets",
      icon: Coins,
      color: "text-yellow-400",
    },
    {
      title: "Network",
      value: wallet.chain?.name ?? "--",
      subtitle: "Connected Chain",
      icon: Globe,
      color: "text-sky-400",
    },
    {
      title: "Wallet",
      value: wallet.isConnected ? "Connected" : "Offline",
      subtitle: wallet.isConnected
        ? "Ready"
        : "Not Connected",
      icon: Wallet,
      color: wallet.isConnected
        ? "text-violet-400"
        : "text-red-400",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">
                  {item.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  {item.value}
                </h3>

                <p className={`mt-2 text-sm ${item.color}`}>
                  {item.subtitle}
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Icon className={`h-7 w-7 ${item.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}