"use client";

import { useEffect, useMemo, useState } from "react";

import Card from "@/components/ui/Card";
import AssetSelector, {
  type AssetOption,
} from "@/components/send/AssetSelector";

import { useWallet } from "@/hooks/useWallet";
import { useTokenBalances } from "@/hooks/useTokenBalances";

export function SendAssetForm() {
  const wallet = useWallet();
  const { balances, isLoading } = useTokenBalances();

  const [selectedAsset, setSelectedAsset] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const nativeAsset = useMemo<AssetOption | null>(() => {
    if (!wallet.balance) {
      return null;
    }

    return {
      symbol: wallet.balance.symbol,
      balance: Number(wallet.balance.formatted),
      chainId: wallet.chain?.id,
    };
  }, [wallet.balance, wallet.chain?.id]);

  const assets = useMemo<AssetOption[]>(() => {
    const list: AssetOption[] = [];

    if (nativeAsset && nativeAsset.balance > 0) {
      list.push(nativeAsset);
    }

    balances.forEach((token) => {
      const balance = Number(token.balance);

      if (balance <= 0) {
        return;
      }

      list.push({
        symbol: token.symbol,
        balance,
        address: token.address,
        chainId: token.chainId,
      });
    });

    return list;
  }, [balances, nativeAsset]);

  useEffect(() => {
    if (!selectedAsset && assets.length > 0) {
      setSelectedAsset(assets[0].symbol);
    }
  }, [assets, selectedAsset]);

  const activeAsset = assets.find(
    (asset) => asset.symbol === selectedAsset
  );

  function handleMax() {
    if (!activeAsset) {
      return;
    }

    setAmount(activeAsset.balance.toString());
  }

  return (
    <Card>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white">
            New Transaction
          </h2>

          <p className="mt-2 text-zinc-400">
            Send digital assets from your connected wallet.
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-zinc-400">
            Loading assets...
          </div>
        ) : (
          <>
            <AssetSelector
              assets={assets}
              value={selectedAsset}
              onChange={setSelectedAsset}
            />

            {activeAsset && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="flex justify-between">
                  <span className="text-zinc-400">
                    Available Balance
                  </span>

                  <span className="font-semibold text-white">
                    {activeAsset.balance.toLocaleString(undefined, {
                      maximumFractionDigits: 6,
                    })}{" "}
                    {activeAsset.symbol}
                  </span>
                </div>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-400">
                Recipient Address
              </label>

              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-400">
                Amount
              </label>

              <div className="flex gap-3">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-500"
                />

                <button
                  type="button"
                  onClick={handleMax}
                  disabled={!activeAsset}
                  className="rounded-xl border border-sky-500/30 bg-sky-500/10 px-5 font-semibold text-sky-400 transition hover:bg-sky-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Max
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">
                  Network
                </span>

                <span className="text-white">
                  {wallet.chain?.name ?? "--"}
                </span>
              </div>

              <div className="mt-2 flex justify-between text-sm">
                <span className="text-zinc-400">
                  Estimated Gas
                </span>

                <span className="text-white">
                  Coming Soon
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled
              className="w-full rounded-xl bg-sky-600 py-3 text-lg font-semibold text-white opacity-50"
            >
              Send Asset
            </button>
          </>
        )}
      </div>
    </Card>
  );
}