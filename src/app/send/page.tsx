import { SendAssetForm } from "@/components/send/SendAssetForm";

export default function SendPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Send Crypto
        </h1>

        <p className="mt-2 text-zinc-400">
          Securely send digital assets from your wallet.
        </p>
      </div>

      <SendAssetForm />
    </main>
  );
}