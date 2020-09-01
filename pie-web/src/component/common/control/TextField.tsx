import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const StyledMuiTextField = styled(MuiTextField)`
  ${({ theme }) => `
  margin-top: ${theme.spacing(1)}px;
  margin-bottom: ${theme.spacing(1)}px;
  `}
`;
export type TextFieldProps = Omit<MuiTextFieldProps, "onChange"> & {
  /**
   * Callback invoked on value change with current field value.
   */
  onChange: (value: string) => void;
};
/**
 * Styled text field with a simplified `onChange` caller providing current field value.
 */
const TextField = ({ onChange, ...props }: TextFieldProps) => (
  <StyledMuiTextField
    onChange={(e) => {
      onChange && onChange(e.target.value);
    }}
    {...props}
  />
);
export default TextField;
