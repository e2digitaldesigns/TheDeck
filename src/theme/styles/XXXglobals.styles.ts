import styled from "styled-components";

export const SubmitButton = styled.button`
  background-color: ${props => props.theme.colors.accent1};
  color: white;
  padding: 0.5em 0.5em;
  margin: 0.5em 0;
  border: none;
  border-radius: 0.25em;
  float: right;
  cursor: pointer;
  border: none;
  outline: none;
  &:hover {
    background-color: ${props => props.theme.colors.accent1};
  }
  &:focus {
    border: none;
    text-decoration: none;
  }
  &:active {
    border: none;
    text-decoration: none;
  }
  &:disabled {
    background-color: ${props => props.theme.colors.accent1};
    color: #bbb;
    cursor: default;
    opacity: 0.5;
  }
`;

export const textField = styled.input`
  color: #fff;
  width: 100%;
  padding: 0.5em 0.5em;
  margin: 0.5em 0;
  display: inline-block;
  box-sizing: border-box;
  border-radius: 0.25em;
  border: 0.125em solid #55565a;
  background-color: #1e1f22 !important;
  outline: none;
  font-size: 0.875em;
  &:focus {
    color: #fff;
    border-color: ${props => props.theme.colors.accent1} !important;
  }
`;

export const selectField = styled.select`
  appearance: none;
  color: #fff;
  width: 100%;
  padding: 0.5em 0.5em;
  margin: 0.5em 0;
  display: inline-block;
  box-sizing: border-box;
  border-radius: 0.25em;
  border: 0.125em solid #55565a;
  background-color: #1e1f22;
  outline: none;
  font-size: 0.875em;
  &:focus {
    border-color: ${props => props.theme.colors.accent1};
  }
  option {
    font-weight: normal;
    border: none;
    outline: none !important;
    font-size: 0.875em;
  }
`;
