import React, { forwardRef } from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";

const FormatInputToYear = forwardRef(({ defaultValue, ...props }, ref) => {
  const { onChange, ...other } = props;
  const [valueAsYear, setValue] = useState();

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      defaultValue={defaultValue}
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
});

export default FormatInputToYear;
