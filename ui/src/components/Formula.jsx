import { Box, List, ListItem } from "@material-ui/core";
import React from "react";

const Formula = ({ formula, explanations }) => {
  return (
    <Box sx={{ ml: 2, mt: 1 }}>
      Formula:&nbsp;
      <Box component="span" sx={{ fontWeight: "bold" }}>
        {formula}
      </Box>
      <List>
        where
        {explanations.map((explanation) => (
          <ListItem key={explanation}>{explanation}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Formula;
