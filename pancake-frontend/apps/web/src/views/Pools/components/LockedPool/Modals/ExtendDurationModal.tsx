import { useCallback, useMemo } from 'react'
import { Modal, Box } from '@pancakeswap/uikit'
import _noop from 'lodash/noop'
import useTheme from 'hooks/useTheme'
import { MAX_LOCK_DURATION } from '@pancakeswap/pools'
import { useTranslation } from '@pancakeswap/localization'
import BigNumber from 'bignumber.js'
import { useIfoCeiling } from 'state/pools/hooks'

import { getBalanceAmount, getBalanceNumber, getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import StaticAmount from '../Common/StaticAmount'
import LockedBodyModal from '../Common/LockedModalBody'
import Overview from '../Common/Overview'
import { ExtendDurationModal } from '../types'
import RoiCalculatorModalProvider from './RoiCalculatorModalProvider'
import { ENABLE_EXTEND_LOCK_AMOUNT } from '../../../helpers'

const ExtendDurationModal: React.FC<ExtendDurationModal> = ({
  modalTitle,
  stakingToken,
  stakingTokenPrice,
  onDismiss,
  currentLockedAmount,
  currentDuration,
  currentDurationLeft,
  currentBalance,
  lockStartTime,
  isRenew,
  customLockWeekInSeconds,
}) => {
  const { theme } = useTheme()
  const ceiling = useIfoCeiling()
  const { t } = useTranslation()

  const usdValueStaked = useMemo(
    () =>
      getBalanceNumber(
        getDecimalAmount(new BigNumber(currentLockedAmount), stakingToken?.decimals).multipliedBy(stakingTokenPrice),
        stakingToken?.decimals,
      ),
    [currentLockedAmount, stakingTokenPrice, stakingToken?.decimals],
  )

  const validator = useCallback(
    ({ duration }) => {
      const isValidAmount = Boolean(currentLockedAmount && currentLockedAmount > 0)
      const totalDuration = currentDurationLeft + duration

      const isValidDuration = duration > 0 && totalDuration > 0 && totalDuration <= MAX_LOCK_DURATION

      return {
        isValidAmount,
        isValidDuration,
        isOverMax: totalDuration > MAX_LOCK_DURATION,
      }
    },
    [currentLockedAmount, currentDurationLeft],
  )

  const prepConfirmArg = useCallback(
    ({ duration }) => ({
      finalDuration: duration,
      finalLockedAmount:
        currentDuration && currentDuration + duration > MAX_LOCK_DURATION
          ? getBalanceAmount(ENABLE_EXTEND_LOCK_AMOUNT, stakingToken?.decimals).toNumber()
          : 0,
    }),
    [stakingToken?.decimals, currentDuration],
  )

  const customOverview = useCallback(
    ({
      isValidDuration,
      duration,
      isMaxSelected,
    }: {
      isValidDuration: boolean
      duration: number
      isMaxSelected?: boolean
    }) => (
      <Overview
        lockStartTime={
          currentDuration + duration > MAX_LOCK_DURATION ? Math.floor(Date.now() / 1000).toString() : lockStartTime
        }
        isValidDuration={isValidDuration}
        openCalculator={_noop}
        duration={currentDuration || duration}
        newDuration={
          isMaxSelected
            ? MAX_LOCK_DURATION
            : currentDuration + duration > MAX_LOCK_DURATION
            ? currentDurationLeft + duration
            : currentDuration + duration
        }
        lockedAmount={currentLockedAmount}
        usdValueStaked={usdValueStaked}
        showLockWarning={!+lockStartTime}
        ceiling={ceiling}
      />
    ),
    [lockStartTime, currentDuration, currentLockedAmount, currentDurationLeft, usdValueStaked, ceiling],
  )

  return (
    <RoiCalculatorModalProvider lockedAmount={currentLockedAmount}>
      <Modal
        title={modalTitle || t('Extend Lock')}
        onDismiss={onDismiss}
        headerBackground={theme.colors.gradientCardHeader}
      >
        <Box mb="16px">
          <StaticAmount
            stakingAddress={stakingToken?.address || ''}
            stakingSymbol={stakingToken?.symbol || ''}
            lockedAmount={currentLockedAmount}
            usdValueStaked={usdValueStaked}
          />
        </Box>
        {stakingToken ? (
          <LockedBodyModal
            stakingToken={stakingToken}
            stakingTokenPrice={stakingTokenPrice}
            currentBalance={currentBalance}
            currentDuration={currentDuration}
            currentDurationLeft={currentDurationLeft}
            onDismiss={onDismiss}
            lockedAmount={new BigNumber(currentLockedAmount)}
            validator={validator}
            prepConfirmArg={prepConfirmArg}
            customOverview={customOverview}
            isRenew={isRenew}
            customLockWeekInSeconds={customLockWeekInSeconds}
          />
        ) : null}
      </Modal>
    </RoiCalculatorModalProvider>
  )
}

export default ExtendDurationModal
