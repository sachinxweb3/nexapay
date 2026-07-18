"use client";

import React from "react";

import Section from "@/components/ui/Section";
import { WalletConnectButton } from "@/components/wallet/WalletConnectButton";
import { WalletStatusCard } from "@/components/wallet/WalletStatusCard";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { TransactionHistory } from "@/components/transactions/TransactionHistory";

export function AppShell() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight">
              NexaPay
            </h1>

            <p className="mt-3 text-lg text-zinc-400">
              Multi-chain Wallet Dashboard
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Built on Arc Network
            </p>
          </div>

          <WalletConnectButton />
        </header>

        {/* Wallet + Portfolio */}
        <Section
          title="Overview"
          subtitle="Monitor your wallet and portfolio across supported networks."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <WalletStatusCard />
            <PortfolioCard />
          </div>
        </Section>

        {/* Transactions */}
        <div className="mt-10">
          <Section
            title="Recent Transactions"
            subtitle="Latest on-chain activity."
          >
            <TransactionHistory />
          </Section>
        </div>
      </div>
    </main>
  );
}