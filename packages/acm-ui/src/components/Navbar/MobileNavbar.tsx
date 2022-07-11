import React from 'react';
import styled from 'styled-components';

interface ACMNavbarPropTypes {
  children?: React.ReactNode;
}

const Navbar: React.FC = ({ children }: ACMNavbarPropTypes) => {
  const MobileDiv = styled.div`
    position: fixed;
    bottom: 0;
    height: 100px;
    width: 100%;
    background-color: blue;

    display: flex;
    justify-content: space-evenly;
  `;

  return <MobileDiv>{children}</MobileDiv>;
};

export default Navbar;
