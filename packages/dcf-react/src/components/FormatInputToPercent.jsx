import { isNil } from "lodash-es";
import React, { useEffect } from "react";
import { forwardRef } from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import roundDecimal from "../shared/roundDecimal";

const getValueAsDecimal = (value) => {
  const valueAsDecimal = isNil(value) ? null : value / 100;

  return valueAsDecimal;
};

const formatValue = (value) => (isNil(value) ? null : roundDecimal(value, 4));

const FormatInputToPercent = forwardRef(
  ({ onChange, onBlur, ...props }, ref) => {
    const formattedValue = formatValue(props.value);
    const [value, setValue] = useState(formattedValue);

    useEffect(() => {
      setValue(formattedValue);
    }, [formattedValue]);

    return (
      <NumberFormat
        {...props}
        getInputRef={ref}
        value={value ?? ""}
        onBlur={(e) => {
          onBlur(getValueAsDecimal(value), e);
        }}
        onValueChange={(values) => {
          const valueAsDecimal = getValueAsDecimal(values.floatValue);

          setValue(values.floatValue);
          onChange({
            target: {
              value: valueAsDecimal,
            },
          });
        }}
        thousandSeparator
        suffix="%"
        inputMode="text"
      />
    );
  },
);

export default FormatInputToPercent;
