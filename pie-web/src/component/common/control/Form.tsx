import React, { DOMAttributes } from "react";

export type FormProps = DOMAttributes<HTMLFormElement> & {
  /**
   * Form submission handler.
   */
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};
/**
 * Form container providing for submission handling.
 */
const Form = ({ onSubmit, children, ...props }: FormProps) => (
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
export default Form;
