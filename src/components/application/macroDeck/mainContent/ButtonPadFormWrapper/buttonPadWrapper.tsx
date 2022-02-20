import React from "react";
import ActionForm from "./actionForm/actionForm";
import ActionList from "./actionList/actionList";
import ButtonForm from "./buttonForm/buttonForm";
import * as Styled from "./buttonPadWrapper.styles";

const ButtonPadFormWrapper: React.FC<{}> = () => {
  return (
    <>
      <Styled.ButtonPadOptionGrid>
        <div>
          <ButtonForm />
        </div>
        <div>
          <ActionList />
        </div>
        <div>
          <ActionForm />
        </div>
      </Styled.ButtonPadOptionGrid>
    </>
  );
};

export default ButtonPadFormWrapper;
