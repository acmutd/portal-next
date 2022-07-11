import React, { RefObject, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ACMNavbarItemPropTypes {
  children?: React.ReactNode;
  color?: string;
  gradientColor?: string;
  theme?: 'light' | 'dark';
}
interface NextLinkForwardRefTypes {
  ref?: RefObject<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
  href?: string;
  // temporary attribute, moving to a state system in the next commits
  active?: boolean;
}

const NavbarItem = React.forwardRef(
  ({
    children,
    color = '#E10087',
    gradientColor = '#4004C0',
    theme = 'dark',
    active = false,

    // props needed to make the prop next/link compatible
    ref,
    onClick,
    href,
  }: ACMNavbarItemPropTypes & NextLinkForwardRefTypes): JSX.Element => {
    const [hover, setHover] = useState<boolean>(false);

    const StyledA = styled(motion.a)`
      position: relative;
      overflow: hidden;
      padding: 10px 0px;

      width: 100%;
      color: ${theme === 'dark' ? 'white' : 'black'};
      font-size: 36px;

      background: ${active
        ? `linear-gradient(90deg,${color} 0%,${gradientColor || color} 100%)`
        : 'none'};
    `;

    return (
      <StyledA
        href={href}
        onClick={onClick}
        ref={ref}
        type="button"
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
      >
        <motion.div
          style={{ position: 'relative', zIndex: 999, paddingLeft: '5%' }}
          animate={{
            scale: hover ? 1.2 : 1,
            x: hover ? 30 : 0,
            transition: { type: 'spring', duration: 0.2 },
          }}
        >
          {children}
        </motion.div>
      </StyledA>
    );
  }
);

export default NavbarItem;
