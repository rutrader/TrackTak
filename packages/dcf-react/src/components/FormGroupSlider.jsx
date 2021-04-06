import React, { useEffect, useState } from "react";
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

const PrettySlider = withStyles({
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
  label,
  name,
  value,
  checked,
  step,
  min,
  max,
  marks,
  valueText,
  setChecked,
  onChangeCommitted,
}) => {
  const [sliderValue, setSliderValue] = useState(value);
  const inputQueryParams = useInputQueryParams();

  const handleOnChange = (_, newValue) => {
    setSliderValue(newValue);
  };

  const handleValueChangeCommitted = (_, newValue) => {
    onChangeCommitted(name, newValue);
  };

  const handleCheckedChange = (e) => {
    setChecked(name, e.target.checked);
  };

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  const disabled = isNil(inputQueryParams[name]);

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
        <PrettySlider
          value={sliderValue}
          onChange={handleOnChange}
          onChangeCommitted={handleValueChangeCommitted}
          defaultValue={0}
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
