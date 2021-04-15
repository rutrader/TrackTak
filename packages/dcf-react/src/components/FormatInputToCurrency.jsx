import React, { forwardRef, useEffect } from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";

const FormatInputToCurrency = forwardRef(
  ({ onChange, onBlur, ...props }, ref) => {
    const [value, setValue] = useState(props.value);
    const currencySymbol = useSelector(selectValuationCurrencySymbol);

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
        prefix={currencySymbol}
        inputMode="text"
      />
    );
  },
);

export default FormatInputToCurrency;
