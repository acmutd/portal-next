import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface CardPropTypes {
  width: number;
  height: number;
}

const Card: React.FC<CardPropTypes> = ({ children, width = 200, height = 200 }) => {
  const [hover, setHover] = useState<boolean>(false);

  const CardOutline = styled(motion.div)`
    width: ${width}px;
    height: ${height}px;
    border-radius: 15px;

    box-shadow: 0px 1px 24px -1px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(50px);
  `;
  return (
    <CardOutline
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      animate={{
        scale: hover ? 1.01 : 1,
        background: hover
          ? `linear-gradient(128.33deg, rgba(255, 255, 255, 0.4) 1.8%, rgba(255, 255, 255, 0.1) 100%)`
          : `linear-gradient(128.33deg, rgba(255, 255, 255, 0.25) 1.8%, rgba(255, 255, 255, 0.05) 100%)`,
      }}
    >
      {children}
    </CardOutline>
  );
};

export default Card;
