import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useTheme,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";

const OptionalInput = ({ title, tooltipTextNode, children }) => {
  const theme = useTheme();

  return (
    <Accordion
      sx={{
        "&.Mui-expanded": {
          margin: 0,
        },
        "& .MuiAccordionSummary-root": {
          padding: 0,
        },
        "& .MuiAccordionDetails-root": {
          padding: 0,
        },
      }}
      elevation={0}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">
          <InfoOutlinedIconWrapper text={tooltipTextNode}>
            {title}
          </InfoOutlinedIconWrapper>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: theme.spacing(2),
          }}
        >
          {children}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default OptionalInput;
