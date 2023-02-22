import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ACMButtonProps {
  width: number;
  theme: 'light' | 'dark';
  fontSize: number;
  rounded: boolean;
}

interface ACMButtonBGProps {
  color?: string;
  gradientcolor?: string;
}

type ACMButtonPropTypes = ACMButtonProps & ACMButtonBGProps;

interface NextLinkForwardRefTypes {
  onClick: React.MouseEventHandler<HTMLElement>;
  href: string;
}

const StyledButton = styled(motion.button)<ACMButtonProps>`
  position: relative;
  overflow: hidden;
  background: none;
  padding: 10px 0px;

  width: ${(props) => props.width}px;
  color: ${(props) => (props.theme === 'dark' ? 'white' : 'black')};
  font-size: ${(props) => props.fontSize}px;
  border-radius: ${(props) => (props.rounded ? '25px' : '1px')};
`;

const StyledBG = styled(motion.div)<ACMButtonBGProps>`
  position: absolute;
  width: 250%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    transparent 40%,
    ${(props) => props.color} 40%,
    ${(props) => props.gradientcolor || props.color} 100%
  );
`;

const populateProps = (
  props: React.PropsWithChildren<Partial<ACMButtonPropTypes & NextLinkForwardRefTypes>>,
): React.PropsWithChildren<ACMButtonPropTypes & Partial<NextLinkForwardRefTypes>> => {
  const { width, fontSize, color, gradientcolor, theme, rounded, ...rest } = props;
  return {
    width: width || 200,
    fontSize: fontSize || 24,
    color: color || '#B2A3F3',
    gradientcolor: gradientcolor,
    theme: theme || 'dark',
    rounded: !!rounded,
    ...rest,
  };
};

const ACMButton = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<Partial<ACMButtonPropTypes & NextLinkForwardRefTypes>>
>((props, ref) => {
  const [hover, setHover] = useState<boolean>(false);

  const { width, fontSize, color, gradientcolor, theme, rounded, href, onClick, children } =
    populateProps(props);

  const transition = { type: 'spring', duration: 0.5, bounce: 0.4 };

  return (
    <a href={href} onClick={onClick} ref={ref}>
      <StyledButton
        animate={{
          scale: hover ? 1.02 : 1,
          transition,
        }}
        type="button"
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        width={width}
        fontSize={fontSize}
        rounded={rounded}
        theme={theme}
      >
        <StyledBG
          animate={{ x: hover ? -(width || 200) - 20 : 0 }}
          color={color}
          gradientcolor={gradientcolor}
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
});

export default ACMButton;
