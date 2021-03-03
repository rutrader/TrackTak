import { Typography } from "@material-ui/core";
import React from "react";
import FormatRawNumberToCurrency from "./FormatRawNumberToCurrency";
import FormatRawNumberToMillion from "./FormatRawNumberToMillion";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";
import { InfoTextBlackScholes } from "./InfoText";
import BoldValueLabel from "./BoldValueLabel";
import selectValueOption from "../selectors/fundamentalSelectors/selectValueOption";
import selectValueOfAllOptionsOutstanding from "../selectors/fundamentalSelectors/selectValueOfAllOptionsOutstanding";
import useInjectQueryParams from "../hooks/useInjectQueryParams";

const BlackScholesResults = () => {
  const valuePerOption = useInjectQueryParams(selectValueOption);
  const valueOfAllOptionsOutstanding = useInjectQueryParams(
    selectValueOfAllOptionsOutstanding,
  );

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        <InfoOutlinedIconWrapper text={<InfoTextBlackScholes />}>
          Black Scholes Employee Options Results
        </InfoOutlinedIconWrapper>
      </Typography>
      <Typography gutterBottom>
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
      <Typography gutterBottom>
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
    </React.Fragment>
  );
};

export default BlackScholesResults;
