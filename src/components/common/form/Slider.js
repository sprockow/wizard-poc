import React from 'react';
import { useField } from 'informed';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Slider,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

export const InformedSlider = ({
  validate,
  onChange,
  onBlur,
  helperText,
  classes = {},
  field,
  max,
  min = 0,
  className,
  label,
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
      <FormControl
        className={className}
        error={!!fieldState.error}
        disabled={otherProps.isDisabled}
      >
        <FormLabel htmlFor={field}>{label}</FormLabel>
        <Slider
          value={value ? value : 0}
          onChange={(e, temp_val) => {
            setValue(temp_val);
            onChange && onChange(e);
          }}
          onBlur={e => {
            setTouched(true);
            onBlur && onBlur(e);
          }}
          {...otherProps}
          max={max}
          marks={true}
          min={min}
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

export default InformedSlider;
