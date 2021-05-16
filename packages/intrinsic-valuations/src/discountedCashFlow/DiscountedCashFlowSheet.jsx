import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Link,
} from "@material-ui/core";
import ExportToExcel, { DCFControlTypography } from "./ExportToExcel";
import DiscountedCashFlowTable from "./DiscountedCashFlowTable";
import useHasAllRequiredInputsFilledIn from "../hooks/useHasAllRequiredInputsFilledIn";
import withFundamentalsLoaded from "../hoc/withFundamentalsLoaded";
import SensitivityAnalysis from "../components/SensitivityAnalysis";
import Section from "../components/Section";
import { Fragment } from "react";

const DiscountedCashFlowSheet = ({ SubscribeCover, loadingCells }) => {
  const [showFormulas, setShowFormulas] = useState(false);
  const [showYOYGrowth, setShowYOYGrowth] = useState(false);
  const hasAllRequiredInputsFilledIn = useHasAllRequiredInputsFilledIn();

  const showFormulasToggledOnChange = () => {
    setShowFormulas(!showFormulas);
    setShowYOYGrowth(false);
  };
  const showYOYGrowthToggledOnChange = () => {
    setShowYOYGrowth(!showYOYGrowth);
    setShowFormulas(false);
  };

  // TODO: Add an expand button to see it full screen
  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          mb: 0.5,
        }}
      >
        <Box>
          <Typography variant="h5" gutterBottom>
            DCF Valuation
          </Typography>
          <Typography gutterBottom>
            Need help? Check out the DCF docs&nbsp;
            <Link
              href="https://tracktak.com/how-to-do-a-dcf"
              rel="noreferrer"
              target="_blank"
            >
              here.
            </Link>
          </Typography>
          <Typography paragraph>
            <b>Note:</b> Editing cells is in alpha stage.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            rowGap: 1.2,
            columnGap: 2.5,
          }}
        >
          <DCFControlLabel
            disabled={!hasAllRequiredInputsFilledIn}
            control={
              <Switch
                checked={showFormulas}
                onChange={showFormulasToggledOnChange}
                color="primary"
              />
            }
            label={<DCFControlTypography>Formulas</DCFControlTypography>}
          />
          <DCFControlLabel
            disabled={!hasAllRequiredInputsFilledIn}
            control={
              <Switch
                checked={showYOYGrowth}
                onChange={showYOYGrowthToggledOnChange}
                color="primary"
              />
            }
            label={<DCFControlTypography>%YOY Growth</DCFControlTypography>}
          />
          <ExportToExcel />
        </Box>
      </Box>
      <DiscountedCashFlowTable
        showFormulas={showFormulas}
        showYOYGrowth={showYOYGrowth}
        SubscribeCover={SubscribeCover}
        loadingCells={loadingCells}
      />
      <Section>
        <SensitivityAnalysis />
      </Section>
    </Fragment>
  );
};

const DCFControlLabel = (props) => (
  <FormControlLabel
    {...props}
    sx={{
      marginLeft: 0,
      marginRight: 0,
    }}
  />
);

export default withFundamentalsLoaded(DiscountedCashFlowSheet);
