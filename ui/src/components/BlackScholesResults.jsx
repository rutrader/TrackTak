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
        Value Per Employee Option&nbsp;
        <Box component="span" sx={{ fontWeight: "bold" }}>
          <FormatRawNumberToCurrency value={valuePerOption} decimalScale={2} />
        </Box>
      </Typography>
      <Typography gutterBottom>
        Total Value of All Employee Options&nbsp;
        <Box component="span" sx={{ fontWeight: "bold" }}>
          <FormatRawNumberToMillion
            value={valueOfAllOptionsOutstanding}
            suffix="M"
            decimalScale={2}
          />
        </Box>
      </Typography>
    </>
  );
};

export default BlackScholesResults;
