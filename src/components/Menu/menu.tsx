import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../assets/svgs/close_outline_outline.svg'

interface MenuProps {
    active: boolean,
    onClose(): void
}

const Menu = ({ active, onClose }: MenuProps) => {
    return active ? (
        <MenuComponent onClick={onClose}>
            <div className="menu-controls">
                <div className="menu-controls-close" onClick={onClose}>
                    <CloseIcon></CloseIcon>
                </div>
            </div>
            <div className="menu-content">
                <MenuItem onClick={() => console.log("Home")}>Home</MenuItem>
                <MenuItem onClick={() => console.log("Events")}>Events</MenuItem>
                <MenuItem onClick={() => console.log("About Us")}>About Us</MenuItem>
                <MenuItem onClick={() => console.log("Contact")}>Contact</MenuItem>
            </div>
        </MenuComponent>
    ) : (<div></div>);
}

const MenuComponent = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    backdrop-filter: blur(7px);
    background: rgba(0,0,0,0.8);
    z-index: 9000;
    display: flex;
    flex-flow: column;

    .menu-controls {
        height: 10rem;
        margin: 4rem auto 0px;
        color: white;

        .menu-controls-close * {
            background: rgba(0,0,0,0);
            border: none;
            fill: rgba(0,0,0,0);
            transition: all 0.2s ease-in-out;
            :hover * {
                fill: white;
            }
        }

    }
    
    .menu-content {
        margin: 0rem auto;
        display: flex;
        flex-flow: column;
    }
`

const MenuItem = styled.button`
    color: rgba(0,0,0,0);
    font-weight: bold;
    font-size: 5rem;
    background: none;
    margin-bottom: 1rem;
    border: none;
    letter-spacing: 3px;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: white;
    transition: all 0.1s ease-in;

    :hover {
        color: white;
        transform: scale(1.1);
    }

    :focus {outline:0;}
`

export default Menu;