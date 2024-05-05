import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import BigNumber from 'bignumber.js'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { Address, erc20ABI, useAccount, useContractRead } from 'wagmi'

interface UseLiquidStakingApprovalProps {
  approveToken?: string
  contractAddress?: Address
  shouldCheckApproval?: boolean
}

export const useLiquidStakingApprovalStatus = ({
  approveToken,
  contractAddress,
  shouldCheckApproval,
}: UseLiquidStakingApprovalProps) => {
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()

  const { data, refetch } = useContractRead({
    chainId,
    abi: erc20ABI,
    address: approveToken as Address,
    functionName: 'allowance',
    enabled: !!account && !!contractAddress && !!shouldCheckApproval,
    args: [account!, contractAddress!],
  })

  return {
    isApproved: data ? data > 0 : false,
    allowance: data ? new BigNumber(data?.toString()) : BIG_ZERO,
    setLastUpdated: refetch,
  }
}

export default useLiquidStakingApprovalStatus
