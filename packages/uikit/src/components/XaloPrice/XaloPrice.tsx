import React from "react";
import styled from "styled-components";
import LogoRound from "../Svg/Icons/LogoRound";
import Text from "../Text/Text";
import Skeleton from "../Skeleton/Skeleton";
import { Colors } from "../../theme";

export interface Props {
  color?: keyof Colors;
  xaloPriceUsd?: number;
  showSkeleton?: boolean;
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const XaloPrice: React.FC<Props> = ({ xaloPriceUsd, color = "textSubtle", showSkeleton = true }) => {
  return xaloPriceUsd ? (
    <PriceLink
      href="https://kalosdefi.finance/swap?outputCurrency=0x0739138e18B0273d8375F83EF5351d68E9285f1E"
      target="_blank"
    >
      <LogoRound width="24px" mr="8px" />
      <Text color={color} bold>{`$${xaloPriceUsd.toFixed(3)}`}</Text>
    </PriceLink>
  ) : showSkeleton ? (
    <Skeleton width={80} height={24} />
  ) : null;
};

export default React.memo(XaloPrice);
