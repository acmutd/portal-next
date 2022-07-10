import React from 'react';
import styled from 'styled-components';

interface ACMNavbarPropTypes {
  children?: React.ReactNode;
}

const Navbar: React.FC = ({ children }: ACMNavbarPropTypes) => {
  const MobileDiv = styled.div``;

  return <MobileDiv>{children}</MobileDiv>;
};

export default Navbar;
