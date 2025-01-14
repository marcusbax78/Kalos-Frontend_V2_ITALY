import { Flex, Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { DeserializedPool, VaultKey, DeserializedLockedVaultUser } from 'state/types'
import { getKalosVaultEarnings } from 'views/Pools/helpers'
import RecentXaloProfitBalance from './RecentXaloProfitBalance'

const RecentXaloProfitCountdownRow = ({ pool }: { pool: DeserializedPool }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { pricePerFullShare, userData } = useVaultPoolByKey(pool.vaultKey)
  const xaloPriceBusd = usePriceCakeBusd()
  const { hasAutoEarnings, autoXaloToDisplay } = getKalosVaultEarnings(
    account,
    userData.xaloAtLastUserAction,
    userData.userShares,
    pricePerFullShare,
    xaloPriceBusd.toNumber(),
    pool.vaultKey === VaultKey.KalosVault
      ? (userData as DeserializedLockedVaultUser).currentPerformanceFee.plus(
          (userData as DeserializedLockedVaultUser).currentOverdueFee,
        )
      : null,
  )

  if (!(userData.userShares.gt(0) && account)) {
    return null
  }

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="14px">{`${t('Recent XALO profit')}:`}</Text>
      {hasAutoEarnings && <RecentXaloProfitBalance cakeToDisplay={autoXaloToDisplay} pool={pool} account={account} />}
    </Flex>
  )
}

export default RecentXaloProfitCountdownRow
