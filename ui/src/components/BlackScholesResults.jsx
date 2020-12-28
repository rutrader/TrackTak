import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import FormatRawNumberToCurrency from "./FormatRawNumberToCurrency";
import FormatRawNumberToMillion from "./FormatRawNumberToMillion";
import {
  selectValueOption,
  selectValueOfAllOptionsOutstanding,
} from "../selectors/calculateBlackScholesModel";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";
import { InfoTextBlackScholes } from "./InfoText";
import BoldValueLabel from "./BoldValueLabel";

const BlackScholesResults = () => {
  const valuePerOption = useSelector(selectValueOption);
  const valueOfAllOptionsOutstanding = useSelector(
    selectValueOfAllOptionsOutstanding
  );

  return (
    <>
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
    </>
  );
};

export default BlackScholesResults;
