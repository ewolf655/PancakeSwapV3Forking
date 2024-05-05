// eslint-disable-next-line no-restricted-imports
import { useTranslation } from '@pancakeswap/localization'
import { TradeType } from '@pancakeswap/sdk'
import { SmartRouterTrade } from '@pancakeswap/smart-router'
import { Permit2Signature } from '@pancakeswap/universal-router-sdk'
import { FeeOptions } from '@pancakeswap/v3-sdk'
import { useMemo } from 'react'

import { useUserSlippage } from '@pancakeswap/utils/user'
import { INITIAL_ALLOWED_SLIPPAGE } from 'config/constants'
import { useSwapState } from 'state/swap/hooks'
import { basisPointsToPercent } from 'utils/exchange'

import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { SendTransactionResult } from 'wagmi/actions'
import useSendSwapTransaction from './useSendSwapTransaction'
import { useSwapCallArgumentsV2 } from './useSwapCallArgumentsV2'
import type { TWallchainMasterInput, WallchainStatus } from './useWallchain'

export enum SwapCallbackState {
  INVALID,
  LOADING,
  VALID,
  REVERTED,
}

interface UseSwapCallbackReturns {
  state: SwapCallbackState
  callback?: () => Promise<SendTransactionResult>
  error?: string
  reason?: string
}
interface UseSwapCallbackArgs {
  trade: SmartRouterTrade<TradeType> | undefined | null // trade to execute, required
  // allowedSlippage: Percent // in bips
  // recipientAddressOrName: string | null | undefined // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
  deadline?: bigint
  permitSignature: Permit2Signature | undefined
  feeOptions?: FeeOptions
  onWallchainDrop?: () => void
  statusWallchain?: WallchainStatus
  wallchainMasterInput?: TWallchainMasterInput
}

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwapCallbackV2({
  trade,
  deadline,
  permitSignature,
  feeOptions,
}: UseSwapCallbackArgs): UseSwapCallbackReturns {
  const { t } = useTranslation()
  const { account, chainId } = useAccountActiveChain()
  const [allowedSlippageRaw] = useUserSlippage() || [INITIAL_ALLOWED_SLIPPAGE]
  const allowedSlippage = useMemo(() => basisPointsToPercent(allowedSlippageRaw), [allowedSlippageRaw])
  const { recipient: recipientAddress } = useSwapState()
  const recipient = recipientAddress === null ? account : recipientAddress

  const swapCalls = useSwapCallArgumentsV2(
    trade,
    allowedSlippage,
    recipientAddress,
    permitSignature,
    deadline,
    feeOptions,
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const wallchainSwapCalls = useWallchainSwapCallArguments(
  //   trade,
  //   swapCalls,
  //   account,
  //   onWallchainDrop,
  //   wallchainMasterInput,
  // )
  // const wallchainSwapCalls = []

  const { callback } = useSendSwapTransaction(account, chainId, trade ?? undefined, swapCalls, 'UniversalRouter')

  return useMemo(() => {
    if (!trade || !account || !chainId || !callback) {
      return { state: SwapCallbackState.INVALID, error: t('Missing dependencies') }
    }
    if (!recipient) {
      if (recipientAddress !== null) {
        return { state: SwapCallbackState.INVALID, error: t('Invalid recipient') }
      }
      return { state: SwapCallbackState.LOADING }
    }

    return {
      state: SwapCallbackState.VALID,
      callback: async () => callback(),
    }
  }, [trade, account, chainId, callback, recipient, recipientAddress, t])
}
