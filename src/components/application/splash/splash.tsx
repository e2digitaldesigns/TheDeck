import React from "react";
import logo from "./../../../assets/images/logo.png";
import * as Styled from "./splash.styles";

const Splash: React.FC = () => {
  return (
    <Styled.SplashDiv>
      <img alt="macro deck logo" src={logo} />
    </Styled.SplashDiv>
  );
};

export default Splash;
