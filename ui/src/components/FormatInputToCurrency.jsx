import React, { forwardRef } from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";

const FormatInputToCurrency = forwardRef(({ defaultValue, ...props }, ref) => {
  const { onChange, ...other } = props;
  const [valueAsNumber, setValue] = useState(defaultValue);
  const currencySymbol = useSelector(selectValuationCurrencySymbol);

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
      prefix={currencySymbol}
    />
  );
});

export default FormatInputToCurrency;
