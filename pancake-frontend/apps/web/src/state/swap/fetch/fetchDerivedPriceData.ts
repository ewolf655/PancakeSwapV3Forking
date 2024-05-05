import { ChainId, STABLESWAP_SUBGRAPHS } from '@pancakeswap/chains'
import { INFO_CLIENT, INFO_CLIENT_ETH, INFO_CLIENT_WITH_CHAIN, V3_SUBGRAPH_URLS } from 'config/constants/endpoints'
import { ONE_DAY_UNIX, ONE_HOUR_SECONDS } from 'config/constants/info'
import dayjs from 'dayjs'
import request from 'graphql-request'
import mapValues from 'lodash/mapValues'
import orderBy from 'lodash/orderBy'
import { multiChainName } from 'state/info/constant'
import { Block } from 'state/info/types'
import { getBlocksFromTimestamps } from 'utils/getBlocksFromTimestamps'
import { multiQuery } from 'views/Info/utils/infoQueryHelpers'
import { getDerivedPrices, getDerivedPricesQueryConstructor, getTVL } from '../queries/getDerivedPrices'
import { PairDataTimeWindowEnum } from '../types'

const PROTOCOL = ['v2', 'v3', 'stable'] as const
type Protocol = (typeof PROTOCOL)[number]

type ProtocolEndpoint = Record<Protocol, string>

const SWAP_INFO_BY_CHAIN = {
  [ChainId.BSC]: {
    v2: INFO_CLIENT,
    stable: STABLESWAP_SUBGRAPHS[ChainId.BSC],
    // v3: V3_SUBGRAPH_URLS[ChainId.BSC],
  },
  [ChainId.ETHEREUM]: {
    v2: INFO_CLIENT_ETH,
    // v3: V3_SUBGRAPH_URLS[ChainId.ETHEREUM],
  },
  [ChainId.BSC_TESTNET]: {
    v3: V3_SUBGRAPH_URLS[ChainId.BSC_TESTNET],
  },
  [ChainId.GOERLI]: {},
  [ChainId.ARBITRUM_ONE]: {
    v2: INFO_CLIENT_WITH_CHAIN[ChainId.ARBITRUM_ONE],
    v3: V3_SUBGRAPH_URLS[ChainId.ARBITRUM_ONE],
    stable: STABLESWAP_SUBGRAPHS[ChainId.ARBITRUM_ONE],
  },
  [ChainId.ARBITRUM_GOERLI]: {},
  [ChainId.POLYGON_ZKEVM]: {
    v3: V3_SUBGRAPH_URLS[ChainId.POLYGON_ZKEVM],
  },
  [ChainId.POLYGON_ZKEVM_TESTNET]: {},
  [ChainId.ZKSYNC]: {
    v3: V3_SUBGRAPH_URLS[ChainId.ZKSYNC],
  },
  [ChainId.ZKSYNC_TESTNET]: {},
  [ChainId.LINEA]: {},
  [ChainId.LINEA_TESTNET]: {
    v2: INFO_CLIENT_WITH_CHAIN[ChainId.LINEA_TESTNET],
    v3: V3_SUBGRAPH_URLS[ChainId.LINEA_TESTNET],
  },
  [ChainId.OPBNB]: {
    v2: INFO_CLIENT_WITH_CHAIN[ChainId.OPBNB],
    v3: V3_SUBGRAPH_URLS[ChainId.OPBNB],
  },
  [ChainId.OPBNB_TESTNET]: {},
  [ChainId.BASE]: {
    v3: V3_SUBGRAPH_URLS[ChainId.BASE],
  },
  [ChainId.BASE_TESTNET]: {
    v3: V3_SUBGRAPH_URLS[ChainId.BASE_TESTNET],
  },
  [ChainId.SCROLL_SEPOLIA]: {
    v3: V3_SUBGRAPH_URLS[ChainId.SCROLL_SEPOLIA],
  },
  [ChainId.SEPOLIA]: {},
  [ChainId.ARBITRUM_SEPOLIA]: {},
  [ChainId.BASE_SEPOLIA]: {},
  [ChainId.PULSE_TESTNET]: {
    v2: INFO_CLIENT_WITH_CHAIN[ChainId.PULSE_TESTNET],
    v3: V3_SUBGRAPH_URLS[ChainId.PULSE_TESTNET],
    stable: STABLESWAP_SUBGRAPHS[ChainId.PULSE_TESTNET],
  },
  [ChainId.HOLESKY]: {
    v2: INFO_CLIENT_WITH_CHAIN[ChainId.HOLESKY],
    v3: V3_SUBGRAPH_URLS[ChainId.HOLESKY],
    stable: STABLESWAP_SUBGRAPHS[ChainId.HOLESKY],
  },
} satisfies Record<ChainId, Partial<ProtocolEndpoint>>

