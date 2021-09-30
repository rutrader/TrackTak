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

const AccordionComponent = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (_, isExpanded) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion
      disableGutters
      elevation={0}
      expanded={expanded}
      onChange={handleChange}
    >
      <StyledAccordionSummary>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          {question}
        </Typography>
      </StyledAccordionSummary>
      <AccordionDetails
        sx={{
          padding: (theme) => theme.spacing(2),
        }}
      >
        <Typography color="textSecondary" sx={{ fontSize: "1.1rem" }}>
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const FrequentlyAskedQuestion = ({ questionsAndAnswers }) => {
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
        {questionsAndAnswers.map(({ question, answer }, index) => {
          return (
            <AccordionComponent
              question={question}
              answer={answer}
              key={index}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default FrequentlyAskedQuestion;
