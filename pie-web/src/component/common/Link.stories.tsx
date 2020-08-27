import { Avatar } from "@material-ui/core";
import { Story } from "@storybook/react";
import React from "react";
import { LinkProps } from "react-router-dom";
import { Link } from "./Wrapper";

export default { title: "Wrapper/Link", component: Link };

const Template: Story<LinkProps> = ({ children }) => (
  <Link to="">{children}</Link>
);

export const Anchor = Template.bind({});
Anchor.args = { children: <a href="/">Some link</a> };

export const avatar = Template.bind({});
avatar.args = { children: <Avatar /> };
