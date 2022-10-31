import React, { RefObject, useState } from 'react';
import styled, { StyledComponent } from 'styled-components';
import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion';

interface ACMNavbarItemPropTypes {
  children?: React.ReactNode;
  color?: string;
  gradientColor?: string;
  theme?: 'light' | 'dark';
  $active?: boolean;
  isLogo?: boolean;
}
interface NextLinkForwardRefTypes {
  onClick?: React.MouseEventHandler<HTMLElement>;
  href?: string;
  // temporary attribute, moving to a state system in the next commits
}

const StyledA = styled(motion.a)<ACMNavbarItemPropTypes>`
  position: relative;
  overflow: hidden;
  padding: 10px 0px;

  width: 100%;
  color: ${(props) => (props.theme === 'dark' ? 'white' : 'black')};
  font-size: 36px;

  background: ${(props) =>
    props.$active
      ? `linear-gradient(90deg,${props.color || '#E10087'} 0%,${
          props.gradientColor || props.color || '#4004C0'
        } 100%)`
      : 'none'};
`;

const StyledLogo = styled(motion.a)`
  position: relative;
  overflow: hidden;
  padding: 10px 0px;

  display: flex;
  width: 90%;
  justify-content: center;
  place-items: center;
  margin-top: -40%;
`;

const NavbarItem = React.forwardRef<
  HTMLAnchorElement,
  ACMNavbarItemPropTypes & NextLinkForwardRefTypes
>(
  (
    {
      theme = 'dark',
      $active = false,
      isLogo = false,

      onClick,
      href,

      ...props
    },
    ref,
  ): JSX.Element => {
    const [hover, setHover] = useState<boolean>(false);

    if (isLogo)
      return (
        <StyledLogo
          href={href}
          onClick={onClick}
          ref={ref}
          type="button"
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
        >
          {props.children}
        </StyledLogo>
      );

    return (
      <StyledA
        href={href}
        onClick={onClick}
        ref={ref}
        type="button"
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        $active={$active}
        theme={theme}
      >
        <motion.div
          style={{ position: 'relative', zIndex: 999, paddingLeft: '5%' }}
          animate={{
            scale: hover ? 1.2 : 1,
            x: hover ? 30 : 0,
            transition: { type: 'spring', duration: 0.2 },
          }}
        >
          {props.children}
        </motion.div>
      </StyledA>
    );
  },
);

export default NavbarItem;
