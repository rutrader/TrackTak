import React from "react";
import { forwardRef } from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import roundDecimal from "../shared/roundDecimal";

const FormatInputToPercent = forwardRef(({ defaultValue, ...props }, ref) => {
  const { onChange, ...other } = props;
  const [valueAsDecimal, setValue] = useState(defaultValue);

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      defaultValue={defaultValue ? roundDecimal(defaultValue, 4) : undefined}
      onBlur={(e) => {
        props.onBlur(valueAsDecimal, e);
      }}
      onValueChange={(values) => {
        const valueAsDecimal =
          values.floatValue !== undefined ? values.floatValue / 100 : null;
        setValue(valueAsDecimal);
        onChange({
          target: {
            value: valueAsDecimal,
          },
        });
      }}
      thousandSeparator
      suffix="%"
    />
  );
});

export default FormatInputToPercent;
