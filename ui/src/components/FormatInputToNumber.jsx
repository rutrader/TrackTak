import React from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";

const FormatInputToNumber = ({ defaultValue, ...props }) => {
  const { inputRef, onChange, ...other } = props;
  const [valueAsNumber, setValue] = useState();

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      defaultValuelue={defaultValue}
      onBlur={(e) => {
        props.onBlur(valueAsNumber, e);
      }}
      onValueChange={(values) => {
        setValue(values.floatValue);
        onChange({
          target: {
            value: values.floatValue,
          },
        });
      }}
      thousandSeparator
    />
  );
};

export default FormatInputToNumber;
