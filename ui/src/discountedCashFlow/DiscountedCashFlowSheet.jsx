import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Link,
  CircularProgress,
  useTheme,
} from "@material-ui/core";
import "../shared/blueprintTheme.scss";
import { Link as RouterLink } from "react-router-dom";
import LazyLoad from "react-lazyload";
import ExportToExcel from "./ExportToExcel";
import DiscountedCashFlowTable from "./DiscountedCashFlowTable";

const Placeholder = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing(10),
        height: 807,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

const DiscountedCashFlowSheet = ({ columnWidths }) => {
  const [showFormulas, setShowFormulas] = useState(false);

  // TODO: Add an expand button to see it full screen
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 0.5,
        }}
      >
        <Typography variant="h5">DCF Valuation</Typography>
        <Box sx={{ display: "flex" }}>
          <Button
            onClick={() => {
              setShowFormulas((state) => !state);
            }}
            variant="outlined"
          >
            {showFormulas ? "Hide Formulas" : "Show Formulas"}
          </Button>
          <Box
            sx={{
              ml: 1,
            }}
          >
            <ExportToExcel />
          </Box>
        </Box>
      </Box>
      <Typography gutterBottom>
        Need help? Check out the DCF docs&nbsp;
        <Link
          component={RouterLink}
          to="/how-to-do-a-dcf"
          rel="noreferrer"
          target="_blank"
        >
          here.
        </Link>
      </Typography>
      <LazyLoad offset={300} placeholder={<Placeholder />}>
        <DiscountedCashFlowTable
          columnWidths={columnWidths}
          showFormulas={showFormulas}
        />
      </LazyLoad>
    </Box>
  );
};

export default DiscountedCashFlowSheet;
