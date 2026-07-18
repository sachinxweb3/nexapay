"use client";

import { useMemo } from "react";

import Card from "@/components/ui/Card";
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

    return [
      {
        symbol: nativeSymbol,
        balance: nativeBalance,
        value: nativeBalance * nativePrice,
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

          case "WETH":
            price = prices.ethereum;
            break;
        }

        return {
          symbol: token.symbol,
          balance,
          value: balance * price,
        };
      }),
    ];
  }, [
    balances,
    nativeBalance,
    nativePrice,
    nativeSymbol,
    prices,
  ]);

  const totalValue = portfolio.reduce(
    (sum, token) => sum + token.value,
    0
  );

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
          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm uppercase tracking-wide text-zinc-500">
              Total Portfolio Value
            </p>

            <h3 className="mt-3 text-5xl font-bold text-white">
              ${loading ? "..." : totalValue.toFixed(2)}
            </h3>

            <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Network
                </p>

                <p className="mt-1 font-medium text-white">
                  {network}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Assets
                </p>

                <p className="mt-1 font-medium text-white">
                  {portfolio.length}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-800">
            <div className="grid grid-cols-3 border-b border-zinc-800 bg-zinc-900 px-5 py-4 text-sm font-semibold text-zinc-400">
              <span>Token</span>
              <span className="text-center">
                Balance
              </span>
              <span className="text-right">
                Value
              </span>
            </div>

            {(isLoading || loading) && (
              <div className="p-6 text-center text-zinc-400">
                Loading portfolio...
              </div>
            )}

            {!isLoading &&
              !loading &&
              portfolio.map((token) => (
                <div
                  key={token.symbol}
                  className="grid grid-cols-3 border-t border-zinc-800 px-5 py-4 transition-colors hover:bg-zinc-900/60"
                >
                  <span className="font-medium text-white">
                    {token.symbol}
                  </span>

                  <span className="text-center text-zinc-300">
                    {token.balance.toFixed(4)}
                  </span>

                  <span className="text-right font-medium text-white">
                    ${token.value.toFixed(2)}
                  </span>
                </div>
              ))}
          </div>
        </>
      )}
    </Card>
  );
}