/* eslint-disable @typescript-eslint/no-unused-vars */
import { Percent, TradeType } from '@pancakeswap/sdk'
import { SMART_ROUTER_ADDRESSES, SmartRouterTrade, SwapRouter } from '@pancakeswap/smart-router'
import { FeeOptions } from '@pancakeswap/v3-sdk'
import { useMemo } from 'react'

import { useGetENSAddressByName } from 'hooks/useGetENSAddressByName'

import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { Address, Hex, isAddress } from 'viem'

interface SwapCall {
  address: Address
  calldata: Hex
  value: Hex
}

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName the ENS name or address of the recipient of the swap output
 * @param deadline the deadline for executing the trade
 * @param feeOptions the fee options to be applied to the trade.
 */
export function useSwapCallArguments(
  trade: SmartRouterTrade<TradeType> | undefined | null,
  allowedSlippage: Percent,
  recipientAddressOrName: string | null | undefined,
  deadline: bigint | undefined,
  feeOptions: FeeOptions | undefined,
): SwapCall[] {
  const { account, chainId } = useAccountActiveChain()
  const recipientENSAddress = useGetENSAddressByName(recipientAddressOrName ?? undefined)
  const recipient = (
    recipientAddressOrName === null || recipientAddressOrName === undefined
      ? account
      : isAddress(recipientAddressOrName)
      ? recipientAddressOrName
      : isAddress(recipientENSAddress ?? '')
      ? recipientENSAddress
      : null
  ) as Address | null

  return useMemo(() => {
    if (!trade || !recipient || !account || !chainId) return []

    const swapRouterAddress = chainId ? SMART_ROUTER_ADDRESSES[chainId] : undefined
    if (!swapRouterAddress) return []

    const { value, calldata } = SwapRouter.swapCallParameters(trade, {
      fee: feeOptions,
      recipient,
      slippageTolerance: allowedSlippage,
      // ...(signatureData
      //   ? {
      //       inputTokenPermit:
      //         'allowed' in signatureData
      //           ? {
      //               expiry: signatureData.deadline,
      //               nonce: signatureData.nonce,
      //               s: signatureData.s,
      //               r: signatureData.r,
      //               v: signatureData.v as any,
      //             }
      //           : {
      //               deadline: signatureData.deadline,
      //               amount: signatureData.amount,
      //               s: signatureData.s,
      //               r: signatureData.r,
      //               v: signatureData.v as any,
      //             },
      //     }
      //   : {}),

      deadlineOrPreviousBlockhash: deadline?.toString(),
    })

    // if (argentWalletContract && trade.inputAmount.currency.isToken) {
    //   return [
    //     {
    //       address: argentWalletContract.address,
    //       calldata: argentWalletContract.interface.encodeFunctionData('wc_multiCall', [
    //         [
    //           approveAmountCalldata(trade.maximumAmountIn(allowedSlippage), swapRouterAddress),
    //           {
    //             to: swapRouterAddress,
    //             value,
    //             data: calldata,
    //           },
    //         ],
    //       ]),
    //       value: '0x0',
    //     },
    //   ]
    // }
    return [
      {
        address: swapRouterAddress,
        calldata,
        value,
      },
    ]
  }, [
    account,
    allowedSlippage,
    // argentWalletContract,
    chainId,
    deadline,
    feeOptions,
    recipient,
    // signatureData,
    trade,
  ])
}
