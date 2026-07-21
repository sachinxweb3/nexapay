"use client";

import Card from "@/components/ui/Card";

export function SendAssetForm() {
  return (
    <Card>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white">
            New Transaction
          </h2>

          <p className="mt-2 text-zinc-400">
            Select an asset and enter the recipient address.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Asset
            </label>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white">
              Asset selector coming next…
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Recipient
            </label>

            <input
              placeholder="0x..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Amount
            </label>

            <input
              placeholder="0.0"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-500"
            />
          </div>

          <button
            disabled
            className="w-full rounded-xl bg-sky-600 py-3 font-semibold text-white opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </Card>
  );
}