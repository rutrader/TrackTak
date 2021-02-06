import styled from "@emotion/styled";
import React from "react";

const StyledDCFIframe = styled.iframe`
  border: 0;
  width: 100%;
  height: 100%;
`;

const DCFIframe = ({ ticker, domain }) => {
  return (
    <StyledDCFIframe
      url={`https://tracktak.com/discounted-cash-flow/${ticker}?isIframe=true&domain=${domain}`}
      width="100%"
      height="100%"
    />
  );
};

export default DCFIframe;
