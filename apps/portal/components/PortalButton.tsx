import React, { Ref, useState } from 'react';
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
  onClick?: React.MouseEventHandler<HTMLElement>;
  href?: string;
}

const StyledButton = styled(motion.button)<ACMButtonPropTypes>`
  position: relative;
  overflow: hidden;
  background: none;
  padding: 10px 0px;

  width: ${(props: ACMButtonPropTypes) => props.width || (props.fontSize || 24) * 13}px;
  color: ${(props: ACMButtonPropTypes) => (props.theme === 'dark' ? 'white' : 'black')};
  font-size: ${(props: ACMButtonPropTypes) => props.fontSize || 24}px;
  border-radius: ${(props: ACMButtonPropTypes) => (props.rounded ? '25px' : '1px')};
`;

const StyledBG = styled(motion.div)<ACMButtonPropTypes>`
  position: absolute;
  width: 250%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    transparent 40%,
    ${(props: ACMButtonPropTypes) => props.color || '#B2A3F3'} 40%,
    ${(props: ACMButtonPropTypes) => props.gradientColor || props.color || '#B2A3F3'} 100%
  );
`;

const ACMButton = React.forwardRef(
  (
    {
      // props needed to make the prop next/link compatible
      onClick,
      href,
      ...props
    }: NextLinkForwardRefTypes & ACMButtonPropTypes,
    ref: Ref<HTMLAnchorElement>,
  ): JSX.Element => {
    const [hover, setHover] = useState<boolean>(false);

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
          theme={props.theme}
          width={props.width}
          fontSize={props.fontSize}
        >
          <StyledBG
            animate={{
              x: hover ? -(props.width || (props.fontSize || 24) * 13) - 20 : 0,
            }}
            gradientColor={props.gradientColor}
            // {...props}
          />
          <motion.div
            style={{ position: 'relative', zIndex: 999 }}
            animate={{
              scale: hover ? 1.15 : 1,
              transition: { transition },
            }}
          >
            {props.children}
          </motion.div>
        </StyledButton>
      </a>
    );
  },
);

export default ACMButton;
