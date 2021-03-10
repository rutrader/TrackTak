import React, { forwardRef } from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import { millionModifier } from "./FormatRawNumberToMillion";

export const FormatInputToMillionCurrency = forwardRef((props, ref) => {
  const currencySymbol = useSelector(selectValuationCurrencySymbol);

  return <FormatInputToMillion ref={ref} prefix={currencySymbol} {...props} />;
});

const FormatInputToMillion = forwardRef(({ defaultValue, ...props }, ref) => {
  const { onChange, ...other } = props;
  const [valueAsMillion, setValue] = useState(defaultValue);

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      defaultValue={defaultValue ? defaultValue / millionModifier : undefined}
      onBlur={(e) => {
        props.onBlur(valueAsMillion, e);
      }}
      onValueChange={(values) => {
        const valueAsMillion =
          values.floatValue !== undefined
            ? values.floatValue * millionModifier
            : null;
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