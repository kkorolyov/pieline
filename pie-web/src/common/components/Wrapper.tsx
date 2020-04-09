import {
  Menu as MuiMenu,
  MenuProps as MuiMenuProps,
  TextField as MuiTextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

export const TextField = styled(MuiTextField)`
  ${({ theme }) => `
  margin-top: ${theme.spacing(1)}px;
  margin-bottom: ${theme.spacing(1)}px;
  `}
`;

type MenuProps = MuiMenuProps & {
  /**
   * Element used as menu anchor.
   */
  anchor: React.ReactElement;
};
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

export const Link = styled(RouterLink)`
  color: inherit;
  text-decoration: inherit;
`;

type FormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
};
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
