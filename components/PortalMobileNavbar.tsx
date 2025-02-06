import React from 'react';
import styled from 'styled-components';

const MobileDiv = styled.div`
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 100%;
  border-radius: 20px 20px 0px 0px;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0px 10px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 50;
`;

// Used to make sure MobileDiv does not overlay content
// Must have same height as MobileDiv
const MobileNavPlaceholder = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 20px;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Navbar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <MobileDiv>{children}</MobileDiv>;
};

export default Navbar;
export { MobileNavPlaceholder };
