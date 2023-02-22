import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// props for the card, be sure to includa any new props in this interface
interface CardPropTypes {
  width: number;
  height: number;
  onClick?: () => void;
}

const CardOutline = styled(motion.div)`
  width: ${(props: CardPropTypes) => props.width || 200}px;
  height: ${(props: CardPropTypes) => props.height || 200}px;
  border-radius: 15px;
  padding: 18px;

  box-shadow: 0px 1px 24px -1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);
`;

export default function ACMCard({ children, ...props }: React.PropsWithChildren<CardPropTypes>) {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <CardOutline
      onClick={props.onClick}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      animate={{
        scale: hover ? 1.01 : 1,
        background: hover
          ? `linear-gradient(128.33deg, rgba(255, 255, 255, 0.4) 1.8%, rgba(255, 255, 255, 0.1) 100%)`
          : `linear-gradient(128.33deg, rgba(255, 255, 255, 0.25) 1.8%, rgba(255, 255, 255, 0.05) 100%)`,
      }}
      {...props}
    >
      {children}
    </CardOutline>
  );
}
