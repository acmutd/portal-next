import React from "react";
import styled from "styled-components";
import { ReactComponent as EduLogo } from "../../../assets/svgs/edu.svg"
import one from "../../../assets/images/flyer.png";
import two from "../../../assets/images/arduino.png";
import three from "../../../assets/images/cscareers.png";
import four from "../../../assets/images/donuts.png";
import five from "../../../assets/images/interview.png";
import six from "../../../assets/images/sweacmfinal.png";

interface propTypes {
  title: string;
  date: string;
  time: string;
  num: number;
}

const SquareTile = (props: propTypes) => {
  return (
    <TileComponent tabIndex={props.num}>
      <div className="tile-card">
        <div className="tile-content">
          <div className="tile-top">
            <div className="tile-title">{props.title}</div>
          </div>
          <div className="tile-end">
            <div className="tile-end-left">
              <div className="tile-date">{props.date}</div>
              <div className="tile-time">{props.time}</div>
            </div>
            <div className="tile-end-right">
              <EduLogo />
            </div>
          </div>
        </div>
      </div>
    </TileComponent>
  );
};

//the next few lines are temporary, just to get a cool effect even though its hardcoded
//absolutely will get refactored
let arrayOfImages = [one, two, three, four, five, six];

const TileComponent = styled.div`
  .tile-card {
    width: 230px;
    height: 230px;
    border-radius: 30px;
    background:url(${props => arrayOfImages[props.tabIndex ? props.tabIndex : 1]});
    color: white;
  }
  .tile-content {
    padding: 1.3rem;
    display: flex;
    height: inherit;
    flex-flow: column;
    /* for the dark tint */
    background: rgba(0,0,0,0.22);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    justify-content: space-between;
  }
  .tile-end {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 1.1rem;
  }
  .tile-end-right {
    margin-left: 0.7rem;
  }
  /* Text */
  .tile-title {
    font-size: 1.8rem;
    font-weight: bold;
  }

  :hover {
    transform: scale(1.07)
  }

  :focus {outline:0;}
`;

export default SquareTile;
