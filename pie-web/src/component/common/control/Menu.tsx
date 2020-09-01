import { Menu as MuiMenu, MenuProps as MuiMenuProps } from "@material-ui/core";
import React, { useState } from "react";

type MenuProps = Omit<MuiMenuProps, "anchorEl"> & {
  /**
   * Element used as menu anchor.
   */
  anchor: React.ReactElement;
};
/**
 * Spawns a menu on a given anchor element.
 * `onClick` events on children also close the open menu.
 */
const Menu = ({
  anchor,
  onClose,
  children,
  ...props
}: Omit<MenuProps, "open">) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();

  const processedChildren = React.Children.toArray(children).map((child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, {
          onClick: (...args: any[]) => {
            child.props.onClick && child.props.onClick(...args);
            setAnchorEl(undefined);
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
          setAnchorEl(undefined);
        }}
        {...props}
      >
        {processedChildren}
      </MuiMenu>
    </>
  );
};
export default Menu;
