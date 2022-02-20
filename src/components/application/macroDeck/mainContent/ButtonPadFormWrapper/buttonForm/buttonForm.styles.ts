import styled from "styled-components";
import {
  FieldSet,
  SelectField,
  SubmitButton,
  TextField
} from "../../../../../../theme";

export const ButtonForm = styled.form`
  position: relative;
`;

export const ButtonFormFieldSet = styled(FieldSet)`
  > div {
    grid-template-columns: 4.5em auto 2.75em;
  }
`;

export const ButtonFormTextField = styled(TextField)`
  width: calc(100% - 1em);
`;

export const ButtonFormSelectField = styled(SelectField)`
  width: calc(100% - 1em);
`;

export const ButtonFormColor = styled.input`
  width: calc(100% - 1em);
`;

export const ButtonFormSubmitButton = styled(SubmitButton)`
  margin-left: 0.5em;
`;

// Styled.ButtonFormGrid2
