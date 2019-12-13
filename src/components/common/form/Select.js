import React from 'react';
import { useField } from 'informed';
import Select from 'react-select';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Tooltip,
  IconButton,
  useTheme,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

export const InformedReactSelect = ({
  validate,
  label,
  onChange,
  onBlur,
  helperText,
  className,
  classes = {},
  field,
  options,
  containerTestId,
  ...otherProps
}) => {
  const { fieldState, fieldApi, render } = useField({
    validate,
    field,
    ...otherProps,
  });

  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;

  const matchedOption = options.find(option => option.value === value);

  const materialTheme = useTheme();

  return render(
    <>
      <FormControl
        className={className}
        error={!!fieldState.error}
        disabled={otherProps.isDisabled}
        data-testid={containerTestId}
      >
        <FormLabel htmlFor={field}>{label}</FormLabel>
        <Select
          name={field}
          inputId={field}
          isClearable={true}
          value={matchedOption}
          className={classes.selectComponent}
          onChange={option => {
            // TODO this won't be correct. We need to consult docs to get array of values
            setValue(option && option.value);
            onChange && onChange(option);
          }}
          onBlur={e => {
            setTouched(true);
            onBlur && onBlur(e);
          }}
          options={options}
          {...otherProps}
          theme={theme => {
            return {
              ...theme,
              materialTheme,
              borderRadius: materialTheme.shape.borderRadius,
              spacing: {
                baseUnit: materialTheme.spacing(1),
                menuGutter: materialTheme.spacing(2),
                controlHeight: materialTheme.spacing(4),
              },
              colors: {
                ...theme.colors,
                primary25: materialTheme.palette.primary.light,
                primary: materialTheme.palette.primary.main,
                primary75: materialTheme.palette.primary.light,
              },
            };
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

export default InformedReactSelect;
