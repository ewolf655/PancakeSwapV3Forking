import { useTranslation } from '@pancakeswap/localization'
import { Box, Card, Text } from '@pancakeswap/uikit'
import { useMemo } from 'react'
import { ApproveAndLockModal } from 'views/CakeStaking/components/ApproveAndLockModal'
import { useLockModal } from 'views/CakeStaking/hooks/useLockModal'
import ComingSoon from 'views/TradingReward/components/YourTradingReward/ComingSoon'
import QualifiedPreview from 'views/TradingReward/components/YourTradingReward/QualifiedPreview'
import { VeCakePreview } from 'views/TradingReward/components/YourTradingReward/VeCake/VeCakePreview'
import { Incentives, RewardInfo } from 'views/TradingReward/hooks/useAllTradingRewardPair'
import { UserCampaignInfoDetail } from 'views/TradingReward/hooks/useAllUserCampaignInfo'

interface CurrentPeriodProps {
  incentives: Incentives | undefined
  rewardInfo: { [key in string]: RewardInfo }
  currentUserCampaignInfo: UserCampaignInfoDetail | undefined
  isQualified: boolean
  thresholdLockAmount: number
  totalAvailableClaimData: UserCampaignInfoDetail[]
}

const CurrentPeriod: React.FC<React.PropsWithChildren<CurrentPeriodProps>> = ({
  incentives,
  rewardInfo,
  currentUserCampaignInfo,
  isQualified,
  thresholdLockAmount,
}) => {
  const { t } = useTranslation()
  const { modal, modalData } = useLockModal()

  const campaignClaimTime = incentives?.campaignClaimTime ?? 0
  const campaignStart = incentives?.campaignStart ?? 0

  const currentDate = Date.now() / 1000
  const timeRemaining = campaignClaimTime - currentDate

  const isCampaignLive = useMemo(
    () => currentDate >= campaignStart && currentDate <= campaignClaimTime,
    [campaignClaimTime, campaignStart, currentDate],
  )

  return (
    <>
      <ApproveAndLockModal {...modal} {...modalData} />
      <Box width={['100%', '100%', '100%', '48.5%']} mb={['24px', '24px', '24px', '0']}>
        <Card style={{ width: '100%' }}>
          <Box padding={['16px', '16px', '16px', '24px']}>
            <Text bold textAlign="right" mb="24px">
              {t('Current Period')}
            </Text>
            {!isCampaignLive ? (
              <ComingSoon />
            ) : (
              <>
                {isQualified ? (
                  <QualifiedPreview
                    rewardInfo={rewardInfo}
                    timeRemaining={timeRemaining}
                    campaignClaimTime={campaignClaimTime}
                    thresholdLockAmount={thresholdLockAmount}
                    currentUserCampaignInfo={currentUserCampaignInfo}
                  />
                ) : (
                  <VeCakePreview
                    thresholdLockAmount={thresholdLockAmount}
                    endTime={campaignClaimTime}
                    rewardInfo={rewardInfo}
                    timeRemaining={timeRemaining}
                    currentUserCampaignInfo={currentUserCampaignInfo}
                  />
                )}
              </>
            )}
          </Box>
        </Card>
      </Box>
    </>
  )
}

export default CurrentPeriod
