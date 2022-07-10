import React from 'react';
import styled from 'styled-components';

interface ACMNavbarPropTypes {
    children?: React.ReactNode;
}

const Navbar: React.FC = ({ children }: ACMNavbarPropTypes) => {
    const DesktopDiv = styled.div`
        display: flex;
        height: 100%;
        width: 300px;
        max-width: 30%;
        min-width: 12%;

        flex-direction: column;
        justify-content: center;
        row-gap: 2em;
        background-color: #212121b3;
    `;

    return (
        <DesktopDiv>
            <div>home</div>
            <div>events</div>
            <div>apply</div>
            <div>profile</div>
            <div>account</div>
            <div>resumes</div>
        </DesktopDiv>
    );
};

export default Navbar;
