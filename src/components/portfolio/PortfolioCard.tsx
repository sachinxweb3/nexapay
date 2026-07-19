"use client";

import { useMemo } from "react";

import Card from "@/components/ui/Card";
import PortfolioAllocationChart from "@/components/portfolio/PortfolioAllocationChart";
import PortfolioStats from "@/components/portfolio/PortfolioStats";
import TokenLogo from "@/components/ui/TokenLogo";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useTokenPrices } from "@/hooks/useTokenPrices";
import { useWallet } from "@/hooks/useWallet";

interface PortfolioAsset {
  symbol: string;
  balance: number;
  value: number;
  address?: string;
  chainId?: number;
}

export function PortfolioCard() {
  const wallet = useWallet();
  const { balances, isLoading: isBalancesLoading } = useTokenBalances();
  const { prices, loading: isPricesLoading } = useTokenPrices();

  const isLoading = isBalancesLoading || isPricesLoading;

  const nativeBalance = wallet.balance
    ? Number(wallet.balance.formatted)
    : 0;

  const nativeSymbol = wallet.balance?.symbol ?? "--";
  const network = wallet.chain?.name ?? "Unknown";

  const nativePrice =
    wallet.chain?.id === 137
      ? prices?.polygon ?? 0
      : prices?.ethereum ?? 0;

  const portfolio = useMemo<PortfolioAsset[]>(() => {
    if (!prices) return [];

    const assets: PortfolioAsset[] = [
      {
        symbol: nativeSymbol,
        balance: nativeBalance,
        value: nativeBalance * nativePrice,
        address: undefined,
        chainId: wallet.chain?.id,
      },
      ...balances.map((token) => {
        const balance = Number(token.balance);
        let price = 0;

        switch (token.symbol) {
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
        }

        return {
          symbol: token.symbol,
          balance,
          value: balance * price,
          address: token.address,
          chainId: token.chainId,
        };
      }),
    ];

    return assets
      .filter((asset) => asset.balance > 0)
      .sort((a, b) => b.value - a.value);
  }, [
    balances,
    nativeBalance,
    nativePrice,
    nativeSymbol,
    prices,
    wallet.chain?.id,
  ]);

  const totalValue = portfolio.reduce((sum, token) => sum + token.value, 0);
  const previousValue = totalValue * 0.975; // Simulated 24h previous value
  const topAsset = portfolio[0];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 4,
    }).format(value);

  return (
    <Card className="flex flex-col gap-8 overflow-hidden rounded-[32px] border border-white/5 bg-zinc-950/50 p-6 shadow-2xl backdrop-blur-2xl lg:p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Portfolio Overview
          </h2>
          <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Live blockchain portfolio
          </p>
        </div>
      </div>

      {!wallet.isConnected ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[24px] border border-white/5 bg-zinc-900/30 p-8 text-center backdrop-blur-md">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800/50 ring-1 ring-white/10">
            <svg
              className="h-8 w-8 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white">Wallet Disconnected</h3>
          <p className="mt-2 max-w-sm text-sm text-zinc-400">
            Connect your Web3 wallet to securely view your portfolio, track assets, and manage your crypto wealth.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Hero Stats Card */}
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-8 shadow-xl">
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px]" />

            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Total Portfolio Value
              </p>
              <h3 className="mt-4 text-5xl font-extrabold tracking-tighter text-white sm:text-6xl">
                {isLoading ? (
                  <div className="h-14 w-64 animate-pulse rounded-xl bg-white/10" />
                ) : (
                  formatCurrency(totalValue)
                )}
              </h3>

              <div className="mt-10 grid grid-cols-3 gap-6 divide-x divide-white/10 border-t border-white/10 pt-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Network
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-white sm:text-base">
                    {network}
                  </p>
                </div>
                <div className="pl-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Assets
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white sm:text-base">
                    {isLoading ? (
                      <span className="inline-block h-5 w-8 animate-pulse rounded bg-white/10" />
                    ) : (
                      portfolio.length
                    )}
                  </p>
                </div>
                <div className="pl-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Largest Holding
                  </p>
                  <p className="mt-2 text-sm font-semibold text-emerald-400 sm:text-base">
                    {isLoading ? (
                      <span className="inline-block h-5 w-12 animate-pulse rounded bg-white/10" />
                    ) : (
                      topAsset?.symbol ?? "--"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts & Analytics */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-[24px] border border-white/5 bg-zinc-900/40 p-6">
              <PortfolioStats
                totalValue={totalValue}
                previousValue={previousValue}
              />
            </div>
            <div className="rounded-[24px] border border-white/5 bg-zinc-900/40 p-6">
              <PortfolioAllocationChart
                data={portfolio.map((item) => ({
                  symbol: item.symbol,
                  value: item.value,
                }))}
              />
            </div>
          </div>

          {/* Assets Table */}
          <div className="flex flex-col overflow-hidden rounded-[24px] border border-white/5 bg-zinc-900/40">
            {/* Table Header */}
            <div className="hidden grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 border-b border-white/5 bg-zinc-900/80 px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500 sm:grid">
              <span>Asset</span>
              <span className="text-right">Balance</span>
              <span className="text-right">Value</span>
              <span className="text-right">Allocation</span>
            </div>

            {/* Table Body */}
            <div className="flex flex-col divide-y divide-white/5">
              {isLoading ? (
                // Loading Skeletons
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 items-center gap-4 px-6 py-5 sm:grid-cols-[2fr_1fr_1fr_1fr]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 animate-pulse rounded-full bg-white/10" />
                      <div className="space-y-2">
                        <div className="h-4 w-16 animate-pulse rounded bg-white/10" />
                        <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
                      </div>
                    </div>
                    <div className="hidden justify-end sm:flex">
                      <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
                    </div>
                    <div className="flex justify-end">
                      <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
                    </div>
                    <div className="hidden flex-col items-end gap-2 sm:flex">
                      <div className="h-3 w-10 animate-pulse rounded bg-white/10" />
                      <div className="h-1.5 w-24 animate-pulse rounded-full bg-white/5" />
                    </div>
                  </div>
                ))
              ) : portfolio.length === 0 ? (
                // Empty State
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-3 rounded-full bg-zinc-800/50 p-3 text-zinc-500">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 12H4m8-8v16"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-white">No assets found</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Your wallet doesn't have any supported tokens on this network.
                  </p>
                </div>
              ) : (
                // Data Rows
                portfolio.map((token) => {
                  const percent =
                    totalValue === 0 ? 0 : (token.value / totalValue) * 100;

                  return (
                    <div
                      key={token.symbol}
                      className="group grid grid-cols-2 items-center gap-4 px-6 py-5 transition-colors duration-300 hover:bg-white/[0.02] sm:grid-cols-[2fr_1fr_1fr_1fr]"
                    >
                      {/* Asset Info */}
                      <div className="flex items-center gap-4">
                        <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-zinc-800 shadow-inner ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105 group-hover:ring-white/20">
                          <TokenLogo
                            symbol={token.symbol}
                            address={token.address}
                            chainId={token.chainId}
                            size={40}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-white">
                            {token.symbol}
                          </span>
                          <span className="text-xs font-medium text-zinc-500">
                            Digital Asset
                          </span>
                        </div>
                      </div>

                      {/* Balance (Hidden on mobile) */}
                      <div className="hidden flex-col items-end sm:flex">
                        <span className="text-sm font-semibold text-zinc-300">
                          {formatNumber(token.balance)}
                        </span>
                      </div>

                      {/* Value */}
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-white sm:text-base">
                          {formatCurrency(token.value)}
                        </span>
                        {/* Mobile Balance Display */}
                        <span className="text-xs font-medium text-zinc-500 sm:hidden">
                          {formatNumber(token.balance)} {token.symbol}
                        </span>
                      </div>

                      {/* Allocation (Hidden on mobile) */}
                      <div className="hidden flex-col items-end justify-center gap-2 sm:flex">
                        <span className="text-xs font-bold text-emerald-400">
                          {percent.toFixed(1)}%
                        </span>
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-zinc-800/80 shadow-inner">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-1000 ease-out"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

