import React from 'react';
import styled from 'styled-components';

const Navbar: React.FC = ({ children }) => {
  const MobileDiv = styled.div`
    position: fixed;
    bottom: 0;
    height: 100px;
    width: 100%;
    border-radius: 20px 20px 0px 0px;
    background-color: white;
    padding: 0px 50px;

    display: flex;
    justify-content: space-evenly;
  `;

  return <MobileDiv>{children}</MobileDiv>;
};

export default Navbar;
