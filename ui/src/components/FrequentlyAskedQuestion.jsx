import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useTheme } from "@emotion/react";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/system";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const StyledAccordionSummary = (props) => (
  <AccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "1.5rem" }} color="primary" />
    }
    sx={{
      padding: (theme) => `${theme.spacing(3)}  ${theme.spacing(3)} `,
      flexDirection: "row-reverse",
      "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
      },
      "& .MuiAccordionSummary-content": {
        marginLeft: (theme) => theme.spacing(2),
      },
    }}
    {...props}
  />
);

const AccordionComponent = ({ list }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Accordion
      disableGutters
      elevation={0}
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <StyledAccordionSummary>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          {list.question}
        </Typography>
      </StyledAccordionSummary>
      <AccordionDetails
        sx={{
          padding: (theme) => theme.spacing(2),
        }}
      >
        <Typography color="textSecondary" sx={{ fontSize: "1.1rem" }}>
          {list.answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const FrequentlyAskedQuestion = ({ listOfQuestionsAndAnswers }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        mt: 5,
        mb: 5,
      }}
    >
      <Typography
        color={theme.palette.primary.purple}
        sx={{ fontSize: "2.3rem" }}
        fontWeight="bold"
        gutterBottom
      >
        Questions you may have
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
        {listOfQuestionsAndAnswers.map((list, index) => {
          return <AccordionComponent list={list} key={index} />;
        })}
      </Box>
    </Box>
  );
};

export default FrequentlyAskedQuestion;
