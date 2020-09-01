import { Story } from "@storybook/react";
import React from "react";
import Editor, { EditorProps } from "./Editor";

export default { title: "User/Editor", component: Editor };

export const Basic: Story<EditorProps> = (args) => <Editor {...args} />;
