"use client";

import React from "react";

import Section from "@/components/ui/Section";
import { WalletConnectButton } from "@/components/wallet/WalletConnectButton";
import { WalletStatusCard } from "@/components/wallet/WalletStatusCard";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { TransactionHistory } from "@/components/transactions/TransactionHistory";

export function AppShell() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090B] text-white">

      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[180px]" />
      <div className="absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full bg-violet-500/10 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-10">

        {/* Header */}

        <header className="mb-12 flex flex-col gap-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="bg-gradient-to-r from-white via-emerald-300 to-cyan-300 bg-clip-text text-6xl font-black tracking-tight text-transparent">
              NexaPay
            </h1>

            <p className="mt-4 text-lg text-zinc-300">
              Professional Multi-chain Wallet Dashboard
            </p>

            <p className="mt-2 text-sm text-emerald-400">
              Powered by Arc Network
            </p>

          </div>

          <WalletConnectButton />

        </header>

        <Section
          title="Overview"
          subtitle="Monitor your assets across Ethereum, Base, Polygon, Arbitrum and Optimism."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <WalletStatusCard />
            <PortfolioCard />
          </div>
        </Section>

        <div className="mt-10">
          <Section
            title="Recent Transactions"
            subtitle="Latest on-chain activity"
          >
            <TransactionHistory />
          </Section>
        </div>

      </div>
    </main>
  );
}