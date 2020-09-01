import { Story } from "@storybook/react";
import React from "react";
import Profile, { ProfileProps } from "./Profile";

export default { title: "User/Profile", component: Profile };

export const Basic: Story<ProfileProps> = (args) => <Profile {...args} />;
