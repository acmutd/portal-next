import React, { ForwardedRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ACMNavbarItemPropTypes {
  children?: React.ReactNode;
  color?: string;
  gradientColor?: string;
  // temporary attribute, moving to a state system in the next commits
  active?: boolean;
}
interface NextLinkForwardRefTypes {
  ref?: ForwardedRef<HTMLAnchorElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
  href?: string;
}

const NavbarItem = React.forwardRef(
  ({
    children,
    color = '#E10087',
    gradientColor = '#4004C0',
    active = false,

    // props needed to make the prop next/link compatible
    ref,
    onClick,
    href,
  }: ACMNavbarItemPropTypes & NextLinkForwardRefTypes): JSX.Element => {
    const StyledA = styled(motion.a)`
      position: relative;
      overflow: hidden;

      color: ${active ? 'white' : 'black'};
      font-size: 20px;
      width: 20%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      background: ${active
        ? `linear-gradient(30deg,${color} 0%,${gradientColor || color} 100%)`
        : 'none'};
    `;

    const SVGPlaceholder = styled.div`
      width: 50px;
      aspect-ratio: 1;
      background: #00000056;
    `;

    return (
      <StyledA href={href} onClick={onClick} ref={ref} type="button">
        <SVGPlaceholder />
        {children}
      </StyledA>
    );
  },
);

export default NavbarItem;
