import React from 'react'
import SquareTile from './Tile/SquareTile';
import StackGrid, { transitions } from "react-stack-grid";
import RectTile from './Tile/RectTile';

const { scaleDown } = transitions;

const TileGrid = () => {
    return (
        <StackGrid
            columnWidth={230}
            gutterWidth={20}
            gutterHeight={20}
            appear={scaleDown.appear}
            appeared={scaleDown.appeared}
            enter={scaleDown.enter}
            entered={scaleDown.entered}
            leaved={scaleDown.leaved}
        >
            <SquareTile title="ACM Kickoff" date="Today" time="8:30PM" num={Math.floor(Math.random()*6)}/>
            <RectTile title="Socket.IO Workshop" date="Tomorrow" time="6:30PM" num={Math.floor(Math.random()*6)}/>
            <SquareTile title="Presentation Night" date="November 15th" time="7:00PM" num={Math.floor(Math.random()*6)}/>
            <RectTile title="AWS Introduction" date="July 26th" time="6:00PM" num={Math.floor(Math.random()*6)}/>
            <SquareTile title="AWS Series" date="August 2nd" time="10:00PM" num={Math.floor(Math.random()*6)}/>
            <RectTile title="Mentor Kickoff" date="August 12th" time="2:30PM" num={Math.floor(Math.random()*6)}/>
            <SquareTile title="HackUTD JAM" date="October 3rd" time="5:00PM" num={Math.floor(Math.random()*6)}/>
            <RectTile title="Intro to Linux" date="October 6th" time="3:00PM" num={Math.floor(Math.random()*6)}/>
            <SquareTile title="Github Basics" date="October 13th" time="10:30AM" num={Math.floor(Math.random()*6)}/>
            <RectTile title="Local Hack Day" date="October 14th" time="All Day" num={Math.floor(Math.random()*6)}/>
            <SquareTile title="Google X ACM" date="October 17th" time="8:30PM" num={Math.floor(Math.random()*6)}/>
            <RectTile title="Facebook X ACM" date="September 1st" time="9:00AM" num={Math.floor(Math.random()*6)}/>
            <SquareTile title="Donuts with ECS" date="September 10th" time="Noon" num={Math.floor(Math.random()*6)}/>
            <RectTile title="Networking with Alumni" date="September 11th" time="All Day" num={Math.floor(Math.random()*6)}/>
            <SquareTile title="Mentor Social" date="September 19th" time="7:00PM" num={Math.floor(Math.random()*6)}/>
            <RectTile title="Career Workshop" date="September 20th" time="5:00PM" num={Math.floor(Math.random()*6)}/>
            <SquareTile title="LinkedIn X ACM" date="September 28th" time="4:00PM" num={Math.floor(Math.random()*6)}/>
            <RectTile title="IEEE X ACM" date="August 13th" time="8:30PM" num={Math.floor(Math.random()*6)}/>
            <SquareTile title="ACM Development Showcase" date="August 17th" time="10:00AM" num={Math.floor(Math.random()*6)}/>
            <RectTile title="ACM Kickoff" date="Today" time="8:30PM" num={Math.floor(Math.random()*6)}/>
            <SquareTile title="ACM Kickoff" date="Today" time="8:30PM" num={Math.floor(Math.random()*6)}/>
            <RectTile title="ACM Kickoff" date="Today" time="8:30PM" num={Math.floor(Math.random()*6)}/>
            <SquareTile title="ACM Kickoff" date="Today" time="8:30PM" num={Math.floor(Math.random()*6)}/>
            <RectTile title="ACM Kickoff" date="Today" time="8:30PM" num={Math.floor(Math.random()*6)}/>
            <SquareTile title="ACM Kickoff" date="Today" time="8:30PM" num={Math.floor(Math.random()*6)}/>
            <RectTile title="ACM Kickoff" date="Today" time="8:30PM" num={Math.floor(Math.random()*6)}/>
            <SquareTile title="ACM Kickoff" date="Today" time="8:30PM" num={Math.floor(Math.random()*6)}/>
            <RectTile title="ACM Kickoff" date="Today" time="8:30PM" num={Math.floor(Math.random()*6)}/>
        </StackGrid>
    );
}

export default TileGrid;