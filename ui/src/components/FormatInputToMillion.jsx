import React from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { millionModifier } from "./FormatRawNumberToMillion";

const FormatInputToMillion = ({ defaultValue, ...props }) => {
  const { inputRef, onChange, ...other } = props;
  const [valueAsMillion, setValue] = useState();

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      defaultValuelue={defaultValue / millionModifier}
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
};

export default FormatInputToMillion;
