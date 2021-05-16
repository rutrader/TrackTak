import { isNil } from "lodash-es";
import React, { forwardRef, useEffect } from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import { millionModifier } from "./FormatRawNumberToMillion";

export const FormatInputToMillionCurrency = forwardRef((props, ref) => {
  const currencySymbol = useSelector(selectValuationCurrencySymbol);

  return <FormatInputToMillion ref={ref} prefix={currencySymbol} {...props} />;
});

const getValueAsMillion = (value) => {
  const valueAsMillion = isNil(value) ? null : value * millionModifier;

  return valueAsMillion;
};

const formatValue = (value) => (isNil(value) ? null : value / millionModifier);

const FormatInputToMillion = forwardRef(
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
          onBlur(getValueAsMillion(value), e);
        }}
        onValueChange={(values) => {
          const valueAsMillion = getValueAsMillion(values.floatValue);

          setValue(values.floatValue);
          onChange({
            target: {
              value: valueAsMillion,
            },
          });
        }}
        thousandSeparator
        suffix="&nbsp;mln"
        inputMode="text"
      />
    );
  },
);

export default FormatInputToMillion;
