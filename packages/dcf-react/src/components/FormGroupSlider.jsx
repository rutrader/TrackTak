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
  const [checked, setChecked] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const inputQueryParams = useInputQueryParams();

  const handleValueChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleCheckedChange = (e) => {
    setChecked(e.target.checked);
    setIsDisabled(e.target.checked);
  };

  return (
    <React.Fragment>
      <FormControlLabel
        disabled={isNil(inputQueryParams[dataLabel.value])}
        control={
          <Checkbox
            checked={checked}
            onChange={handleCheckedChange}
            color="primary"
          />
        }
        label={<TextFieldLabel>{dataLabel.label}</TextFieldLabel>}
      />
      {isDisabled && (
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
      )}
    </React.Fragment>
  );
};

export default FormGroupSlider;
