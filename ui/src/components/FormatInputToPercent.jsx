import React from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { percentModifier } from "./FormatRawNumberToPercent";

const FormatInputToPercent = ({ defaultValue, ...props }) => {
  const { inputRef, onChange, ...other } = props;
  const [valueAsDecimal, setValue] = useState();

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      vadefaultValuelue={defaultValue * percentModifier}
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
};

export default FormatInputToPercent;
