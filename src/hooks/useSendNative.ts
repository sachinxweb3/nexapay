"use client";

import { useCallback } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { isAddress, parseEther } from "viem";

export interface SendNativeParams {
  recipient: string;
  amount: string;
}

export function useSendNative() {
  const {
    data: transactionHash,
    sendTransactionAsync,
    isPending: isAwaitingSignature,
    error: sendError,
  } = useSendTransaction();

  const {
    isLoading: isConfirming,
    isSuccess,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  const sendNative = useCallback(
    async ({ recipient, amount }: SendNativeParams) => {
      const address = recipient.trim();

      if (!isAddress(address)) {
        throw new Error("Invalid recipient address.");
      }

      if (!amount || Number(amount) <= 0) {
        throw new Error("Amount must be greater than zero.");
      }

      const value = parseEther(amount);

      return await sendTransactionAsync({
        to: address,
        value,
      });
    },
    [sendTransactionAsync]
  );

  return {
    sendNative,
    transactionHash,
    isAwaitingSignature,
    isConfirming,
    isSuccess,
    error: sendError ?? receiptError,
  };
}