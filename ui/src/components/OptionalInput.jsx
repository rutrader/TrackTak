import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useTheme,
  withStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";

const OptionalInputAccordion = withStyles({
  root: {
    "&.Mui-expanded": {
      margin: 0,
    },
    "& .MuiAccordionSummary-root": {
      padding: 0,
    },
    "& .MuiAccordionDetails-root": {
      padding: 0,
    },
  },
})((props) => <Accordion elevation={0} {...props} />);

const OptionalInput = ({ title, tooltipTextNode, children }) => {
  const theme = useTheme();

  return (
    <OptionalInputAccordion>
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
    </OptionalInputAccordion>
  );
};

export default OptionalInput;
