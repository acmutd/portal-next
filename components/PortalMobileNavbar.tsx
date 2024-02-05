import React from 'react';
import styled from 'styled-components';

const MobileDiv = styled.div`
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 100%;
  border-radius: 20px 20px 0px 0px;
  background-color: white;
  padding: 0px 10px;

  display: flex;
  justify-content: space-evenly;
`;

const Navbar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <MobileDiv>{children}</MobileDiv>;
};

// Used to make sure MobileDiv does not overlay content
// Must have same height as MobileDiv
const MobileNavPlaceholder = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 20px;
`;

export default Navbar;

export { MobileNavPlaceholder };
