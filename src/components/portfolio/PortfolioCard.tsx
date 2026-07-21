"use client";

import { useMemo } from "react";

import Card from "@/components/ui/Card";
import PortfolioAllocationChart from "@/components/portfolio/PortfolioAllocationChart";
import PortfolioStats from "@/components/portfolio/PortfolioStats";
import TokenLogo from "@/components/ui/TokenLogo";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useTokenPrices } from "@/hooks/useTokenPrices";
import { useWallet } from "@/hooks/useWallet";

export function PortfolioCard() {
  const wallet = useWallet();
  const { balances, isLoading } = useTokenBalances();
  const { prices, loading } = useTokenPrices();

  const nativeBalance = wallet.balance
    ? Number(wallet.balance.formatted)
    : 0;

  const nativeSymbol = wallet.balance?.symbol ?? "--";

  const network = wallet.chain?.name ?? "Unknown";

  const nativePrice =
    wallet.chain?.id === 137
      ? prices?.polygon ?? 0
      : prices?.ethereum ?? 0;

  const portfolio = useMemo(() => {
    if (!prices) return [];

    const assets = [
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

  const totalValue = portfolio.reduce(
    (sum, token) => sum + token.value,
    0
  );

  const previousValue = totalValue * 0.975;

  const topAsset = portfolio[0];

  return (
    <Card>
      <div>
        <h2 className="text-2xl font-bold text-white">
          Portfolio
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Live blockchain portfolio
        </p>
      </div>

      {!wallet.isConnected ? (
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-zinc-400">
          Connect your wallet to view your portfolio.
        </div>
      ) : (
        <>
          <div className="mt-8 rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6">
            <p className="text-sm uppercase tracking-wide text-zinc-500">
              Total Portfolio Value
            </p>

            <h3 className="mt-3 text-5xl font-bold text-white">
              {loading ? "..." : `$${totalValue.toFixed(2)}`}
            </h3>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-zinc-800 pt-5">
              <div>
                <p className="text-xs uppercase text-zinc-500">
                  Network
                </p>

                <p className="mt-1 font-semibold text-white">
                  {network}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs uppercase text-zinc-500">
                  Assets
                </p>

                <p className="mt-1 font-semibold text-white">
                  {portfolio.length}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs uppercase text-zinc-500">
                  Largest
                </p>

                <p className="mt-1 font-semibold text-emerald-400">
                  {topAsset?.symbol ?? "--"}
                </p>
              </div>
            </div>
          </div>

          <PortfolioStats
            totalValue={totalValue}
            previousValue={previousValue}
          />

          <PortfolioAllocationChart
            data={portfolio.map((item) => ({
              symbol: item.symbol,
              value: item.value,
            }))}
          />

          <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-800">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-b border-zinc-800 bg-zinc-900 px-5 py-4 text-sm font-semibold text-zinc-400">
              <span>Asset</span>
              <span className="text-center">Balance</span>
              <span className="text-right">Value</span>
              <span className="text-right">Allocation</span>
            </div>

            {(loading || isLoading) && (
              <div className="p-6 text-center text-zinc-400">
                Loading portfolio...
              </div>
            )}

            {!loading &&
              !isLoading &&
              portfolio.map((token) => {
                const percent =
                  totalValue === 0
                    ? 0
                    : (token.value / totalValue) * 100;

                return (
                  <div
                    key={token.symbol}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center border-t border-zinc-800 px-5 py-4 transition hover:bg-zinc-900/60"
                  >
                    <div className="flex items-center gap-3">
                      <TokenLogo
                        symbol={token.symbol}
                        address={token.address}
                        chainId={token.chainId}
                        size={38}
                      />

                      <div>
                        <p className="font-semibold text-white">
                          {token.symbol}
                        </p>

                        <p className="text-xs text-zinc-500">
                          Digital Asset
                        </p>
                      </div>
                    </div>

                    <span className="text-center text-zinc-300">
                      {token.balance.toLocaleString(undefined, {
                        maximumFractionDigits: 4,
                      })}
                    </span>

                    <span className="text-right font-semibold text-white">
                      ${token.value.toFixed(2)}
                    </span>

                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm font-semibold text-emerald-400">
                        {percent.toFixed(1)}%
                      </span>

                      <div className="h-2 w-24 overflow-hidden rounded-full bg-zinc-800">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{
                            width: `${percent}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </Card>
  );
}