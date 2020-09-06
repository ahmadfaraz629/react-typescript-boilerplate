import React, { forwardRef, memo, ForwardRefRenderFunction } from 'react';
import { Label, Input, FormFeedback } from 'reactstrap';

interface IInputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  error?: { message: string };
  type: any;
}
const InputField: ForwardRefRenderFunction<any, IInputFieldProps> = (
  { name, label, placeholder, error, type },
  ref
) => {
  return (
    <>
      {<Label>{label}</Label>}
      <Input
        name={name}
        placeholder={placeholder ? placeholder : label || ''}
        innerRef={ref}
        type={type}
        invalid={!!error}
      />
      {error && <FormFeedback>{error.message}</FormFeedback>}
    </>
  );
};

export default memo(forwardRef(InputField));
