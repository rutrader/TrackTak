import React, { useState, Fragment } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Link,
} from "@material-ui/core";
import ExportToExcel, { DCFControlTypography } from "./ExportToExcel";
import SaveDCF from "./SaveDCF";
import SaveStatus from "./SaveStatus";
import DiscountedCashFlowTable from "./DiscountedCashFlowTable";
import useHasAllRequiredInputsFilledIn from "../hooks/useHasAllRequiredInputsFilledIn";
import withFundamentalsLoaded from "../hoc/withFundamentalsLoaded";
import SensitivityAnalysis from "../components/SensitivityAnalysis";
import Section from "../components/Section";

const DiscountedCashFlowSheet = ({
  hideSensitivityAnalysis,
  showSaveButton,
  onSaveClick,
  isSaving,
  onSaveEvent
}) => {
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
          {showSaveButton && <SaveDCF onClick={onSaveClick} /> }
          {!showSaveButton && <SaveStatus isSaving={isSaving} />}
        </Box>
      </Box>
      <DiscountedCashFlowTable
        showFormulas={showFormulas}
        showYOYGrowth={showYOYGrowth}
        onSaveEvent={onSaveEvent}
      />
      {!hideSensitivityAnalysis && (
        <Section>
          <SensitivityAnalysis />
        </Section>
      )}
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
