import React from 'react'
import FormatRawNumber from './FormatRawNumber'

const FormatRawNumberToCurrency = ({ value, ...props }) => {
  // const currencySymbol = useSelector(selectValuationCurrencySymbol);

  return (
    <FormatRawNumber
      value={value}
      // prefix={currencySymbol}
      decimalScale={2}
      {...props}
    />
  )
}

export default FormatRawNumberToCurrency
