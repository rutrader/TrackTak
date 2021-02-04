import React, { forwardRef } from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";

const FormatInputToNumber = forwardRef(({ defaultValue, ...props }, ref) => {
  const { onChange, ...other } = props;
  const [valueAsNumber, setValue] = useState(defaultValue);

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      defaultValue={defaultValue}
      onBlur={(e) => {
        props.onBlur(valueAsNumber, e);
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
    />
  );
});

export default FormatInputToNumber;