export const getTokenBestTvlProtocol = async (tokenAddress: string, chainId: ChainId): Promise<Protocol | null> => {
  const infos = SWAP_INFO_BY_CHAIN[chainId]
  if (infos) {
    const [v2, v3, stable] = await Promise.allSettled([
      'v2' in infos ? request(infos.v2, getTVL(tokenAddress.toLowerCase())) : Promise.resolve(),
      'v3' in infos ? request(infos.v3, getTVL(tokenAddress.toLowerCase(), true)) : Promise.resolve(),
      'stable' in infos ? request(infos.stable, getTVL(tokenAddress.toLowerCase())) : Promise.resolve(),
    ])

    const results = [v2, v3, stable]
    let bestProtocol: Protocol = 'v2'
    let bestTVL = 0
    for (const [index, result] of results.entries()) {
      if (result.status === 'fulfilled' && result.value && result.value.token) {
        if (+result.value.token.totalValueLocked > bestTVL) {
          bestTVL = +result.value.token.totalValueLocked
          bestProtocol = PROTOCOL[index]
        }
      }
    }

    return bestProtocol
  }

  return null
}

const getTokenDerivedUSDCPrices = async (tokenAddress: string, blocks: Block[], endpoint: string) => {
  const rawPrices: any | undefined = await multiQuery(
    getDerivedPricesQueryConstructor,
    getDerivedPrices(tokenAddress, blocks),
    endpoint,
    200,
  )

  if (!rawPrices) {
    console.error('Price data failed to load')
    return null
  }

  const prices = mapValues(rawPrices, (value) => {
    return value?.derivedUSD
  })

  // format token BNB price results
  const tokenPrices: {
    tokenAddress: string
    timestamp: string
    derivedUSD: number
  }[] = []

  // Get Token prices in BNB
  Object.keys(prices).forEach((priceKey) => {
    const timestamp = priceKey.split('t')[1]
    if (timestamp) {
      tokenPrices.push({
        tokenAddress,
        timestamp,
        derivedUSD: prices[priceKey] ? parseFloat(prices[priceKey]) : 0,
      })
    }
  })

  return orderBy(tokenPrices, (tokenPrice) => parseInt(tokenPrice.timestamp, 10))
}

const getInterval = (timeWindow: PairDataTimeWindowEnum) => {
  switch (timeWindow) {
    case PairDataTimeWindowEnum.DAY:
      return ONE_HOUR_SECONDS
    case PairDataTimeWindowEnum.WEEK:
      return ONE_HOUR_SECONDS * 4
    case PairDataTimeWindowEnum.MONTH:
      return ONE_DAY_UNIX
    case PairDataTimeWindowEnum.YEAR:
      return ONE_DAY_UNIX * 15
    default:
      return ONE_HOUR_SECONDS * 4
  }
}

const getSkipDaysToStart = (timeWindow: PairDataTimeWindowEnum) => {
  switch (timeWindow) {
    case PairDataTimeWindowEnum.DAY:
      return 1
    case PairDataTimeWindowEnum.WEEK:
      return 7
    case PairDataTimeWindowEnum.MONTH:
      return 30
    case PairDataTimeWindowEnum.YEAR:
      return 365
    default:
      return 7
  }
}

// Fetches derivedBnb values for tokens to calculate derived price
// Used when no direct pool is available
const fetchDerivedPriceData = async (
  token0Address: string,
  token1Address: string,
  timeWindow: PairDataTimeWindowEnum,
  protocol0: Protocol,
  protocol1: Protocol,
  chainId: ChainId,
) => {
  const interval = getInterval(timeWindow)
  const endTimestamp = dayjs()
  const endTimestampUnix = endTimestamp.unix()
  const startTimestamp = endTimestamp.subtract(getSkipDaysToStart(timeWindow), 'days').startOf('hour').unix()
  const timestamps: number[] = []
  let time = startTimestamp
  if (!SWAP_INFO_BY_CHAIN[chainId][protocol0] || !SWAP_INFO_BY_CHAIN[chainId][protocol1]) {
    return null
  }
  while (time <= endTimestampUnix) {
    timestamps.push(time)
    time += interval
  }

  try {
    const blocks = await getBlocksFromTimestamps(timestamps, 'asc', 500, multiChainName[chainId])
    if (!blocks || blocks.length === 0) {
      console.error('Error fetching blocks for timestamps', timestamps)
      return null
    }
    blocks.pop() // the bsc graph is 32 block behind so pop the last
    const [token0DerivedUSD, token1DerivedUSD] = await Promise.all([
      getTokenDerivedUSDCPrices(token0Address, blocks, SWAP_INFO_BY_CHAIN[chainId][protocol0]),
      getTokenDerivedUSDCPrices(token1Address, blocks, SWAP_INFO_BY_CHAIN[chainId][protocol1]),
    ])
    return { token0DerivedUSD, token1DerivedUSD }
  } catch (error) {
    console.error('Failed to fetched derived price data for chart', error)
    return null
  }
}

export default fetchDerivedPriceData
