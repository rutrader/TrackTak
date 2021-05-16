import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import FormatRawNumberToCurrency from "./FormatRawNumberToCurrency";
import FormatRawNumberToMillion from "./FormatRawNumberToMillion";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";
import { InfoTextBlackScholes } from "./InfoText";
import BoldValueLabel from "./BoldValueLabel";
import selectValueOption from "../selectors/fundamentalSelectors/selectValueOption";
import selectValueOfAllOptionsOutstanding from "../selectors/fundamentalSelectors/selectValueOfAllOptionsOutstanding";
import useInjectQueryParams from "../hooks/useInjectQueryParams";
import withFundamentalsLoaded from "../hoc/withFundamentalsLoaded";

const BlackScholesResults = () => {
  const valuePerOption = useInjectQueryParams(selectValueOption);
  const valueOfAllOptionsOutstanding = useInjectQueryParams(
    selectValueOfAllOptionsOutstanding,
  );

  return (
    <Fragment>
      <Typography variant="h5" gutterBottom>
        <InfoOutlinedIconWrapper text={<InfoTextBlackScholes />}>
          Black Scholes Employee Options Results
        </InfoOutlinedIconWrapper>
      </Typography>
      <Typography component="div" gutterBottom>
        <BoldValueLabel
          value={
            <FormatRawNumberToCurrency
              value={valuePerOption}
              decimalScale={2}
            />
          }
          label="Value Per Employee Option"
        />
      </Typography>
      <Typography component="div" gutterBottom>
        <BoldValueLabel
          value={
            <FormatRawNumberToMillion
              value={valueOfAllOptionsOutstanding}
              suffix="m"
              decimalScale={2}
            />
          }
          label="Total Value of All Employee Options"
        />
      </Typography>
    </Fragment>
  );
};

export default withFundamentalsLoaded(BlackScholesResults);
