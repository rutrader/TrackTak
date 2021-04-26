import { TextField } from "@material-ui/core";
import React from "react";
import useInputQueryParams from "../hooks/useInputQueryParams";
import useSetURLInput from "../hooks/useSetURLInput";
import { textFieldRootStyles } from "../shared/utils";
import FormatInputToPercent from "./FormatInputToPercent";
import {
  probabilityOfFailureLabel,
  proceedsAsPercentageOfBookValueLabel,
} from "./OptionalInputs";

const OptionalTextField = (props) => (
  <TextField {...props} sx={textFieldRootStyles} />
);

const ProbabilityOfFailureInputs = () => {
  const inputQueryParams = useInputQueryParams();
  const setURLInput = useSetURLInput();

  return (
    <React.Fragment>
      {/* TODO: Attempt to automate this by default but allow this override anyway */}
      <OptionalTextField
        label={probabilityOfFailureLabel}
        value={inputQueryParams.probabilityOfFailure}
        onBlur={(value) => {
          setURLInput("probabilityOfFailure", value);
        }}
        InputProps={{
          inputComponent: FormatInputToPercent,
        }}
      />
      {/* TODO: Add fair value option as well later */}
      <OptionalTextField
        label={proceedsAsPercentageOfBookValueLabel}
        value={inputQueryParams.proceedsAsAPercentageOfBookValue}
        onBlur={(value) => {
          setURLInput("proceedsAsAPercentageOfBookValue", value);
        }}
        InputProps={{
          inputComponent: FormatInputToPercent,
        }}
      />
    </React.Fragment>
  );
};

export default ProbabilityOfFailureInputs;
