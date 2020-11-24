import React from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";

const FormatInputToYear = ({ defaultValue, ...props }) => {
  const { inputRef, onChange, ...other } = props;
  const [valueAsYear, setValue] = useState();

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      defaultValuelue={defaultValue}
      onBlur={(e) => {
        props.onBlur(valueAsYear, e);
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
      suffix="&nbsp;yr"
    />
  );
};

export default FormatInputToYear;
