import React from "react";
import { forwardRef } from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { percentModifier } from "./FormatRawNumberToPercent";

const FormatInputToPercent = forwardRef(({ defaultValue, ...props }, ref) => {
  const { onChange, ...other } = props;
  const [valueAsDecimal, setValue] = useState();

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      defaultValue={defaultValue * percentModifier}
      onBlur={(e) => {
        props.onBlur(valueAsDecimal, e);
      }}
      onValueChange={(values) => {
        const valueAsDecimal = values.floatValue / percentModifier;
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
