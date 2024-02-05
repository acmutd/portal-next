import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ACMNavbarItemPropTypes {
  children?: React.ReactNode;
  color?: string;
  gradientColor?: string;
  // temporary attribute, moving to a state system in the next commits
  $active?: boolean;
}
interface NextLinkForwardRefTypes {
  onClick?: React.MouseEventHandler<HTMLElement>;
  href?: string;
}

const StyledA = styled(motion.a) <ACMNavbarItemPropTypes>`
  position: relative;
  overflow: hidden;

  color: ${(props: ACMNavbarItemPropTypes) => (props.$active ? 'white' : 'black')};
  font-size: 15px;
  width: 20%;  

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  background: ${(props: ACMNavbarItemPropTypes) =>
    props.$active
      ? `linear-gradient(30deg,${props.color || '#E10087'} 0%,${
          props.gradientColor || props.color || '#4004C0'
        } 100%)`
      : 'none'};
`;

const SVGPlaceholder = styled.div`
  width: 50px;
  aspect-ratio: 1;
  background: #00000056;
`;

const NavbarItem = React.forwardRef<
  HTMLAnchorElement,
  ACMNavbarItemPropTypes & NextLinkForwardRefTypes
>(
  (
    {
      $active = false,

      // props needed to make the prop next/link compatible
      onClick,
      href,

      ...props
    }: ACMNavbarItemPropTypes & NextLinkForwardRefTypes,
    ref,
  ): JSX.Element => {
    return (
      <StyledA href={href} onClick={onClick} ref={ref} type="button" $active={$active} {...props}>
        {props.children}
      </StyledA>
    );
  },
);

export default NavbarItem;
