import styled from "@emotion/styled";
import React from "react";

const StyledDCFIframe = styled.iframe`
  border: 0;
  width: 100%;
  height: 100%;
`;

const origin =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://tracktak.com";

const DCFIframe = ({ ticker, domain, params, ...props }) => {
  const urlSearchParams = new URLSearchParams(params);

  urlSearchParams.set("isIframe", true);
  urlSearchParams.set("domain", domain);

  console.log(urlSearchParams.toString());

  return (
    <StyledDCFIframe
      src={`${origin}/discounted-cash-flow/${ticker}?${urlSearchParams.toString()}`}
      {...props}
    />
  );
};

export default DCFIframe;
