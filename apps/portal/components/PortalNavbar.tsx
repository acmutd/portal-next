import React from 'react';
import styled from 'styled-components';

// height and width must be same as DesktopDiv
const Placeholder = styled.div`
  height: 100%;
  width: 10%;
  min-width: 280px;
`;

const DesktopDiv = styled.div`
  display: flex;
  position: fixed;
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

export default function Navbar({ children }) {
  return (
    <>
      <Placeholder />
      <DesktopDiv>
        <DesktopDivBG />
        {children}
      </DesktopDiv>
    </>
  );
}
