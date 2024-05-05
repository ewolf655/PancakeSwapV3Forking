import { useTranslation } from '@pancakeswap/localization'
import { Balance, Box, Flex, Text } from '@pancakeswap/uikit'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { getBalanceNumber } from '@pancakeswap/utils/formatBalance'
import BigNumber from 'bignumber.js'
import { GreyCard } from 'components/Card'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useVaultApy } from 'hooks/useVaultApy'
import { useMemo } from 'react'
import { useLatestVaultAddress, usePotteryData } from 'state/pottery/hook'
import { PotteryDepositStatus } from 'state/types'
import { styled } from 'styled-components'
import { weeksToSeconds } from 'views/Pools/components/utils/formatSecondsToWeeks'
import { calculateCakeAmount } from 'views/Pottery/helpers'
import { useAccount } from 'wagmi'
import WinRate from '../WinRate'
import YourDeposit from '../YourDeposit'
import DepositAction from './DepositAction'

const Container = styled(Flex)`
  flex-direction: column;
  padding: 16px 24px;
  border-bottom: solid 1px ${({ theme }) => theme.colors.cardBorder};
`

const CardAction = styled(Flex)`
  flex-direction: column;
  padding: 26px 24px 36px 24px;
`

const Deposit: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { getLockedApy } = useVaultApy()
  const { publicData, userData } = usePotteryData()
  const lastVaultAddress = useLatestVaultAddress()
  const { totalSupply, totalLockCake, getStatus, totalLockedValue, maxTotalDeposit } = publicData

  const apyDisplay = useMemo(() => {
    const apy = getLockedApy(weeksToSeconds(10))
    return !Number.isNaN(apy) ? `${Number(apy).toFixed(2)}%` : '0%'
  }, [getLockedApy])

  const totalValueLocked = useMemo(() => {
    if (getStatus === PotteryDepositStatus.LOCK) {
      return getBalanceNumber(totalLockCake)
    }
    return getBalanceNumber(totalLockedValue)
  }, [getStatus, totalLockCake, totalLockedValue])

  const currentDeposit = userData.withdrawAbleData.find(
    (data) => data.potteryVaultAddress.toLowerCase() === lastVaultAddress?.toLowerCase(),
  )

  const depositBalance = useMemo(() => {
    // Because subgraph will delay, if currency vault status is before lock don't use currentDeposit value.
    if (getStatus !== PotteryDepositStatus.LOCK) {
      return new BigNumber(userData.previewDepositBalance)
    }

    if (currentDeposit) {
      const { previewRedeem, shares, status } = currentDeposit
      return calculateCakeAmount({ status, previewRedeem, shares, totalSupply, totalLockCake })
    }

    return BIG_ZERO
  }, [userData, getStatus, currentDeposit, totalSupply, totalLockCake])

  return (
    <Box>
      <Container>
        <GreyCard mb="18px">
          <Flex justifyContent="space-between">
            <YourDeposit depositBalance={depositBalance} />
            <WinRate />
          </Flex>
        </GreyCard>
        <Flex justifyContent="space-between">
          <Text color="textSubtle">{t('APR')}</Text>
          <Text bold>{apyDisplay}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text color="textSubtle">{t('Total Value Locked')}</Text>
          <Balance bold decimals={2} value={totalValueLocked} unit=" CAKE" />
        </Flex>
        <Flex justifyContent="space-between">
          <Text color="textSubtle">{t('Max. deposit cap')}</Text>
          <Balance bold decimals={2} value={getBalanceNumber(maxTotalDeposit)} unit=" CAKE" />
        </Flex>
      </Container>
      <CardAction>
        {account ? <DepositAction totalValueLockedValue={totalValueLocked} /> : <ConnectWalletButton />}
      </CardAction>
    </Box>
  )
}

export default Deposit
