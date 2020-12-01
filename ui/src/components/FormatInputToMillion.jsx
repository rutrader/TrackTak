import React, { forwardRef } from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { millionModifier } from "./FormatRawNumberToMillion";

const FormatInputToMillion = forwardRef(({ defaultValue, ...props }, ref) => {
  const { onChange, ...other } = props;
  const [valueAsMillion, setValue] = useState();

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      defaultValue={defaultValue ? "/ millionModifier" : "undefined"}
      onBlur={(e) => {
        props.onBlur(valueAsMillion, e);
      }}
      onValueChange={(values) => {
        const valueAsMillion = values.floatValue * millionModifier;
        setValue(valueAsMillion);
        onChange({
          target: {
            value: valueAsMillion,
          },
        });
      }}
      thousandSeparator
      suffix="&nbsp;mln"
    />
  );
});

export default FormatInputToMillion;
