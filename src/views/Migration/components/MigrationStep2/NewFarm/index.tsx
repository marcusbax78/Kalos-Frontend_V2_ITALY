import React, { useMemo, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getFarmApr } from 'utils/apr'
import { RowType } from '@pancakeswap/uikit'
import { ChainId } from '@kalosdefi/sdk'
import { useFarms, usePriceCakeBusd, usePollFarmsWithUserData } from 'state/farms/hooks'
import { useFarmsV1 } from 'state/farmsV1/hooks'
import { DeserializedFarm } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { FarmWithStakedValue } from 'views/Farms/components/types'
import { getDisplayApr } from 'views/Farms/components/getDisplayApr'
import OldFarm from './FarmTable'
import { RowProps } from './FarmRow'
import { DesktopV2ColumnSchema } from '../../types'

const OldFarmStep1: React.FC = () => {
  const { account } = useWeb3React()
  const { data: farmsLP, userDataLoaded, regularXaloPerBlock } = useFarms()
  const { data: farmsV1LP } = useFarmsV1()
  const xaloPrice = usePriceCakeBusd()

  usePollFarmsWithUserData()

  const userDataReady = !account || (!!account && userDataLoaded)

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  const activeFarmsV1 = farmsV1LP.filter((farm) => farm.pid !== 0)

  const v1StakedOrHasTokenBalance = activeFarmsV1.filter((farm) => {
    const hasStakedBalance = new BigNumber(farm.userData.stakedBalance).isGreaterThan(0)
    const hasTokenBalance = new BigNumber(farm.userData.tokenBalance).isGreaterThan(0)
    return farm.userData && (hasStakedBalance || hasTokenBalance)
  })

  // Only show farms that has staked or has balance in v1 & v2
  const stakedOrHasTokenBalance = activeFarms.filter((farm) => {
    const hasStakedBalance = new BigNumber(farm.userData.stakedBalance).isGreaterThan(0)
    const hasTokenBalance = new BigNumber(farm.userData.tokenBalance).isGreaterThan(0)
    const farms = v1StakedOrHasTokenBalance.find(
      (v1Farm) => v1Farm.pid === farm.pid && v1Farm.lpSymbol === farm.lpSymbol,
    )
    return farm.userData && (hasStakedBalance || hasTokenBalance || farms)
  })

  const farmsList = useCallback(
    (farmsToDisplay: DeserializedFarm[]): FarmWithStakedValue[] => {
      const farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteTokenPriceBusd) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteTokenPriceBusd)
        const { xaloRewardsApr, lpRewardsApr } = getFarmApr(
          new BigNumber(farm.poolWeight),
          xaloPrice,
          totalLiquidity,
          farm.lpAddresses[ChainId.MAINNET],
          regularXaloPerBlock,
        )
        return { ...farm, apr: xaloRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      return farmsToDisplayWithAPR
    },
    [xaloPrice, regularXaloPerBlock],
  )

  const chosenFarmsMemoized = useMemo(() => {
    return farmsList(stakedOrHasTokenBalance)
  }, [stakedOrHasTokenBalance, farmsList])

  const rowData = chosenFarmsMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('KALOS', '')

    const row: RowProps = {
      apr: {
        value: getDisplayApr(farm.apr, farm.lpRewardsApr),
        pid: farm.pid,
        multiplier: farm.multiplier,
        lpLabel,
        lpSymbol: farm.lpSymbol,
        tokenAddress,
        quoteTokenAddress,
        xaloPrice,
        originalValue: farm.apr,
      },
      farm: {
        ...farm,
        label: lpLabel,
        pid: farm.pid,
        token: farm.token,
        lpSymbol: farm.lpSymbol,
        quoteToken: farm.quoteToken,
      },
      staked: {
        label: lpLabel,
        pid: farm.pid,
        stakedBalance: farm.userData.stakedBalance,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    const columns = DesktopV2ColumnSchema.map((column) => ({
      id: column.id,
      name: column.name,
      label: column.label,
      sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
        switch (column.name) {
          case 'farm':
            return b.id - a.id
          default:
            return 1
        }
      },
    }))

    return <OldFarm account={account} data={rowData} columns={columns} userDataReady={userDataReady} />
  }

  return <>{renderContent()}</>
}

export default OldFarmStep1
