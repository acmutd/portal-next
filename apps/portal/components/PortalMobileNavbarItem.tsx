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

const StyledA = styled(motion.a)`
  position: relative;
  overflow: hidden;

  color: ${(props: ACMNavbarItemPropTypes) => (props.active ? 'white' : 'black')};
  font-size: 20px;
  width: 20%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: ${(props: ACMNavbarItemPropTypes) =>
    props.active
      ? `linear-gradient(30deg,${props.color || '#E10087'} 0%,${
          props.gradientColor || props.color || '#4004C0'
        } 100%)`
      : 'none'};
`;

const NavbarItem = React.forwardRef(
  ({
    active = false,

    // props needed to make the prop next/link compatible
    ref,
    onClick,
    href,

    ...props
  }: ACMNavbarItemPropTypes & NextLinkForwardRefTypes): JSX.Element => {
    const SVGPlaceholder = styled.div`
      width: 50px;
      aspect-ratio: 1;
      background: #00000056;
    `;

    return (
      <StyledA href={href} onClick={onClick} ref={ref} type="button" {...props}>
        <SVGPlaceholder />
        {props.children}
      </StyledA>
    );
  },
);

export default NavbarItem;
