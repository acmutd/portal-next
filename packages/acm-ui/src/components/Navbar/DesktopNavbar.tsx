import React from 'react';
import styled from 'styled-components';

const Navbar: React.FC = ({ children }): JSX.Element => {
  const DesktopDiv = styled.div`
    display: flex;
    position: relative;
    height: 100%;
    width: 10%;
    min-width: 280px;

    flex-direction: column;
    justify-content: center;
    row-gap: 2em;
  `;

  const DesktopDivBG = styled.div`
    background-color: #ffffff17;
    backdrop-filter: blur(5px);
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 90%;
  `;

  return (
    <DesktopDiv>
      <DesktopDivBG />
      {children}
    </DesktopDiv>
  );
};

export default Navbar;
