import React from "react";
import { Checkbox, Slider, FormControlLabel } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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

const FormGroupSlider = ({ dataLabel, marks, valueText }) => {
  const [value, setValue] = React.useState([10, 40]);

  const handleValueChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <FormControlLabel
        control={<Checkbox key={dataLabel.value} color="primary" />}
        label={dataLabel.label}
      />
      <PrettoSlider
        value={value}
        onChange={handleValueChange}
        defaultValue={0}
        getAriaValueText={valueText}
        aria-labelledby="discrete-slider-custom"
        valueLabelDisplay="auto"
        marks={marks}
        step={5}
        min={-50}
        max={50}
      />
    </React.Fragment>
  );
};

export default FormGroupSlider;
