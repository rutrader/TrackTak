import { isNil } from "lodash";
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
      defaultValue={
        isNil(defaultValue) ? undefined : roundDecimal(defaultValue, 4)
      }
      onBlur={(e) => {
        props.onBlur(valueAsDecimal, e);
      }}
      onValueChange={(values) => {
        const valueAsDecimal = isNil(values.floatValue)
          ? null
          : values.floatValue / 100;
        setValue(valueAsDecimal);
        onChange({
          target: {
            value: valueAsDecimal,
          },
        });
      }}
      thousandSeparator
      suffix="%"
      inputMode="numeric"
    />
  );
});

export default FormatInputToPercent;
