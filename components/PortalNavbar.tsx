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
  top: 0;
`;

const DesktopDivBG = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 90%;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
`;


export default function Navbar({ children }: React.PropsWithChildren<unknown>) {
  return (
    <div id="portal-navbar">
      <Placeholder />
      <DesktopDiv>
        <DesktopDivBG />
        {children}
      </DesktopDiv>
    </div>
  );
}
