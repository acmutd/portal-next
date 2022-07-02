import React, { RefObject, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ACMButtonPropTypes {
  children?: React.ReactNode;
  width?: number;
  fontSize?: number;
  color?: string;
  gradientColor?: string;
  theme?: 'light' | 'dark';
  rounded?: boolean;
}
interface NextLinkForwardRefTypes {
  ref?: RefObject<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
  href?: string;
}

const Button = React.forwardRef(
  ({
    children,
    width = 200,
    fontSize = 24,
    color = 'B2A3F3',
    gradientColor,
    theme = 'dark',
    rounded = false,
    // props needed to make the prop next/link compatible
    ref,
    onClick,
    href,
  }: ACMButtonPropTypes & NextLinkForwardRefTypes): JSX.Element => {
    const [hover, setHover] = useState<boolean>(false);

    const StyledButton = styled(motion.button)`
      position: relative;
      overflow: hidden;
      background: none;
      padding: 10px 0px;

      width: ${width}px;
      color: ${theme === 'dark' ? 'white' : 'black'};
      font-size: ${fontSize}px;
      border-radius: ${rounded ? '25px' : '1px'};
    `;

    const StyledBG = styled(motion.div)`
      position: absolute;
      width: 250%;
      height: 100%;
      top: 0;
      left: 0;
      background: linear-gradient(
        90deg,
        transparent 40%,
        #${color} 40%,
        #${gradientColor || color} 100%
      );
    `;

    const transition = {
      type: 'spring',
      duration: 0.5,
      bounce: 0.4,
    };

    return (
      <a href={href} onClick={onClick} ref={ref}>
        <StyledButton
          type="button"
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
          animate={{
            scale: hover ? 1.02 : 1,
            transition: { transition },
          }}
        >
          <StyledBG
            animate={{
              x: hover ? -width - 20 : 0,
            }}
          />
          <motion.div
            style={{ position: 'relative', zIndex: 999 }}
            animate={{
              scale: hover ? 1.15 : 1,
              transition: { transition },
            }}
          >
            {children}
          </motion.div>
        </StyledButton>
      </a>
    );
  }
);

export default Button;
