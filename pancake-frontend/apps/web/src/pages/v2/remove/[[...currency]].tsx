import { useCurrency } from 'hooks/Tokens'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { CHAIN_IDS } from 'utils/wagmi'
import RemoveLiquidity, { RemoveLiquidityV2Layout } from 'views/RemoveLiquidity'
import RemoveLiquidityV2FormProvider from 'views/RemoveLiquidity/RemoveLiquidityV2FormProvider'

const RemoveLiquidityPage = () => {
  const router = useRouter()

  const [currencyIdA, currencyIdB] = router.query.currency || []

  const [currencyA, currencyB] = [useCurrency(currencyIdA) ?? undefined, useCurrency(currencyIdB) ?? undefined]

  const props = {
    currencyIdA,
    currencyIdB,
    currencyA,
    currencyB,
  }

  return (
    <RemoveLiquidityV2FormProvider>
      <RemoveLiquidityV2Layout {...props}>
        <RemoveLiquidity {...props} />
      </RemoveLiquidityV2Layout>
    </RemoveLiquidityV2FormProvider>
  )
}

RemoveLiquidityPage.chains = CHAIN_IDS
RemoveLiquidityPage.screen = true

export default RemoveLiquidityPage

const OLD_PATH_STRUCTURE = /^(0x[a-fA-F0-9]{40})-(0x[a-fA-F0-9]{40})$/

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currency = (params?.currency as string[]) || []

  if (currency.length === 0) {
    return {
      notFound: true,
    }
  }

  if (currency.length === 1) {
    if (!OLD_PATH_STRUCTURE.test(currency[0])) {
      return {
        redirect: {
          statusCode: 307,
          destination: `/pool`,
        },
      }
    }

    const split = currency[0].split('-')
    if (split.length > 1) {
      const [currency0, currency1] = split
      return {
        redirect: {
          statusCode: 307,
          destination: `/v2/remove/${currency0}/${currency1}`,
        },
      }
    }
  }

  return {
    props: {},
  }
}
