import React from "react";
import { useHistory } from "react-router-dom";
import "./OrangeButton.css";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  redirectURL?: string;
}

const Button = (props: ButtonProps) => {
  const history = useHistory();

  const buttonClick = () => {
    if (props.onClick) props.onClick();
    if (props.redirectURL) history.push(props.redirectURL);
  };

  return (
    <button className="orange-button" onClick={buttonClick}>
      {props.text}
    </button>
  );
};

export default Button;
