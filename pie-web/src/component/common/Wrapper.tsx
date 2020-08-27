import {
  Menu as MuiMenu,
  MenuProps as MuiMenuProps,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
export const TextField = ({ onChange, ...props }: TextFieldProps) => (
  <StyledMuiTextField
    onChange={(e) => {
      onChange && onChange(e.target.value);
    }}
    {...props}
  />
);

type MenuProps = MuiMenuProps & {
  /**
   * Element used as menu anchor.
   */
  anchor: React.ReactElement;
};
/**
 * Spawns a menu on a given anchor element.
 * `onClick` events on children also close the open menu.
 */
export const Menu = ({
  anchor,
  onClose,
  children,
  ...props
}: Omit<MenuProps, "open">) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const processedChildren = React.Children.toArray(children).map((child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, {
          onClick: (...args: any[]) => {
            child.props.onClick && child.props.onClick(...args);
            setAnchorEl(null);
          },
        })
      : child
  );

  return (
    <>
      {React.cloneElement(anchor, {
        onClick: ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(currentTarget);
        },
      })}
      <MuiMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        keepMounted
        onClose={(...args) => {
          onClose && onClose(...args);
          setAnchorEl(null);
        }}
        {...props}
      >
        {processedChildren}
      </MuiMenu>
    </>
  );
};

/**
 * Restyled `react-router` `link` component.
 */
export const Link = styled(RouterLink)`
  color: inherit;
  text-decoration: inherit;
`;

export type FormProps = {
  /**
   * Form submission handler.
   */
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};
/**
 * Form container providing for submission handling.
 */
export const Form = ({ onSubmit, children, ...props }: FormProps) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit(e);
    }}
    {...props}
  >
    {children}
  </form>
);
