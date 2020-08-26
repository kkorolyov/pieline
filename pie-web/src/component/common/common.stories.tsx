import React from "react";
import { Form, Link, TextField } from "./Wrapper";

export default { title: "Common" };

export const textField = () => <TextField onChange={() => {}} />;
export const valueTextField = () => (
  <TextField onChange={() => {}} value="startText" />
);
export const labelTextField = () => (
  <TextField onChange={() => {}} label="field label" />
);

export const link = () => <Link to="">Some link</Link>;

export const form = () => (
  <Form onSubmit={() => {}}>
    <TextField onChange={() => {}} label="firstField" />
    <TextField onChange={() => {}} label="secondField" />
  </Form>
);
