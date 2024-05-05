import { ChainId, STABLESWAP_SUBGRAPHS } from '@pancakeswap/chains'
import {
  BIT_QUERY,
  INFO_CLIENT,
  INFO_CLIENT_ETH,
  V3_BSC_INFO_CLIENT,
  V3_SUBGRAPH_URLS,
} from 'config/constants/endpoints'
import { GraphQLClient } from 'graphql-request'
import { INFO_CLIENT_WITH_CHAIN } from '../config/constants/endpoints'

// Extra headers
// Mostly for dev environment
// No production env check since production preview might also need them
export const getGQLHeaders = (endpoint: string) => {
  if (endpoint === INFO_CLIENT && process.env.NEXT_PUBLIC_NODE_REAL_HEADER) {
    return {
      origin: process.env.NEXT_PUBLIC_NODE_REAL_HEADER,
    }
  }
  return undefined
}

export const infoClient = new GraphQLClient(INFO_CLIENT)

export const infoClientWithChain = (chainId?: number) => {
  if (chainId && INFO_CLIENT_WITH_CHAIN[chainId]) {
    return new GraphQLClient(INFO_CLIENT_WITH_CHAIN[chainId], {
      headers: getGQLHeaders(INFO_CLIENT_WITH_CHAIN[chainId]),
    })
  }
  return undefined
}

export const v3Clients = {
  [ChainId.ETHEREUM]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.ETHEREUM]),
  [ChainId.GOERLI]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.GOERLI]),
  [ChainId.BSC]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.BSC]),
  [ChainId.BSC_TESTNET]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.BSC_TESTNET]),
  [ChainId.ARBITRUM_ONE]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.ARBITRUM_ONE]),
  [ChainId.ARBITRUM_GOERLI]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.ARBITRUM_GOERLI]),
  [ChainId.POLYGON_ZKEVM]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.POLYGON_ZKEVM]),
  [ChainId.ZKSYNC]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.ZKSYNC]),
  [ChainId.ZKSYNC_TESTNET]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.ZKSYNC_TESTNET]),
  [ChainId.LINEA]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.LINEA]),
  [ChainId.LINEA_TESTNET]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.LINEA_TESTNET]),
  [ChainId.BASE]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.BASE]),
  [ChainId.BASE_TESTNET]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.BASE_TESTNET]),
  [ChainId.SCROLL_SEPOLIA]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.SCROLL_SEPOLIA]),
  [ChainId.OPBNB]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.OPBNB]),
  [ChainId.PULSE_TESTNET]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.PULSE_TESTNET]),
  [ChainId.HOLESKY]: new GraphQLClient(V3_SUBGRAPH_URLS[ChainId.HOLESKY]),
}

export const v3InfoClients = { ...v3Clients, [ChainId.BSC]: new GraphQLClient(V3_BSC_INFO_CLIENT) }

export const infoClientETH = new GraphQLClient(INFO_CLIENT_ETH)

export const v2Clients = {
  [ChainId.ETHEREUM]: infoClientETH,
  [ChainId.BSC]: infoClient,
  [ChainId.POLYGON_ZKEVM]: new GraphQLClient(INFO_CLIENT_WITH_CHAIN[ChainId.POLYGON_ZKEVM]),
  [ChainId.ZKSYNC]: new GraphQLClient(INFO_CLIENT_WITH_CHAIN[ChainId.ZKSYNC]),
  [ChainId.LINEA]: new GraphQLClient(INFO_CLIENT_WITH_CHAIN[ChainId.LINEA]),
  [ChainId.BASE]: new GraphQLClient(INFO_CLIENT_WITH_CHAIN[ChainId.BASE]),
  [ChainId.ARBITRUM_ONE]: new GraphQLClient(INFO_CLIENT_WITH_CHAIN[ChainId.ARBITRUM_ONE]),
  [ChainId.OPBNB]: new GraphQLClient(INFO_CLIENT_WITH_CHAIN[ChainId.OPBNB]),
  [ChainId.PULSE_TESTNET]: new GraphQLClient(INFO_CLIENT_WITH_CHAIN[ChainId.PULSE_TESTNET]),
  [ChainId.HOLESKY]: new GraphQLClient(INFO_CLIENT_WITH_CHAIN[ChainId.HOLESKY]),
}

export const infoStableSwapClients = {
  [ChainId.BSC]: new GraphQLClient(STABLESWAP_SUBGRAPHS[ChainId.BSC]),
  [ChainId.ARBITRUM_ONE]: new GraphQLClient(STABLESWAP_SUBGRAPHS[ChainId.ARBITRUM_ONE]),
  [ChainId.PULSE_TESTNET]: new GraphQLClient(STABLESWAP_SUBGRAPHS[ChainId.PULSE_TESTNET]),
  [ChainId.HOLESKY]: new GraphQLClient(STABLESWAP_SUBGRAPHS[ChainId.HOLESKY]),
}

export const infoServerClient = new GraphQLClient(INFO_CLIENT, {
  timeout: 5000,
  headers: {
    origin: 'https://pancakeswap.finance',
  },
})

export const stableSwapClient = new GraphQLClient(STABLESWAP_SUBGRAPHS[ChainId.BSC])

export const bitQueryServerClient = new GraphQLClient(BIT_QUERY, {
  headers: {
    // only server, no `NEXT_PUBLIC` not going to expose in client
    'X-API-KEY': process.env.BIT_QUERY_HEADER || '',
  },
  timeout: 5000,
})
