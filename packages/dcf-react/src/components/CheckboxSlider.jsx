import React, { useEffect, useState } from "react";
import { Checkbox, Slider, FormControlLabel } from "@material-ui/core";

const trackStyle = {
  height: "8px",
};

const CheckboxSlider = ({
  label,
  name,
  disabled,
  value,
  checked,
  step,
  min,
  max,
  marks,
  setChecked,
  onChangeCommitted,
}) => {
  const [sliderValue, setSliderValue] = useState(value);

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

  return (
    <React.Fragment>
      <FormControlLabel
        disabled={disabled}
        control={
          <Checkbox
            checked={checked}
            onChange={handleCheckedChange}
            color="primary"
          />
        }
        label={label}
      />
      {checked && !disabled && (
        <Slider
          sx={{
            "& .MuiSlider-thumb": {
              height: 24,
              width: 24,
              backgroundColor: "#fff",
              border: "2px solid currentColor",
              marginTop: "-8px",
              marginLeft: "-12px",
            },
            "& .MuiSlider-valueLabel": {
              left: `calc(-50% + 4px)`,
            },
            "& .MuiSlider-mark": trackStyle,
            "& .MuiSlider-track": trackStyle,
            "& .MuiSlider-rail": trackStyle,
          }}
          value={sliderValue}
          onChange={handleOnChange}
          onChangeCommitted={handleValueChangeCommitted}
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

export default CheckboxSlider;
