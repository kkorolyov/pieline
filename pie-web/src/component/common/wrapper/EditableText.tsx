import { Button, Typography, TypographyVariant } from "@material-ui/core";
import { Cancel, Check, Edit } from "@material-ui/icons";
import Form from "component/common/control/Form";
import TextField from "component/common/control/TextField";
import { I18nContext } from "context";
import React, { useContext, useState } from "react";
import styled from "styled-components";

const Aligned = styled.div`
  display: flex;
  align-items: center;
`;
const ClickableEdit = styled(Edit)`
  cursor: pointer;
`;

type DisplayProps = {
  value: string;
  onClick: () => void;
  variant?: TypographyVariant;
};
const Display = ({ value, onClick, variant }: DisplayProps) => {
  const [isHover, setHover] = useState(false);

  const i18n = useContext(I18nContext);

  return (
    <Aligned
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <Typography variant={variant}>{value}</Typography>
      {isHover && (
        <ClickableEdit
          titleAccess={i18n.edit}
          fontSize="small"
          onClick={onClick}
        />
      )}
    </Aligned>
  );
};

type EditorProps = {
  value: string;
  onSubmit: (value: string) => void;
  onCancel: () => void;
};
const Editor = ({ value, onSubmit, onCancel }: EditorProps) => {
  const [currentValue, setCurrentValue] = useState(value);

  const close = () => {
    setCurrentValue(value);
    onCancel();
  };

  return (
    <Form
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) close();
      }}
      onSubmit={() => {
        onSubmit(currentValue);
      }}
    >
      <Aligned>
        <TextField autoFocus value={currentValue} onChange={setCurrentValue} />

        <Button type="submit">
          <Check />
        </Button>
        <Button color="secondary" onClick={close}>
          <Cancel />
        </Button>
      </Aligned>
    </Form>
  );
};

export type EditableTextProps = {
  /**
   * Current value.
   */
  value: string;
  /**
   * Invoked with updated value.
   */
  onSubmit: (value: string) => void;

  /**
   * Text element variant.
   */
  variant?: TypographyVariant;
};
/**
 * An editable text display.
 */
const EditableText = ({ value, onSubmit, variant }: EditableTextProps) => {
  const [isEditing, setEditing] = useState(false);

  return isEditing ? (
    <Editor
      value={value}
      onSubmit={(value) => {
        onSubmit(value);
        setEditing(false);
      }}
      onCancel={() => {
        setEditing(false);
      }}
    />
  ) : (
    <Display
      value={value}
      onClick={() => {
        setEditing(true);
      }}
      variant={variant}
    />
  );
};

export default EditableText;
