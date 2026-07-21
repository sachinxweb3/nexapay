"use client";

import React from "react";

import Section from "@/components/ui/Section";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { OverviewStats } from "@/components/dashboard/OverviewStats";
import { WalletStatusCard } from "@/components/wallet/WalletStatusCard";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { TransactionHistory } from "@/components/transactions/TransactionHistory";

export function AppShell() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070D] text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[180px]" />
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[200px]" />
        <div className="absolute bottom-0 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[180px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 py-10 lg:px-10">
        {/* Hero */}
        <HeroSection />

        {/* Premium Overview Stats */}
        <div className="mt-8">
          <OverviewStats />
        </div>

        {/* Wallet + Portfolio */}
        <div className="mt-12">
          <Section
            title="Portfolio Overview"
            subtitle="Monitor your wallets, balances and supported networks."
          >
            <div className="grid gap-6 xl:grid-cols-2">
              <WalletStatusCard />
              <PortfolioCard />
            </div>
          </Section>
        </div>

        {/* Transactions */}
        <div className="mt-12">
          <Section
            title="Recent Transactions"
            subtitle="Latest blockchain activity across supported networks."
          >
            <TransactionHistory />
          </Section>
        </div>
      </div>
    </main>
  );
}