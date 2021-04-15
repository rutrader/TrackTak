import React, { forwardRef, useEffect } from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";

const FormatInputToNumber = forwardRef(
  ({ onChange, onBlur, ...props }, ref) => {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
      setValue(props.value);
    }, [props.value]);

    return (
      <NumberFormat
        {...props}
        getInputRef={ref}
        value={value ?? ""}
        onBlur={(e) => {
          onBlur(value, e);
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
        inputMode="text"
      />
    );
  },
);

export default FormatInputToNumber;
