import React from "react";

/**
 *
 * @param {string} ticker - The ticker for the stock to display the DCF for.
 * It must be in the format `EXCHANGE.SYMBOL`, for example AAPL.US, IAG.LSE etc.
 * The US is a virtual exchange that covers all US exchanges, for the full list of
 * exchanges see the Exchange Code column here:
 * https://eodhistoricaldata.com/financial-apis//list-supported-exchanges/
 * @param {string} [sourceDomain] - The domain of your website, e.g. Gurufocus.com.
 * We need this to do any specific modifications to the DCF for your specific iFrame.
 * @param {string} [params] - A string to pass extra parameters through
 * the url.
 * @param {object} [style] - A style object to apply to the iFrame
 */
const DCFIframe = ({ ticker, sourceDomain, params, style, ...props }) => {
  const urlSearchParams = new URLSearchParams(params);

  urlSearchParams.set("isIframe", true);
  urlSearchParams.set("sourceDomain", sourceDomain);

  return (
    <iframe
      sandbox
      title={`${ticker} Discounted Cash Flow Calculator | tractak.com`}
      src={`${
        process.env.ORIGIN_URL
      }/discounted-cash-flow/${ticker}?${urlSearchParams.toString()}`}
      style={{
        border: 0,
        width: "100%",
        height: "100%",
        ...style,
      }}
      {...props}
    />
  );
};

export default DCFIframe;
