import BigNumber from 'bignumber.js'
import { multicallv2 } from 'utils/multicall'
import kalosVaultAbi from 'config/abi/xaloVaultV2.json'
import { getKalosVaultAddress, getXaloFlexibleSideVaultAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { getXaloContract } from 'utils/contractHelpers'

const kalosVault = getKalosVaultAddress()
const cakeFlexibleSideVaultV2 = getXaloFlexibleSideVaultAddress()
const xaloContract = getXaloContract()
export const fetchPublicVaultData = async (xaloVaultAddress = kalosVault) => {
  try {
    const calls = ['getPricePerFullShare', 'totalShares', 'totalLockedAmount'].map((method) => ({
      address: xaloVaultAddress,
      name: method,
    }))

    const [[[sharePrice], [shares], totalLockedAmount], totalXaloInVault] = await Promise.all([
      multicallv2(kalosVaultAbi, calls, {
        requireSuccess: false,
      }),
      xaloContract.balanceOf(kalosVault),
    ])

    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const totalLockedAmountAsBigNumber = totalLockedAmount ? new BigNumber(totalLockedAmount[0].toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      totalLockedAmount: totalLockedAmountAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalXaloInVault: new BigNumber(totalXaloInVault.toString()).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      totalLockedAmount: null,
      pricePerFullShare: null,
      totalXaloInVault: null,
    }
  }
}

export const fetchPublicFlexibleSideVaultData = async (xaloVaultAddress = cakeFlexibleSideVaultV2) => {
  try {
    const calls = ['getPricePerFullShare', 'totalShares'].map((method) => ({
      address: xaloVaultAddress,
      name: method,
    }))

    const [[[sharePrice], [shares]], totalXaloInVault] = await Promise.all([
      multicallv2(kalosVaultAbi, calls, {
        requireSuccess: false,
      }),
      xaloContract.balanceOf(xaloVaultAddress),
    ])

    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalXaloInVault: new BigNumber(totalXaloInVault.toString()).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      pricePerFullShare: null,
      totalXaloInVault: null,
    }
  }
}

export const fetchVaultFees = async (kalosVaultAddress = kalosVault) => {
  try {
    const calls = ['performanceFee', 'withdrawFee', 'withdrawFeePeriod'].map((method) => ({
      address: kalosVaultAddress,
      name: method,
    }))

    const [[performanceFee], [withdrawalFee], [withdrawalFeePeriod]] = await multicallv2(kalosVaultAbi, calls)

    return {
      performanceFee: performanceFee.toNumber(),
      withdrawalFee: withdrawalFee.toNumber(),
      withdrawalFeePeriod: withdrawalFeePeriod.toNumber(),
    }
  } catch (error) {
    return {
      performanceFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

export default fetchPublicVaultData
