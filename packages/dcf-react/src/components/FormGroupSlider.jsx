import React from "react";
import {
  Checkbox,
  Slider,
  FormControlLabel,
  InputLabel,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { textFieldRootStyles } from "../shared/utils";
import { isNil } from "lodash";
import useInputQueryParams from "../hooks/useInputQueryParams";

const TextFieldLabel = withStyles({
  root: {
    ...textFieldRootStyles,
  },
})(InputLabel);

const StyledFormControlLabel = withStyles({
  root: {
    "&:not(.Mui-disabled) .MuiFormLabel-root": {
      color: "#000",
    },
  },
})(FormControlLabel);

const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const FormGroupSlider = ({
  datum: { label, value, checked, step, min, max, formatter },
  marks,
  valueText,
  setChecked,
  sliderValue,
  onChange,
}) => {
  const inputQueryParams = useInputQueryParams();

  const handleValueChange = (_, newValue) => {
    onChange(value, newValue, formatter);
  };

  const handleCheckedChange = (e) => {
    setChecked(value, e.target.checked);
  };

  const disabled = isNil(inputQueryParams[value]);

  return (
    <React.Fragment>
      <StyledFormControlLabel
        disabled={disabled}
        control={
          <Checkbox
            checked={checked}
            onChange={handleCheckedChange}
            color="primary"
          />
        }
        label={<TextFieldLabel>{label}</TextFieldLabel>}
      />
      {checked && (
        <PrettoSlider
          value={sliderValue}
          onChange={handleValueChange}
          defaultValue={0}
          getAriaValueText={valueText}
          aria-labelledby="discrete-slider-custom"
          valueLabelDisplay="auto"
          marks={marks}
          step={step}
          min={min}
          max={max}
        />
      )}
    </React.Fragment>
  );
};

export default FormGroupSlider;
