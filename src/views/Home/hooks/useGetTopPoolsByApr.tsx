import { useState, useEffect } from 'react'
import { useAppDispatch } from 'state'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { DeserializedPool, VaultKey } from 'state/types'
import { fetchKalosVaultFees, fetchPoolsPublicDataAsync, fetchKalosVaultPublicData } from 'state/pools'
import { usePoolsWithVault } from 'state/pools/hooks'
import { useInitialBlock } from 'state/block/hooks'
import { FetchStatus } from 'config/constants/types'

const useGetTopPoolsByApr = (isIntersecting: boolean) => {
  const dispatch = useAppDispatch()

  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle)
  const [topPools, setTopPools] = useState<DeserializedPool[]>([null, null, null, null, null])
  const initialBlock = useInitialBlock()

  const { pools } = usePoolsWithVault()

  useEffect(() => {
    const fetchPoolsPublicData = async () => {
      setFetchStatus(FetchStatus.Fetching)

      try {
        // It should all be blocking calls since data only fetched once
        await Promise.all([
          dispatch(fetchKalosVaultFees()),
          dispatch(fetchKalosVaultPublicData()),
          dispatch(fetchPoolsPublicDataAsync(initialBlock)),
        ])
        setFetchStatus(FetchStatus.Fetched)
      } catch (e) {
        console.error(e)
        setFetchStatus(FetchStatus.Failed)
      }
    }

    if (isIntersecting && fetchStatus === FetchStatus.Idle && initialBlock > 0) {
      fetchPoolsPublicData()
    }
  }, [dispatch, setFetchStatus, fetchStatus, topPools, isIntersecting, initialBlock])

  useEffect(() => {
    const [xaloPools, otherPools] = partition(pools, (pool) => pool.sousId === 0)
    const masterCakePool = xaloPools.filter((xaloPool) => xaloPool.vaultKey === VaultKey.KalosVault)
    const getTopPoolsByApr = (activePools: DeserializedPool[]) => {
      const sortedByApr = orderBy(activePools, (pool: DeserializedPool) => pool.apr || 0, 'desc')
      setTopPools([...masterCakePool, ...sortedByApr.slice(0, 4)])
    }
    if (fetchStatus === FetchStatus.Fetched && !topPools[0]) {
      getTopPoolsByApr(otherPools)
    }
  }, [setTopPools, pools, fetchStatus, topPools])

  return { topPools }
}

export default useGetTopPoolsByApr
