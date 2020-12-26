import { Grid } from "@material-ui/core";
import { Story } from "@storybook/react";
import { useState } from "react";
import EditableText, { EditableTextProps } from "./EditableText";

export default {
  title: "Common/Wrapper/EditableText",
  component: EditableText,
};

export const Basic: Story<EditableTextProps> = ({
  value,
  onSubmit,
  ...props
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  return (
    <EditableText
      value={currentValue}
      onSubmit={(value) => {
        setCurrentValue(value);
        onSubmit(value);
      }}
      {...props}
    />
  );
};
Basic.args = {
  value: "Value goes here",
  variant: "h4",
};

export const Multi = () => {
  const [a, setA] = useState("First thing");
  const [b, setB] = useState("Second thing");
  const [c, setC] = useState("Third thing");

  return (
    <Grid container direction="column">
      <Grid item>
        <EditableText value={a} onSubmit={setA} />
        <EditableText value={b} onSubmit={setB} />
        <EditableText value={c} onSubmit={setC} />
      </Grid>
    </Grid>
  );
};
