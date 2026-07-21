"use client";

import Card from "@/components/ui/Card";
import {
  Wallet,
  Coins,
  Globe,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Portfolio Value",
    value: "$24,580.42",
    subtitle: "+5.42% Today",
    icon: TrendingUp,
    color: "text-emerald-400",
  },
  {
    title: "Assets",
    value: "12",
    subtitle: "Across wallets",
    icon: Coins,
    color: "text-yellow-400",
  },
  {
    title: "Networks",
    value: "5",
    subtitle: "Ethereum • Base • Polygon",
    icon: Globe,
    color: "text-sky-400",
  },
  {
    title: "Wallet",
    value: "Connected",
    subtitle: "Ready for transactions",
    icon: Wallet,
    color: "text-violet-400",
  },
];

export function OverviewStats() {
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