import { MenuItem } from "@material-ui/core";
import {
  BrightnessHigh,
  BrightnessLow,
  SettingsBrightness
} from "@material-ui/icons";
import Menu from "component/common/control/Menu";
import { Palette } from "component/common/Theme";
import { ThemeConfigContext } from "context";
import React, { useContext } from "react";
import styled from "styled-components";

const Anchor = styled(SettingsBrightness)`
  cursor: pointer;
`;

/**
 * Theme color palette selection.
 */
const PaletteSelector = () => {
  const { setPalette } = useContext(ThemeConfigContext);

  return (
    <Menu anchor={<Anchor />}>
      <MenuItem onClick={() => setPalette(Palette.DARK)}>
        <BrightnessLow />
      </MenuItem>
      <MenuItem onClick={() => setPalette(Palette.LIGHT)}>
        <BrightnessHigh />
      </MenuItem>
    </Menu>
  );
};
export default PaletteSelector;
