import React from "react";
import Iframe from "react-iframe";

const Test = () => {
  return (
    <div>
      <Iframe
        url={`${window.location.origin}/discounted-cash-flow/irbt?isIframe=true&cagrYearOneToFive=0.18&ebitTargetMarginInYearTen=0.1&yearOfConvergence=3&salesToCapitalRatio=2.5`}
        width="100%"
        height="900px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />
    </div>
  );
};

export default Test;
