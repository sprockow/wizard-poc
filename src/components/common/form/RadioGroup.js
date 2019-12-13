import React from 'react';
import { useField } from 'informed';
import {
  FormLabel,
  Input,
  FormHelperText,
  FormControl,
  Tooltip,
  IconButton,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

export const InformedRadioGroup = ({
  validate,
  onChange,
  onBlur,
  helperText,
  classes = {},
  field,
  label,
  children,
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
    <FormControl
      component="fieldset"
      error={!!fieldState.error}
      {...otherProps}
    >
      <FormLabel htmlFor={field}>{label}</FormLabel>
      <RadioGroup
        aria-label={field}
        name={field}
        value={value ? value : 'none'}
        onChange={e => {
          setValue(e.target.value);
          onChange && onChange(e);
        }}
        onBlur={e => {
          setTouched(true);
          onBlur && onBlur(e);
        }}
      >
        {children}
      </RadioGroup>
      {fieldState.error && <FormHelperText>{fieldState.error}</FormHelperText>}
      {helperText ? (
        <Tooltip className={classes.instructionText} title={helperText}>
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </FormControl>,
  );
};

export default InformedRadioGroup;
