import React from 'react';
import styled from 'styled-components';

interface ACMNavbarPropTypes {
  children?: React.ReactNode;
}

const Navbar: React.FC = ({ children }: ACMNavbarPropTypes) => {
  const DesktopDiv = styled.div``;

  return <DesktopDiv>{children}</DesktopDiv>;
};

export default Navbar;
