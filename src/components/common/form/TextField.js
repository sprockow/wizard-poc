import React from 'react';
import { useField } from 'informed';
import {
  FormLabel,
  Input,
  FormHelperText,
  FormControl,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

export const InformedTextField = ({
  validate,
  onChange,
  onBlur,
  helperText,
  classes = {},
  field,
  label,
  type,
  ...otherProps
}) => {
  const { fieldState, fieldApi, render } = useField({
    validate,
    field,
    ...otherProps,
  });

  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;

  return render(
    <>
      <FormControl error={!!fieldState.error} {...otherProps}>
        <FormLabel htmlFor={field}>{label}</FormLabel>
        <Input
          id={field}
          type={type}
          value={value ? value : ''}
          onChange={e => {
            setValue(e.target.value);
            onChange && onChange(e);
          }}
          onBlur={e => {
            setTouched(true);
            onBlur && onBlur(e);
          }}
        />
        {fieldState.error && (
          <FormHelperText>{fieldState.error}</FormHelperText>
        )}
        {helperText ? (
          <Tooltip className={classes.instructionText} title={helperText}>
            <IconButton>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </FormControl>
    </>,
  );
};

export default InformedTextField;
