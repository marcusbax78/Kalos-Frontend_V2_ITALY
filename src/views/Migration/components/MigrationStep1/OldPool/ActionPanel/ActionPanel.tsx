import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { DeserializedPool, VaultKey } from 'state/types'
import { useVaultPoolByKeyV1 } from 'views/Migration/hook/V1/Pool/useFetchIfoPool'
import { BIG_ZERO } from 'utils/bigNumber'
import { getKalosVaultEarnings } from 'views/Pools/helpers'
import Staked from './Stake'
import AutoEarning from './AutoEarning'
import Earning from './Earning'
import TotalStaked from './TotalStaked'

const expandAnimation = keyframes`
  from {
    opacity: 0;
    max-height: 0px;
  }
  to {
    opacity: 1;
    max-height: 700px;
  }
`

const collapseAnimation = keyframes`
  from {
    opacity: 1;
    max-height: 700px;
  }
  to {
    opacity: 0;
    max-height: 0px;
  }
`

const StyledActionPanel = styled.div<{ expanded: boolean }>`
  opacity: 1;
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} linear forwards
        `};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.dropdown};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 16px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 12px 10px;
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
    margin-bottom: 24px;
  }
`

interface ActionPanelProps {
  pool: DeserializedPool
  account: string
  expanded: boolean
}

const ActionPanel: React.FC<ActionPanelProps> = ({ pool, account, expanded }) => {
  const { vaultPoolData } = useVaultPoolByKeyV1(pool.vaultKey)
  const { totalXaloInVault, pricePerFullShare } = vaultPoolData
  const { xaloAtLastUserAction, userShares } = vaultPoolData.userData

  const vaultPools = {
    [VaultKey.KalosVaultV1]: useVaultPoolByKeyV1(VaultKey.KalosVaultV1).vaultPoolData,
    [VaultKey.IfoPool]: useVaultPoolByKeyV1(VaultKey.IfoPool).vaultPoolData,
  }
  const xaloInVaults = Object.values(vaultPools).reduce((total, vault) => {
    return total.plus(vault.totalXaloInVault)
  }, BIG_ZERO)

  // Auto Earning
  let earningTokenBalance = 0
  let earningTokenDollarBalance = 0
  if (pricePerFullShare) {
    const { autoXaloToDisplay, autoUsdToDisplay } = getKalosVaultEarnings(
      account,
      xaloAtLastUserAction,
      userShares,
      pricePerFullShare,
      pool.earningTokenPrice,
    )
    earningTokenBalance = autoXaloToDisplay
    earningTokenDollarBalance = autoUsdToDisplay
  }

  return (
    <StyledActionPanel expanded={expanded}>
      <ActionContainer>
        {pool.vaultKey ? (
          <AutoEarning
            earningTokenBalance={earningTokenBalance}
            earningTokenDollarBalance={earningTokenDollarBalance}
            earningTokenPrice={pool.earningTokenPrice}
          />
        ) : (
          <Earning {...pool} />
        )}
        <Staked pool={pool} />
      </ActionContainer>
      <TotalStaked pool={pool} totalXaloInVault={totalXaloInVault} xaloInVaults={xaloInVaults} />
    </StyledActionPanel>
  )
}

export default ActionPanel
