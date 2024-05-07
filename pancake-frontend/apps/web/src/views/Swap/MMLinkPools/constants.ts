import { ChainId } from '@pancakeswap/chains'
import contract from 'config/constants/contracts'
import { getAddress } from 'viem'

export const NATIVE_CURRENCY_ADDRESS = getAddress('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')

export const MM_SUPPORT_CHAIN = {
  1: true,
  5: true,
  56: true,
}

export const MM_SWAP_CONTRACT_ADDRESS = contract.mmLinkedPool

export const MM_STABLE_TOKENS_WHITE_LIST: Record<number, Record<string, string>> = {
  [ChainId.ETHEREUM]: {
    '0xbDd2D3511d2D47e0d3d3FE963e293C0B8e423DBb': 'USDC',
    '0x51B279055E4f264BbB38AAB6FB4f62E18Cc2a234': 'USDT',
    '0x6B175474E89094C44Da98b954EedeAC495271d0F': 'DAI',
    '0x4Fabb145d64652a948d72533023f6E7A623C7C53': 'BUSD',
  },
  [ChainId.BSC]: {
    '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56': 'BUSD',
    '0x55d398326f99059fF775485246999027B3197955': 'USDT',
    '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d': 'USDC',
  },
  [ChainId.GOERLI]: {},
}

export const MM_SIGNER = {
  [ChainId.BSC]: { 1: '0xff8Ba4D1fC3762f6154cc942CCF30049A2A0cEC6', 2: '0xe68290F7FAEeB35648B5440D644A80d82766E03d' },
  [ChainId.ETHEREUM]: { 1: '0xff8Ba4D1fC3762f6154cc942CCF30049A2A0cEC6' },
  [ChainId.GOERLI]: { 1: '0x13414B047539298D5aeD429722211681eAAb43B7' },
}

export const SAFE_MM_QUOTE_EXPIRY_SEC = 25
export const IS_SUPPORT_NATIVE_TOKEN = true
