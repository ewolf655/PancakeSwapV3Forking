import { arbitrumTokens } from '@pancakeswap/tokens'
import { FeeAmount } from '@pancakeswap/v3-sdk'
import { Strategy, VaultConfig } from '../../types'
import { MANAGER } from '../managers'

export const vaults: VaultConfig[] = [
  {
    id: 10,
    idByManager: 10,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x57398083eFcd4E530E64F3fBC506d2039D684F24',
    address: '0x57398083eFcd4E530E64F3fBC506d2039D684F24',
    adapterAddress: '0xea5404B85994692c3797b8D8A8470CCC3693ccF1',
    currencyA: arbitrumTokens.cake,
    currencyB: arbitrumTokens.weth,
    earningToken: arbitrumTokens.arb,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.ALO,
    manager: MANAGER.DEFIEDGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.defiedge.io/',
    strategyInfoUrl: 'https://docs.defiedge.io/category/strategy-manager',
    learnMoreAboutUrl: 'https://docs.defiedge.io/category/strategy-manager',
  },
  {
    id: 9,
    idByManager: 9,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x280A1795A8Ce911494282245b1011c1935834a17',
    address: '0x280A1795A8Ce911494282245b1011c1935834a17',
    adapterAddress: '0xbE59eDf2638d9145b0AAE5960Da42b307188F941',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.link,
    earningToken: arbitrumTokens.arb,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.ALO,
    manager: MANAGER.DEFIEDGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.defiedge.io/',
    strategyInfoUrl: 'https://docs.defiedge.io/category/strategy-manager',
    learnMoreAboutUrl: 'https://docs.defiedge.io/category/strategy-manager',
  },
  {
    id: 8,
    idByManager: 8,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x60F7dB3d72bBA74Ea57C662927643188b3b349f2',
    address: '0x60F7dB3d72bBA74Ea57C662927643188b3b349f2',
    adapterAddress: '0x2E24fc25E15e2E3fD226671807e3c1fa413E151b',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.gmx,
    earningToken: arbitrumTokens.arb,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.ALO,
    manager: MANAGER.DEFIEDGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.defiedge.io/',
    strategyInfoUrl: 'https://docs.defiedge.io/category/strategy-manager',
    learnMoreAboutUrl: 'https://docs.defiedge.io/category/strategy-manager',
  },
  {
    id: 7,
    idByManager: 7,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0xcb64d18C697893f15C858B6F6b9FD2fc856219bf',
    address: '0xcb64d18C697893f15C858B6F6b9FD2fc856219bf',
    adapterAddress: '0x5333a432bEE8A29033E5c250CAeD9fdC1Bc67fb4',
    currencyA: arbitrumTokens.rdnt,
    currencyB: arbitrumTokens.weth,
    earningToken: arbitrumTokens.arb,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.ALO,
    manager: MANAGER.DEFIEDGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.defiedge.io/',
    strategyInfoUrl: 'https://docs.defiedge.io/category/strategy-manager',
    learnMoreAboutUrl: 'https://docs.defiedge.io/category/strategy-manager',
  },
  {
    id: 6,
    idByManager: 6,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x8767a18F3bF0A53464e970B2166d2C9b1c6Db992',
    address: '0x8767a18F3bF0A53464e970B2166d2C9b1c6Db992',
    adapterAddress: '0x97F7dc95E12DfBcFd0c8aF1460046595be03E299',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.usdc,
    earningToken: arbitrumTokens.arb,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.ALO,
    manager: MANAGER.DEFIEDGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.defiedge.io/',
    strategyInfoUrl: 'https://docs.defiedge.io/category/strategy-manager',
    learnMoreAboutUrl: 'https://docs.defiedge.io/category/strategy-manager',
  },
  {
    id: 5,
    idByManager: 5,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x735394aF11b0eA4123fA420C8A3f01949B07cd14',
    address: '0x735394aF11b0eA4123fA420C8A3f01949B07cd14',
    adapterAddress: '0x724d7dbC6e203a73F01EB07B9E5eeCD67D7c52FB',
    currencyA: arbitrumTokens.arb,
    currencyB: arbitrumTokens.usdc,
    earningToken: arbitrumTokens.arb,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.ALO,
    manager: MANAGER.DEFIEDGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.defiedge.io/',
    strategyInfoUrl: 'https://docs.defiedge.io/category/strategy-manager',
    learnMoreAboutUrl: 'https://docs.defiedge.io/category/strategy-manager',
  },
  {
    id: 4,
    idByManager: 4,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x82C6Ea44cEb07503AA5e97339Fc1C5A5BA4B9D7F',
    address: '0x82C6Ea44cEb07503AA5e97339Fc1C5A5BA4B9D7F',
    adapterAddress: '0x613837BDa0e508E6f044Ca380ef83BDC15a861A1',
    currencyA: arbitrumTokens.wbtc,
    currencyB: arbitrumTokens.weth,
    earningToken: arbitrumTokens.arb,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.ALO,
    manager: MANAGER.DEFIEDGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.defiedge.io/',
    strategyInfoUrl: 'https://docs.defiedge.io/category/strategy-manager',
    learnMoreAboutUrl: 'https://docs.defiedge.io/category/strategy-manager',
  },
  {
    id: 3,
    idByManager: 3,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0xdE9D1E335402808Eb49de315C89065c69fc5514E',
    address: '0xdE9D1E335402808Eb49de315C89065c69fc5514E',
    adapterAddress: '0xf8454a7df271e851ee4DD4CF4950809D166a9721',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.arb,
    earningToken: arbitrumTokens.arb,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.ALO,
    manager: MANAGER.DEFIEDGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.defiedge.io/',
    strategyInfoUrl: 'https://docs.defiedge.io/category/strategy-manager',
    learnMoreAboutUrl: 'https://docs.defiedge.io/category/strategy-manager',
  },
  {
    id: 2,
    idByManager: 2,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x156EB371611d4AFdDee56972D7fB8fd6061a13f7',
    address: '0x156EB371611d4AFdDee56972D7fB8fd6061a13f7',
    adapterAddress: '0x677e65f76537AaCF84AB6F177037504b5662D89E',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.usdt,
    earningToken: arbitrumTokens.arb,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.ALO,
    manager: MANAGER.DEFIEDGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.defiedge.io/',
    strategyInfoUrl: 'https://docs.defiedge.io/category/strategy-manager',
    learnMoreAboutUrl: 'https://docs.defiedge.io/category/strategy-manager',
  },
  {
    id: 1,
    idByManager: 1,
    name: 'DEFIEDGE',
    address: '0x4fa0c6FC2d0d7b6cDa4215Ff09e8ed444F87dDB3',
    adapterAddress: '0xaCAbb974b3c97f8F521634AcaC6ce1D9A1557BFb',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.arb,
    earningToken: arbitrumTokens.cake,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.ALO,
    manager: MANAGER.DEFIEDGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.defiedge.io/',
    strategyInfoUrl: 'https://docs.defiedge.io/category/strategy-manager',
    learnMoreAboutUrl: 'https://docs.defiedge.io/category/strategy-manager',
  },
]
