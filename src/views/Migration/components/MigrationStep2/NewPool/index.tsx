import React, { useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useKalosVault, usePoolsWithVault } from 'state/pools/hooks'
import { useFastRefreshEffect } from 'hooks/useRefreshEffect'
import { useAppDispatch } from 'state'
import {
  fetchKalosPoolUserDataAsync,
  fetchKalosVaultFees,
  fetchKalosVaultPublicData,
  fetchKalosVaultUserData,
  fetchKalosPoolPublicDataAsync,
  fetchXaloFlexibleSideVaultPublicData,
  fetchXaloFlexibleSideVaultUserData,
  fetchXaloFlexibleSideVaultFees,
} from 'state/pools'
import { batch } from 'react-redux'
import PoolsTable from './PoolTable'

const NewPool: React.FC = () => {
  const { account } = useWeb3React()
  const { pools } = usePoolsWithVault()
  const kalosVault = useKalosVault()

  const stakedOnlyOpenPools = useMemo(
    () => pools.filter((pool) => pool.userData && pool.sousId === 0 && !pool.isFinished),
    [pools],
  )

  const userDataReady: boolean = !account || (!!account && !kalosVault.userData?.isLoading)

  const dispatch = useAppDispatch()

  useFastRefreshEffect(() => {
    batch(() => {
      dispatch(fetchKalosVaultPublicData())
      dispatch(fetchKalosFlexibleSideVaultPublicData())
      dispatch(fetchKalosPoolPublicDataAsync())
      if (account) {
        dispatch(fetchKalosVaultUserData({ account }))
        dispatch(fetchXaloFlexibleSideVaultUserData({ account }))
        dispatch(fetchKalosPoolUserDataAsync(account))
      }
    })
  }, [account, dispatch])

  useEffect(() => {
    batch(() => {
      dispatch(fetchKalosVaultFees())
      dispatch(fetchXaloFlexibleSideVaultFees())
    })
  }, [dispatch])

  return <PoolsTable pools={stakedOnlyOpenPools} account={account} userDataReady={userDataReady} />
}

export default NewPool
