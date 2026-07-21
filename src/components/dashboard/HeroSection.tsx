"use client";

import { WalletConnectButton } from "@/components/wallet/WalletConnectButton";

export function HeroSection() {
  const currentTime = new Date().toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.05] via-transparent to-violet-500/[0.05]" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
            Built on Arc
          </span>

          <h1 className="mt-5 bg-gradient-to-r from-white via-sky-300 to-violet-300 bg-clip-text text-5xl font-black text-transparent lg:text-7xl">
            NexaPay
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-300">
            Securely manage your digital assets across multiple networks with a
            modern dashboard optimized for the Arc ecosystem.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
              🟢 Wallet Ready
            </span>

            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm text-sky-300">
              🌐 Multi-Chain
            </span>

            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              🚀 Arc Ecosystem
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-5 rounded-2xl border border-white/10 bg-black/20 p-6 lg:items-end">
          <div className="text-right">
            <p className="text-sm text-zinc-400">Today</p>
            <p className="font-medium text-white">{currentTime}</p>
          </div>

          <WalletConnectButton />
        </div>
      </div>
    </section>
  );
}